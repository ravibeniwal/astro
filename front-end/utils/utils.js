import {
  WiDayCloudy,
  WiDayFog,
  WiDayRain,
  WiDaySnow,
  WiDaySunny,
  WiDayThunderstorm,
  WiNightClear,
  WiNightCloudy,
  WiNightFog,
  WiNightRain,
  WiNightSnow,
  WiNightThunderstorm,
} from "react-icons/wi";
import { RiDrizzleLine } from "react-icons/ri";

/**
 * Take Full name for the user name
 * @param name string
 */
export function getInitials(name) {
  if (name) {
    let initials = name.match(/\b\w/g) || [];
    initials = (
      (initials.shift() || "") + (initials.pop() || "")
    ).toUpperCase();
    return initials;
  }
  return "";
}
export const dateFormat = "ll";

// conditions based on: https://openweathermap.org/weather-conditions

/**
 * Icon Determine for weather condition
 * @param idOfWeather string id id weather condition
 * @param day boolean it day or night
 * @param classes string class used for icon
 * @returns Icon with classes
 */
export const determineIcon = (idOfWeather, day, classes) => {
  const firstDigit = (idOfWeather + "")[0];

  if (idOfWeather === 800) {
    return day ? (
      <WiDaySunny className={classes} />
    ) : (
      <WiNightClear className={classes} />
    );
  }

  switch (firstDigit) {
    case "2":
      return day ? (
        <WiDayThunderstorm className={classes} />
      ) : (
        <WiNightThunderstorm className={classes} />
      );
    case "3":
      return <RiDrizzleLine className={classes} />;
    case "5":
      return day ? (
        <WiDayRain className={classes} />
      ) : (
        <WiNightRain className={classes} />
      );
    case "6":
      return day ? (
        <WiDaySnow className={classes} />
      ) : (
        <WiNightSnow className={classes} />
      );
    case "7":
      return day ? (
        <WiDayFog className={classes} />
      ) : (
        <WiNightFog className={classes} />
      );
    case "8":
      return day ? (
        <WiDayCloudy className={classes} />
      ) : (
        <WiNightCloudy className={classes} />
      );
  }
};

/**
 *  Determine for weather card background
 * @param idOfWeather string id id weather condition
 * @returns path of gif and class names
 */
export const determineGif = (idOfWeather) => {
  const firstDigit = (idOfWeather + "")[0];

  if (idOfWeather === 800) {
    return ["", "/weatherImage/clear.gif"];
  }

  switch (firstDigit) {
    case "2":
      return ["", "/weatherImage/thunderstorm.gif"];
    case "3":
      return ["", "/weatherImage/drizzle.gif"];
    case "5":
      return ["bg-left-bottom", "/weatherImage/rain.gif"];
    case "6":
      return ["", "/weatherImage/snow.gif"];
    case "7":
      return ["", "/weatherImage/fog.gif"];
    case "8":
      return ["", "/weatherImage/clouds.gif"];
    default:
      return ["", "/weatherImage/clear.gif"];
  }
};

/**
 *  capitalize first letter of string
 * @param string string that need to be passed
 * @returns string
 */
export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 *  debouce function for delaying the keyword typing
 * @param func string that need to be passed
 * @param wait string that need to be passed
 */
export const debounceMethod = (func, wait) => {
  let timeout;
  return (...args) => {
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
};
