import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { Loader } from "@googlemaps/js-api-loader";
import MapOverLay from "./MapOverLay";
import { useDispatch } from "react-redux";
import {
  saveRouteAction,
  saveMidWayLocationPointsAction,
} from "../../store/actions/foreCastActions";

let directionsService;
let directionsRenderer;
let markerArray = [];
let flightpaths = [];
let stepDisplay;
let map;
let google;

export const loadMap = () => {
  const loader = new Loader({
    apiKey: "yourAPIkey",
    version: "weekly",
  });

  loader.load().then(() => {
    google = window.google;
    // Instantiate a directions service.
    directionsService = new google.maps.DirectionsService();
    // Create a map.
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 3,
      center: { lat: 41.85, lng: -87.65 },
    });
    // Create a renderer for directions and bind it to the map.
    directionsRenderer = new google.maps.DirectionsRenderer({
      map: map,
    });
    stepDisplay = new google.maps.InfoWindow();
  });
};

const DirectionAndRouteDisplay = forwardRef((_props, ref) => {
  const googlemap = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    loadMap();
  }, []);

  useImperativeHandle(ref, () => ({
    calculateAndDisplayRoute,
  }));

  // Display the route between the initial start and end selections.
  const calculateAndDisplayRoute = (formValues) => {
    // First, remove any existing markers from the map.
    for (let i = 0; i < markerArray.length; i++) {
      markerArray[i].setMap(null);
    }
    // First, remove any existing paths from the map.
    for (let i = 0; i < flightpaths.length; i++) {
      flightpaths[i].setMap(null);
    }
    // Retrieve the start and end locations and create a DirectionsRequest using
    // WALKING directions.
    const directionsServiceProps = {
      origin: formValues?.originformattedAddress,
      destination: formValues?.destinationformattedAddress,
      unitSystem: google.maps.UnitSystem.METRIC,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
    };
    if (formValues?.shipmentGoingThroughChicago === "yes") {
      directionsServiceProps.waypoints = [
        {
          location: "Chicago, IL",
          stopover: true,
        },
      ];
    }

    directionsService
      ?.route(directionsServiceProps)
      .then((result) => {
        // Route the directions and pass the response to a function to create
        // markers for each step.
        document.getElementById("warnings-panel").innerHTML =
          "<b>" + result.routes[0].warnings + "</b>";
        // directionsRenderer.setDirections(result);
        showSteps(result, markerArray, stepDisplay, map, formValues);
      })
      .catch((e) => {
        window.alert("Directions request failed due to " + e);
      });
  };

  const getNearest = (arr, goal, starting) => {
    return arr.reduce((prev, curr) => {
      let prevDist =
        window.google.maps.geometry.spherical.computeDistanceBetween(
          starting,
          prev
        ) / 1000;

      let currDist =
        window.google.maps.geometry.spherical.computeDistanceBetween(
          starting,
          curr
        ) / 1000;

      return Math.abs(currDist - goal) < Math.abs(prevDist - goal)
        ? curr
        : prev;
    });
  };

  const getDistance = (days, start_location, end_location) => {
    // Distance - Using Google Geometry Library - Function computeDistanceBetween
    let distance = window.google.maps.geometry.spherical.computeDistanceBetween(
      start_location,
      end_location
    );
    return distance / days / 1000;
  };

  const createWaypoints = (
    distance,
    overview_path,
    start_location,
    end_location,
    days,
    markers,
    throughtChicago
  ) => {
    // let markers = [];
    let waypointsData = [];

    markers[0] = new google.maps.Marker({
      position: start_location,
    });

    // Starting Location
    waypointsData[0] = { lat: start_location.lat(), lng: start_location.lng() };
    // markers[0] = new google.maps.Marker();

    var chicagoPosition = new google.maps.LatLng(41.850033, -87.6500523);
    // Save first calculated distance
    const old_distance = parseFloat(distance);
    let check_distance = parseFloat(distance);
    for (let counter = 1; counter < days; counter++) {
      let nearest = getNearest(overview_path, check_distance, start_location);
      // Adding New Waypoint

      // check is chicago is neer these points then replace near point to chicago
      if (throughtChicago === true) {
        let chicagoToNearPointDistance =
          window.google.maps.geometry.spherical.computeDistanceBetween(
            nearest,
            chicagoPosition
          ) / 1000;
        if (parseFloat(chicagoToNearPointDistance) < old_distance) {
          nearest = chicagoPosition;
        }
      }

      waypointsData[counter] = {
        lat: nearest.lat(),
        lng: nearest.lng(),
      };
      // Assinging Waypoint to Marker

      markers[counter] = new google.maps.Marker({
        position: waypointsData[counter],
        draggable: true,
      });

      check_distance += old_distance;
      if (counter == days - 1) {
        markers[days] = new google.maps.Marker({
          position: end_location,
        });
        waypointsData[waypointsData.length] = {
          lat: end_location.lat(),
          lng: end_location.lng(),
        };
      }
    }
    return [waypointsData, markers];
  };

  const showSteps = async (
    directionResult,
    markerArray,
    stepDisplay,
    map,
    formValues
  ) => {
    // For each step, place a marker, and add the text to the marker's infowindow.
    // Also attach the marker to an array so we can keep track of it and remove it
    // when calculating new routes.
    // const myRoute = directionResult.routes[0].legs[0];
    // Store the my route in redux
    const startLocation = directionResult.routes[0].legs[0].start_location;
    const throughtChicago =
      formValues?.shipmentGoingThroughChicago === "yes" ? true : false;
    const endLocation = throughtChicago
      ? directionResult.routes[0].legs[1].end_location
      : directionResult.routes[0].legs[0].end_location;

    var currentRoute = directionResult.routes[0].overview_path;

    const days = formValues?.estimatedTransitTime - 1;

    if (days > 1) {
      const [waypointsData] = createWaypoints(
        getDistance(days, startLocation, endLocation),
        currentRoute,
        startLocation,
        endLocation,
        days,
        markerArray,
        throughtChicago
      );
      map.setZoom(7);
      map.setCenter(waypointsData[parseInt(waypointsData.length / 2)]);

      for (let index = 0; index < waypointsData.length; index++) {
        if (index < waypointsData.length) {
          var flightPath1 = new google.maps.Polyline({
            path: [waypointsData[index], waypointsData[index + 1]],
            geodesic: true,
            strokeColor: "#009900",
            strokeOpacity: 1.0,
            strokeWeight: 2,
          });
          flightpaths.push(flightPath1);
          flightPath1.setMap(map);
        }
        const marker = markerArray[index];
        marker.setMap(map);
        attachInstructionText(stepDisplay, marker, `Day ${index + 1}`, map);
      }
      dispatch(saveMidWayLocationPointsAction(waypointsData));
    } else {
      const waypointsData = [];
      waypointsData[0] = {
        lat: startLocation.lat(),
        lng: startLocation.lng(),
      };

      waypointsData[1] = {
        lat: endLocation.lat(),
        lng: endLocation.lng(),
      };
      directionsRenderer.setDirections(directionResult);
      dispatch(saveMidWayLocationPointsAction(waypointsData));
    }

    // const midWayLocation = [];
    // var step =
    //   (myRoute.steps.length - 1) / (formValues?.estimatedTransitTime - 1);

    // for (let i = 0; i < formValues?.estimatedTransitTime; i++) {
    //   const positionIndex = parseInt(step * i);
    //   const marker = (markerArray[i] =
    //     markerArray[i] || new google.maps.Marker());
    //   marker.setMap(map);
    //   marker.setPosition(myRoute.steps[positionIndex]?.start_location);

    //   midWayLocation.push({
    //     lat: myRoute.steps[positionIndex]?.start_location.lat(),
    //     lng: myRoute.steps[positionIndex]?.start_location.lng(),
    //   });
    //   attachInstructionText(
    //     stepDisplay,
    //     marker,
    //     myRoute.steps[positionIndex]?.instructions,
    //     map
    //   );
    // }

    dispatch(saveRouteAction(directionResult?.routes[0]?.legs[0]));
  };
  const attachInstructionText = (stepDisplay, marker, text, map) => {
    google.maps.event.addListener(marker, "click", () => {
      // Open an info window when the marker is clicked on, containing the text
      // of the step.
      stepDisplay.setContent(text);
      stepDisplay.open(map, marker);
    });
  };

  return (
    <>
      {/* Overlay */}
      <MapOverLay />
      <div style={{ minHeight: "400px", height: "75vh" }}>
        <div id="map" className="absolute w-full h-full" ref={googlemap}></div>
        <div id="warnings-panel"></div>
      </div>
    </>
  );
});

export default DirectionAndRouteDisplay;
