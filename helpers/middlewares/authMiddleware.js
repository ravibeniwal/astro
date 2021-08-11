const { verifyJWTToken } = require("../../libs/auth");

exports.verifyJWT_MW = (req, res, next) => {
  const token = req.headers.authorization;

  verifyJWTToken(req, token)
    .then(() => {
      // req.user = decodedToken.data
      next();
    })
    .catch(err => {
      res.status(400).json({
        error: "Invalid auth token provided.",
        message: err
      });
    });
};
