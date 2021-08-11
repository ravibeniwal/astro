"use strict";

const express = require("express");
var path = require('path');
var router = express.Router({ mergeParams: true });
const controller = require("../controllers/files.controller");
var { mediaHost } = require("../config");
const multer = require("multer");
const { v4: uuid_v4 } = require('uuid');

var filename = "";

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, mediaHost())
  },
  filename(req, file, cb) {
    var dir = "images/";
    filename =
    dir+
    uuid_v4(); +
      "." +
      file.originalname;
    cb(null, filename);
  }
});
const upload = multer({ storage });

router.post("/uploadImage", upload.single("file"), controller.uploadImage);
router.get("/getImagesDataWithUserLocation", upload.single("file"), controller.getImagesDataWithUserLocation);

module.exports = router;
