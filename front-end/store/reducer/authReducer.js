import * as types from "../types";
import { LOGIN_USER } from "../types/userTypes";

const initialState = {
  isLogin: false,
  registerData: {},
  loading: false,
  loginData: {},
  error: null,
  accessToken: null,
  refreshToken: null,
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.user.IS_LOGIN:
      return {
        ...state,
        isLogin: action.payload,
      };

    case LOGIN_USER:
      return {
        ...state,
        loginData: action.payload,
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
