import * as types from "../types";
import {
  getAccessTokenApi,
  loginUserApi,
  getMeApi,
  refreshToken,
  createCustomerApi,
  fetchCustomersApi,
  deleteCustomerApi,
} from "../api/authApi";
import { Cookies } from "react-cookie";
import {
  GET_ACCESS_TOKEN,
  SET_CURRENT_USER,
  IS_LOGIN,
  LOGIN_USER,
} from "../types/userTypes";
import router from "next/router";

// register user api
/**
 * @param {import("redux").Dispatch} dispatch
 */

export const cookies = new Cookies();

export const logoutUserAction = () => async (dispatch) => {
  await dispatch({
    type: IS_LOGIN,
    payload: false,
  });
};

// me api action
export const getMeApiAction = (data, cb) => async (dispatch) => {
  await getMeApi(data)
    .then((res) => {
      if (cb) cb(res);
      dispatch({
        type: SET_CURRENT_USER,
        payload: res,
      });
    })
    .catch(() => {
      dispatch({
        type: SET_CURRENT_USER,
        payload: null,
      });
      if (cb) cb();
    });
};

export const refreshTokenAction = (data) => async () => {
  await refreshToken(data);
};

// refresh or get access token
export const getAccessTokenAction = (data) => async (dispatch) => {
  const res = await getAccessTokenApi(data);
  if (res?.accessToken) {
    cookies.set("accessToken", res.accessToken);
    cookies.set("refreshToken", res.accessToken);
    dispatch({
      type: types.user.GET_ACCESS_TOKEN,
      payload: res,
    });
  }
};

export const loginUserAction = (data, cb) => async (dispatch) => {
  await loginUserApi(data)
    .then((res) => {
      if (res?.accessToken) {
        cookies.set("accessToken", res.accessToken);
        cookies.set("refreshToken", res.accessToken);
        dispatch({
          type: GET_ACCESS_TOKEN,
          payload: res,
        });
      }
      dispatch({
        type: LOGIN_USER,
        payload: res,
      });
      dispatch({
        type: IS_LOGIN,
        payload: true,
      });
      router.push("/forecast");
      if (cb) cb(res);
    })
    .catch((error) => {
      if (cb) cb(error);
      dispatch({
        type: IS_LOGIN,
        payload: false,
      });
      return;
    });
};

export const sendResetPasswordLink = (data) => async (dispatch) => {
  const response = await sendResetPasswordLink(data);
  if (response.error) {
    // handle logical errors
    const responseData = response.error.data;
    // List of errors returned by server

    let errorMessage = "That didn't work!";
    let errorMessageDescription =
      "An error occurred while trying to send reset password link to you , please check your input and try again.";
    let errorCode = "ACCOUNT_NOT_FOUND";
    if (responseData) {
      // extract the list of messages
      errorMessageDescription = responseData.message;
      errorCode = responseData.code;
    }

    switch (errorCode) {
      case "INVALID_USER_lOGIN_ID":
        errorMessage = "Your account is not found!";
        errorMessageDescription = responseData.message;
        break;
      case "ACCOUNT_NOT_VERIFIED":
        // router.push('/user/verify', {
        //   email: payload.email,
        // });
        errorMessage = "Your account is not verified!";
        errorMessageDescription = responseData.message;
        break;
      case "UNAUTHORIZED":
        errorMessage = "Reset password link send fail failed!";
        errorMessageDescription =
          "An error occurred while trying to log you in, your are not authorized.";
        break;
      default:
        break;
    }

    // alertErrorAudio.play();

    switch (response.error.status) {
      case 500: {
        dispatch({
          type: "setErrorResetPassword",
          payload: {
            message: "Something went wrong!",
            description:
              "We're sorry, server failed to process your request. Please contact support at support@logist.com",
          },
        });
        break;
      }
      case 503: {
        dispatch({
          type: "setErrorResetPassword",
          payload: {
            message: "Service is not available!",
            description:
              "We are not able to connect to the server at this moment. Please contact support at support@logist.com",
          },
        });
        break;
      }
      default: {
        dispatch({
          type: "setErrorResetPassword",
          payload: {
            message: errorMessage,
            description: errorMessageDescription,
          },
        });
      }
    }
  }
  return response;
};

export const clearStates = () => async (dispatch) => {
  dispatch({});
};

export const createCustomerAction = (data, cb) => async () => {
  await createCustomerApi(data)
    .then((res) => {
      if (cb) {
        cb(res);
      }
    })
    .catch((err) => {
      console.log("error data is here", err);
    });
};
export const fetchCustomersAction = (cb) => async () => {
  await fetchCustomersApi()
    .then((res) => {
      if (cb) {
        cb(res);
      }
    })
    .catch((err) => {
      console.log("error in fetching the customers", err);
    });
};
export const deleteCustomerAction = (data, cb) => async () => {
  await deleteCustomerApi(data)
    .then((res) => {
      if (cb) {
        cb(res);
      }
    })
    .catch((err) => {
      console.log("error in fetching the customers", err);
    });
};
