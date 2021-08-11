import React from "react";
import PropTypes from "prop-types";

/**
 * @RightComponent - Purpose of this component is
 * to show Right side data of weather card
 */
export default function RightComponent(props) {
  const determineLevel = (temp) => {
    if (temp < 10 || temp > 29) {
      return ["Bad", "bg-red-600"];
    }

    if ((temp > 9 && temp < 18) || (temp > 22 && temp < 30)) {
      return ["ok", "bg-yellow-600"];
    }

    if (temp > 17 && temp < 23) {
      return ["Good", "bg-green-600"];
    }

    return [];
  };

  const determineSide = (deg) => {
    if (deg < 30) return "N";

    if (deg < 60) return "NE";

    if (deg < 120) return "E";

    if (deg < 150) return "ES";

    if (deg < 210) return "S";

    if (deg < 240) return "SW";

    if (deg < 300) return "W";

    if (deg < 330) return "NW";

    if (deg < 360) return "N";
  };

  const feelsLikeProperties = determineLevel(props.feelsLike);

  return (
    <div>
      <div className="self-end text-center">
        <div
          className={`${feelsLikeProperties[1]} rounded-lg text-xs sm:text-sm p-1`}
        >
          {props.feelsLike} {feelsLikeProperties[0]}
        </div>
        <div className="mt-1 text-xs md:text-sm">
          {determineSide(props.deg)} {Math.round(props.speed * 3.6)} km/h
        </div>
      </div>
    </div>
  );
}
RightComponent.propTypes = {
  /**
   * @feelsLike paramType {number}- is the number value which shows the feelsLike Temprature
   */
  feelsLike: PropTypes.number,
  /**
   * @speed paramType {number}- is the number which shows the wind speed
   */
  speed: PropTypes.number,
  /**
   * @deg paramType {number}- is the number which shows the direction wind
   */
  deg: PropTypes.number,
};
