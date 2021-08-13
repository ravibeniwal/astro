const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
  email: { type: String, required: [true, "email is required"] },
  name: String,
  imageUrl: String,
  role: String,
  password: String,
  loginCount: { type: Number },
  creationDate: { type: Date, default: Date.now },
  lastloginDate: { type: Date },
  lastUpdatedDate: { type: Date, default: Date.now },
});

//Export the model
module.exports = mongoose.model("user", userSchema);
