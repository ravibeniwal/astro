import { callApi } from "../../apiUtils";
import { access, user } from "../apiEndPoints";
import { cookies } from "../actions/authActions";
import Router from "next/router";

//api for getting me details
export const getMeApi = () => {
  return callApi({
    uriEndPoint: access.me.v1,
    body: {},
  });
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
        storeId: "cflare.product.store",
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
export const fetchCustomersApi = () => {
  return callApi({
    uriEndPoint: user.fetchCustomers.v1,
  });
};

//For deleting the customer
export const deleteCustomerApi = (data) => {
  return callApi({
    uriEndPoint: user.deleteCustomer.v1,
    body: data,
  });
};
//For deleting the customer
export const loginUserApi = (data) => {
  return callApi(
    {
      // pass the user name and password in headerProps as apikey by btoa
      uriEndPoint: user.loginUser.v1,
      body: data,
    },
    { disableNotifications: true }
  );
};
