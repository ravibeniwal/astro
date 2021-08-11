/**
 * Utility methods to be used for invoking API methods
 */
import Axios from "axios";
import { notification } from "antd";
import queryString from "querystring";
import { cookies } from "./store/actions/authActions";
import { refreshToken } from "./store/api/authApi";

export const hostname = () => {
  let hostUrl = "";
  // hostUrl = "http://localhost:3001";
  hostUrl = "https://astrocooler.herokuapp.com";
  return hostUrl;
};

const hostUrl = hostname();

export const makeUrl = ({ uri = "", pathParams, query, version }, host) =>
  `${host || hostUrl}${version}${uri
    .split("/")
    .map((param) =>
      param.charAt(0) === ":" ? encodeURI(pathParams[param.slice(1)]) : param
    )
    .join("/")}${query ? `?${queryString.stringify(query)}` : ""}`;

export const getDefaultHeaders = () => ({
  accessToken: cookies.get("accessToken") || null,
  "Content-Type": "application/json",
});

/**
 * Returns true if the input apiResponse has errors.
 * @param {*} apiResponse
 */
export const hasErrors = (apiResponse) => {
  const { error } = apiResponse;
  if (error) {
    return true;
  }
  return false;
};
/**
 * Generic utility method that should be called when invoking any REST API
 * @param {Object} obj - The employee who is responsible for the project.
 * @param {string} obj.uriEndPoint - Endpoint.
 * @param {string} obj.uriEndPoint.type - GET/POST/PUT/DELETE Endpoint.
 * @param {string} obj.body - Body of the request.
 * @deprecated
 */
export const callApiDeprecated = ({ uriEndPoint, body }) =>
  new Promise((resolve, reject) => {
    Axios({
      ...uriEndPoint,
      url: uriEndPoint.query
        ? `${uriEndPoint.url}?${queryString.stringify(uriEndPoint.query)}`
        : uriEndPoint.url,
      headers: {
        accessToken: localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
      data: body || {},
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        // extract the error message
        reject(err.response);
      });
  });

const callAxios = ({
  uriEndPoint = { uri: "", method: "", version: "", headerProps: {} },
  pathParams,
  query,
  body,
}) =>
  Axios({
    method: uriEndPoint.method,
    url: makeUrl({ ...uriEndPoint, pathParams, query }),
    headers: {
      ...getDefaultHeaders(),
      ...uriEndPoint.headerProps,
    },
    data: body || {},
  });

/**
 * Extract the error messages from a failed API response.
 * @param {} apiResponse
 */
// const extractErrors = () => {};
/**
 * Generic utility method that should be called when invoking any REST API
 *
 * This function streamlines the functionality to make api calls,
 * and carries easy management for controlling versions of the apis
 *
 * @since 2.0.0
 *
 * @todo all the incoming values for the APIParamaters.pathParams and APIParamaters.query
 * should be uri encoded.
 * @alias callApi
 * @memberof apiUtils
 * @param {Object} APIParamaters - Set of objects required to make the api call.
 * @param {Object} APIParamaters.uriEndPoint - Endpoint object as described in apiEndPoints.js.
 * @param {String} APIParamaters.uriEndPoint.uri - Path to your endpoint
 * @param {String} APIParamaters.uriEndPoint.method - POST/GET/PUT/DELETE etc.
 * @param {String} APIParamaters.uriEndPoint.version - Versioning of your api
 * @param {Object} APIParamaters.uriEndPoint.headerProps - Object of headers you want to pass.
 * @param {Object} APIParamaters.pathParams - Path parameters. Example :id in the path,
 * then pathParams object will be {id:value}.
 * @param {Object} APIParamaters.query - GET/POST/PUT/DELETE Endpoint.
 * @param {Object} APIParamaters.body - Body of the request.
 * @returns {Promise<object>} Body Data from the server.
 */
export const callApi = (
  {
    uriEndPoint = { uri: "", method: "", version: "", headerProps: {} },
    pathParams,
    query,
    body,
    apiHostUrl,
  },
  options
) =>
  new Promise((resolve, reject) => {
    callAxios({
      uriEndPoint,
      pathParams,
      query,
      body,
      apiHostUrl,
    })
      .then((response) => {
        resolve(response.data);
        // eslint-disable-next-line no-underscore-dangle
        localStorage.setItem("timer", 1800);
        // localStorage.setItem('tokenUsed', 'true');
      })
      .catch(async (err) => {
        if (!err.response) {
          return;
        }
        const errorMessage = err.response.data.message;

        if (err.response.status === 500) {
          notification.error({
            message: "Internal Server Error!",
            description: "HTTP Status 500 – Internal Server Error",
          });
          return reject(err.response);
        }
        if (err.response.status === 401) {
          await refreshToken();
          await callAxios({
            uriEndPoint,
            pathParams,
            query,
            body,
          })
            .then((response) => {
              resolve(response.data);
            })
            .catch((error) => reject(error.response));
          notification.error({
            message: "Something went wrong!",
            description: errorMessage,
          });
          reject(err.response);
          return null;
        }

        !options?.disableNotifications &&
          notification.error({
            message: "Something went wrong!",
            description: errorMessage,
          });
        return reject(err.response);
      });
  });
