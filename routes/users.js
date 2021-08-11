var express = require("express");
const {
  saveForecastRoute,
  getForecastRoutes,
} = require("../controllers/forecast.controller");
const {
  login,
  createUser,
  getAllUsers,
  deleteUser,
  resetPassword,
} = require("../controllers/user.controllers");
const authMiddleware = require("../helpers/middlewares/authMiddleware");
var router = express.Router();

const verify = authMiddleware.verifyJWT_MW;
router.post("/login", login);
router.post("/createUser", createUser);
router.get("/", getAllUsers);
router.post("/deleteUser", deleteUser);
router.post("/resetPassword", resetPassword);
router.post("/saveForecast", saveForecastRoute);
router.post("/getForecastRoutes", getForecastRoutes);

module.exports = router;
