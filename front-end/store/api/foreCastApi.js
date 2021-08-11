import Axios from "axios";

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
