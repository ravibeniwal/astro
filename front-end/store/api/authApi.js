import { callApi } from "../../apiUtils";
import { access, user } from "../apiEndPoints";
import { cookies } from "../actions/authActions";
import Router from "next/router";

//api for getting user details
export const getMeApi = (data) => {
  return callApi(
    {
      uriEndPoint: access.me.v1,
      body: data,
    },
    { disableNotifications: true }
  );
};

//api for getting the access token
export const getAccessTokenApi = () => {
  return callApi({
    uriEndPoint: access.getAccessToken.v1,
    body: {},
  });
};

export const refreshToken = () => {
  return callApi({
    uriEndPoint: {
      uri: "/access/refresh",
      method: "POST",
      version: "/xapi/v1",
      headerProps: {
        refreshToken: cookies.get("refreshToken"),
      },
    },
  })
    .then((res) => {
      if (res) {
        cookies.set("accessToken", res.accessToken);
        cookies.set("refreshToken", res.accessToken);
      }
    })
    .catch(() => Router.replace("/auth/login"));
};

//For creating the customer
export const createCustomerApi = (data) => {
  return callApi({
    uriEndPoint: user.createCustomer.v1,
    body: data,
  });
};

//For creating the customer
export const fetchCustomersApi = (queryData) => {
  return callApi({
    uriEndPoint: user.fetchCustomers.v1,
    query: queryData,
  });
};

//For deleting the customer
export const deleteCustomerApi = (data) => {
  return callApi({
    uriEndPoint: user.deleteCustomer.v1,
    body: data,
  });
};
//For login the user
export const loginUserApi = (data) => {
  return callApi(
    {
      uriEndPoint: user.loginUser.v1,
      body: data,
    },
    { disableNotifications: true }
  );
};
//For sending the reset password link
export const sendResetPasswordLinkApi = (data) => {
  return callApi(
    {
      uriEndPoint: user.resetPasswordLink.v1,
      body: data,
    },
    { disableNotifications: true }
  );
};
