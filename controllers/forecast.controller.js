const forecastModel = require("../models/forecast.model");

exports.saveForecastRoute = (req, res) => {
  // create forecast if forecast does not exist
  const forecast = new forecastModel({
    destinationformattedAddress: req.body?.destinationformattedAddress || "",
    originformattedAddress: req.body?.originformattedAddress || "",
    shippingDate: req.body?.shippingDate,
    email: req.body?.email,
    estimatedTransitTime: req.body?.estimatedTransitTime,
    shipmentGoingThroughChicago: req.body?.shipmentGoingThroughChicago,
  });
  forecast
    .save()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

exports.getForecastRoutes = (req, res) => {
  forecastModel
    .find({ email: req.body?.email })
    .then((_routes) => {
      res.status(200).json(_routes);
    })
    .catch((err) => {
      res.status(500).json({ error: err, message: "Error in fetching" });
    });
  // create forecast if forecast does not exist
};
