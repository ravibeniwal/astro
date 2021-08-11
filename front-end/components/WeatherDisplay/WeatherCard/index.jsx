import React from "react";
import { EnvironmentFilled } from "@ant-design/icons";
import RightComponent from "../RightComponent";
import { determineGif, determineIcon } from "../../../utils/utils";
import PropTypes from "prop-types";

/**
 * @WeatherCard - Purpose of this component is
 * To create seprate component for weather
 */

export default function WeatherCard(props) {
  const { weatherData, city } = props;

  const [classes, url] = determineGif(weatherData?.weather[0].id);

  let stateOfWeather = weatherData?.weather[0].main;
  let day = true;

  return (
    <div>
      <div className="flex h-40 w-full sm:w-410px">
        <div
          className={`text-white m-2 rounded-lg flex-grow bg-left-bottom ${classes}`}
          style={{
            width: "100px",
            backgroundImage: `url(${url})`,
          }}
        >
          <div className="flex w-full h-full divide-x divide-gray-400 ">
            <div className="w-9/12">
              <div
                className="mt-2 ml-2 p-2 rounded-lg inline-block text-xs"
                style={{
                  boxShadow: "0 0 15px 1px rgba(0, 0, 0, 0.75)",
                  backdropFilter: "blur(2px)",
                }}
              >
                <div className="flex items-center">
                  <EnvironmentFilled />
                  <div className="ml-2">{city}</div>
                </div>
              </div>
              <div className="w-full flex justify-around items-center">
                {/* leftComponent */}
                <div className="flex flex-col text-center">
                  {determineIcon(weatherData?.weather[0].id, day, "h-16 w-16")}
                  <div>{stateOfWeather}</div>
                </div>

                <div className="flex flex-col text-center">
                  <div className="text-5xl">
                    {Math.round(weatherData?.temp?.day)}°
                  </div>
                  <div className="text-lg">
                    {weatherData?.temp.min}/{weatherData?.temp.max}°
                  </div>
                </div>
                <RightComponent
                  speed={weatherData?.speed}
                  deg={weatherData?.deg}
                  feelsLike={Math.round(weatherData?.feels_like.day)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

WeatherCard.propTypes = {
  /**
   * @weatherData paramType {object}- is the object which shows the weather data for 16 days at different cities(locations points)
   */
  weatherData: PropTypes.object,
  /**
   * @city paramType {string}- is the string which shows the city data like name, population etc.
   */
  city: PropTypes.string,
};
