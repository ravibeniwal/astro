import * as types from "../types";
import {
  getAccessTokenApi,
  loginUserApi,
  getMeApi,
  refreshToken,
  createCustomerApi,
  fetchCustomersApi,
  deleteCustomerApi,
  sendResetPasswordLinkApi,
} from "../api/authApi";
import { Cookies } from "react-cookie";
import { GET_ACCESS_TOKEN, IS_LOGIN, LOGIN_USER } from "../types/userTypes";
import router from "next/router";

// register user api
/**
 * @param {import("redux").Dispatch} dispatch
 */

export const cookies = new Cookies();

export const logoutUserAction = () => async (dispatch) => {
  cookies.set("isLogin", false);
  await dispatch({
    type: IS_LOGIN,
    payload: false,
  });
  router.push("/auth/login");
};

// me api action
export const getMeApiAction = (data, cb) => async (dispatch) => {
  await getMeApi(data)
    .then((res) => {
      if (cb) cb(res);
      dispatch({
        type: LOGIN_USER,
        payload: res,
      });
      dispatch({
        type: IS_LOGIN,
        payload: true,
      });
    })
    .catch(() => {
      dispatch({
        type: LOGIN_USER,
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
      cookies.set("isLogin", true);
      cookies.set("userId", res?.data?._id);
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
      cookies.set("isLogin", false);
      cookies.set("userId", null);
      dispatch({
        type: IS_LOGIN,
        payload: false,
      });
      return;
    });
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
    .catch(() => {});
};
export const fetchCustomersAction = (data, cb) => async () => {
  await fetchCustomersApi(data)
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
export const sendResetPasswordLinkAction = (data, cb) => async () => {
  await sendResetPasswordLinkApi(data)
    .then((res) => {
      if (cb) {
        cb(res);
      }
    })
    .catch((err) => {
      if (cb) {
        cb(err);
      }
    });
};
