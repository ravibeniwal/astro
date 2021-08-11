import { foreCast } from "../types";

const initialState = {
  routeData: {},
  weatherData: [],
  weatherDataWithDays: [],
  weatherDataLoader: false,
};

export const foreCastReducer = (state = initialState, action) => {
  switch (action.type) {
    case foreCast.SAVE_FORECAST_ROUTE:
      return {
        ...state,
        routeData: action.payload,
      };
    case foreCast.SAVE_WEATHER_DATA:
      return {
        ...state,
        weatherData: action.payload,
      };
    case foreCast.SAVE_WEATHER_DATA_LOADER:
      return {
        ...state,
        weatherDataLoader: action.payload,
      };
    case foreCast.SAVE_FINAL_DATA_WITH_DAYS_ADDED:
      return {
        ...state,
        weatherDataWithDays: action.payload,
      };
    default:
      return state;
  }
};
