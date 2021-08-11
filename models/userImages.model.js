const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userImageSchema = new mongoose.Schema({
  name: String,
  originalName: String,
  height:String,
  width:String,
  size:String,
  extension:String,
  attachment: String,
  attachmentPath:String,
  userName:String,
  imageLocation:{
    lat:Number,
    lang:Number
  },
  // creationDate: new Date(),
  // lastUpdatedDate: new Date(),
});



//Export the model
module.exports = mongoose.model('userImages', userImageSchema);