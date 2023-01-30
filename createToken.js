/* eslint-disable indent */
const jwt = require('jsonwebtoken');


function createToken(user) {

  const payload = {
    'username': user.username,
  };
  console.log(payload);
  const token = jwt.sign(payload, process.env.SECRET, {
    expiresIn: 60 * 60 * 24,
  });

  return token;
}

module.exports = createToken;