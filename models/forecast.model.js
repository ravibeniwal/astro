const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var forecastSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "email is required"],
  },
  destinationformattedAddress: {
    type: String,
    required: [true, "destinationformattedAddress address required"],
  },
  originformattedAddress: {
    type: String,
    required: [true, "originformattedAddress is required"],
  },
  shippingDate: { type: Date, default: Date.now },
  estimatedTransitTime: Number,
  shipmentGoingThroughChicago: String,
});

//Export the model
module.exports = mongoose.model("forecast", forecastSchema);
