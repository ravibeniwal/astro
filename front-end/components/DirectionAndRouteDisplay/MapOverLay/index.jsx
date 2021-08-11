import React from "react";
import { useSelector } from "react-redux";
import { BsArrowRightShort, BsGeoAlt, BsWatch } from "react-icons/bs";

export default function MapOverLay() {
  const routeData = useSelector((state) => state.foreCast.routeData);
  return (
    <div
      className={`cursor-pointer relative  right-0 left-0 bottom-0 p-4 flex flex-col justify-end LoadSummaryOnMap`}
      style={{
        backgroundImage:
          "linear-gradient(rgb(170 218 255),rgb(170 218 255),rgb(238 237 230))",
      }}
    >
      <div className="relative text-white">
        <div className="flex justify-between py-4">
          <div>
            <div className="flex items-center space-x-2 text-lg font-semibold">
              <div>{routeData?.start_address}</div>
              <div>
                <BsArrowRightShort className="text-2xl" />
              </div>
              <div>{routeData?.end_address}</div>
            </div>
            <div className="flex items-center space-x-4">
              <div>
                <BsGeoAlt /> {routeData?.distance?.text || "--"}
              </div>
              <div>
                <BsWatch /> {routeData?.duration?.text || "--"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
