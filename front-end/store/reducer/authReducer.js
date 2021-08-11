import * as types from "../types";
import { LOGIN_USER, SET_CURRENT_USER } from "../types/userTypes";

const initialState = {
  isLogin: true,
  registerData: {},
  loading: false,
  loginData: {},
  submitting: false,
  error: null,
  accessToken: null,
  refreshToken: null,
  currentUser: null,
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.user.IS_LOGIN:
      return {
        ...state,
        isLogin: action.payload,
      };
    case types.user.REGISTER_USER:
      return {
        ...state,
        registerData: action.payload,
        error: null,
        loading: false,
      };

    case LOGIN_USER:
      return {
        ...state,
        loginData: action.payload,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

    case types.user.GET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    default:
      return state;
  }
};
