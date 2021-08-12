"use strict";

const express = require("express");
var router = express.Router({ mergeParams: true });
const controller = require("../controllers/files.controller");
var { mediaHost } = require("../config");
const multer = require("multer");
var filename = "";
const storage = multer.diskStorage({
  destination: mediaHost(),
  filename(req, file, cb) {
    var dir = "/images";
    filename = `${dir}/` + file.originalname;
    cb(null, filename);
  },
});
const upload = multer({ storage });

router.post("/uploadImage", upload.single("file"), controller.uploadImage);

module.exports = router;
