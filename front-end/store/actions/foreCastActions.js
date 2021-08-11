import { foreCastWeatherDataApi } from "../api/foreCastApi";
import {
  SAVE_FORECAST_ROUTE,
  SAVE_WEATHER_DATA_LOADER,
  SAVE_WEATHER_DATA,
  SAVE_FINAL_DATA_WITH_DAYS_ADDED,
} from "../types/foreCastTypes";

// Save route action
/**
 * @param {import("redux").Dispatch} dispatch
 */

export const saveRouteAction = (data) => {
  return {
    type: SAVE_FORECAST_ROUTE,
    payload: data,
  };
};
export const getSpecificDaysWeaterData = (data) => {
  return {
    type: SAVE_FORECAST_ROUTE,
    payload: data,
  };
};

// get the Weather at different location points
export const saveMidWayLocationPointsAction = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_WEATHER_DATA_LOADER,
    payload: true,
  });
  const weatherData = [];
  for (let index = 0; index < data.length; index++) {
    const res = await foreCastWeatherDataApi(data[index]);
    weatherData.push(res);
  }
  dispatch({
    type: SAVE_WEATHER_DATA,
    payload: weatherData,
  });
  dispatch({
    type: SAVE_WEATHER_DATA_LOADER,
    payload: false,
  });
};

export const saveFinalWeatherDataWithDays = (data) => {
  return {
    type: SAVE_FINAL_DATA_WITH_DAYS_ADDED,
    payload: data,
  };
};
