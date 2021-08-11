const UserImages = require("../models/userImages.model");
var {promisify} = require("util");
var sizeOf = promisify(require("image-size"));

exports.uploadImage = async (req, res) => {
  let width = 0;
  let height = 0;
  // this function is for finding the image width and height
  await sizeOf("uploads/files/" + req.file.filename)
    .then((dimensions) => {
      width = dimensions.width;
      height = dimensions.height;
    })
    .catch((err) => console.error(err));

  let extArray = req.file.mimetype.split("/");
  let extension = extArray[extArray.length - 1];
  const userImages = new UserImages({
    name: req.file.filename,
    originalName: req.file.originalname,
    height: height,
    width: width,
    size: req.file.size,
    extension: extension,
    attachment: `/files/${req.file.filename}`,
    attachmentPath: req.file.path,
    userName: req.body?.param && JSON.parse(req.body?.param)?.userInfo?.userName,
    imageLocation: req.body?.param && JSON.parse(req.body?.param)?.userInfo?.location,
  });
  userImages
    .save()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({message: err});
    });
};

exports.getImagesDataWithUserLocation = (req, res) => {
  UserImages.find()
    .then((data) => {
      const response = {
        imagesWithLocation: data,
        count: data.length,
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({message: err});
    });
};
