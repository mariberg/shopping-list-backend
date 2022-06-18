/* eslint-disable indent */
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

// this function takes the token, decodes and checks it
function verifyToken(req, res, next) {

  // token can come from either body or headers
  const token = req.body.token || req.headers['x-access-token'];
  // decoding the tocken
  if (token) {
    // verify checks that token is valid and not expired
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: 'Token not valid or expired.',
        });
      } else {
        // Decoded token is saved in request-object
        req.decoded = decoded;
        next(); // moving to controller's methods
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'Token not does exist.',
    });
  }
}

module.exports = verifyToken;