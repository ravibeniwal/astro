import defaults from "./defaults";

const user = {
  create: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/accounts",
    },
  },
  createCustomer: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/users/createUser",
    },
  },
  fetchCustomers: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/users",
    },
  },
  deleteCustomer: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/users/deleteUser",
    },
  },
  loginUser: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/users/login",
    },
  },
  resetPasswordLink: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/users/resetPassword",
    },
  },
  addRoute: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/users/saveForecast",
    },
  },
  getRoutes: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/users/getForecastRoutes",
    },
  },
  login: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/access/token",
    },
  },
  forgotPassword: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/user/reset/password",
    },
  },
  verifyEmailLink: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/user/verify/link",
    },
  },
  checkExisting: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/accounts/emails/:email_id/check-existing",
    },
  },
  resendEmailConfirmation: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/user/resend/emailConfirmation",
    },
  },
  updatePassword: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/user/update/password",
    },
  },
};

export default user;
