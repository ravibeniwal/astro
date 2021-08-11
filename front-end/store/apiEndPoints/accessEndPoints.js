import defaults from "./defaults";

const access = {
  me: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/me",
    },
  },
  checkToken: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/access/verify/token",
    },
  },
  refreshToken: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/access/refresh",
    },
  },
  getAccessToken: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/access/token",
      headerProps: {
        apiKey: "ZGVtby5tYW5hZ2VyQGRlbW9zdG9yZS5jb206MTIzNDU2",
        storeId: "demo.product.store",
      },
    },
  },
};

export default access;
