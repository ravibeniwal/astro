import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import moment from "moment";
import WeatherCard from "./WeatherCard";
import PropTypes from "prop-types";
import { Spin } from "antd";
import { saveFinalWeatherDataWithDays } from "../../store/actions/foreCastActions";

/**
 * @WeatherDisplay - Purpose of this component is
 * to show weather data
 */
export default function WeatherDisplay(props) {
  const dispatch = useDispatch();
  const [finalWeatherData, setFinalWeatherData] = useState([]);
  const { shippingDate } = props;

  let [weatherData, weatherDataLoader] = useSelector(
    (state) => [state.foreCast.weatherData, state.foreCast.weatherDataLoader],
    shallowEqual
  );
  const getDateDifference = () => {
    const start = moment();
    const end = moment(shippingDate);
    let dateDifference = 0;
    if (end?.diff(start, "days") > 1) {
      dateDifference = dateDifference + 1;
    }
    return dateDifference;
  };

  const FilterTheWeatherDataAccordingToDays = () => {
    const finalList = weatherData?.map((data, i) => {
      return { ...data, list: data?.list[i + getDateDifference()] };
    });
    setFinalWeatherData(finalList);
    // save data in redux store
    dispatch(saveFinalWeatherDataWithDays(finalList));
  };

  useEffect(() => {
    FilterTheWeatherDataAccordingToDays();
  }, [weatherData]);

  return (
    <div>
      <Spin spinning={weatherDataLoader}>
        <div className="py-4 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-2">
          {finalWeatherData?.map((weather, index) => {
            return (
              <WeatherCard
                key={index}
                weatherData={weather?.list}
                city={weather?.city?.name}
              />
            );
          })}
        </div>
      </Spin>
    </div>
  );
}
WeatherDisplay.propTypes = {
  /**
   * @shippingDate paramType {object}- is the object which shows shipment date
   */
  shippingDate: PropTypes.object,
};
