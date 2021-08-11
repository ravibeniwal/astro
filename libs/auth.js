/* eslint-disable consistent-return */
const jwt = require("jsonwebtoken");

exports.verifyJWTToken = (req, token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, "philance_secret", (err, decodedToken) => {
      const timePassed =
        ((new Date().getTime() / 1000).toPrecision(10) - decodedToken.iat) /
        3600;

      // token should be valid for 1 hr only
      if (decodedToken && req.headers.refreshtoken) {
        return resolve(decodedToken);
      }
      if (timePassed > 1) {
        // eslint-disable-next-line prefer-promise-reject-errors
        return reject({ err: "Token Expired" });
      }
      if (err || !decodedToken) {
        return reject(err);
      }
      resolve(decodedToken);
    });
  });
