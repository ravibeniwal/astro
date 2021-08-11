import Axios from "axios";
import { callApi } from "../../apiUtils";
import { user } from "../apiEndPoints";

export const foreCastWeatherDataApi = async ({ lat, lng }) => {
  try {
    const response = await Axios({
      baseURL: "https://api.openweathermap.org",
      method: "get",
      url: `/data/2.5/forecast/daily?lat=${lat}&lon=${lng}&cnt=${16}&units=metric&mode=json&appid=${
        process.env.OPEN_WEATHER_KEY
      }`,
    });
    return response?.data;
  } catch (e) {
    return e;
  }
};
//For adding the forcast route
export const addRouteApi = (data) => {
  return callApi(
    {
      uriEndPoint: user.addRoute.v1,
      body: data,
    },
    { disableNotifications: true }
  );
};

//For getting the all forecast routes
export const getForecastRoutesApi = (data) => {
  return callApi(
    {
      uriEndPoint: user.getRoutes.v1,
      body: data,
    },
    { disableNotifications: true }
  );
};
