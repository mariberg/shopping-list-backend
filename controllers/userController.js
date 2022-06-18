const bcrypt = require('bcryptjs');
const User = require('../models/User.js');
const createToken = require('../createToken.js'); // this is where we create the token

let currentUser = '';

const UserController = {

  // eslint-disable-next-line indent
  // registering new user
  registerUser: function (req, res, next) {

    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
      username: req.body.username,
      password: hashedPassword,
    },
      (err, user) => {
        if (err) {
          return res.status(500).send('Error in registering user.');
        } else {
          res.json({
            success: true,
            message: 'User registered!',
          });
        }
      });
  },
  // if a user is authenticated, a token is created
  authenticateUser: function (req, res, next) {

    User.findOne({
      username: req.body.username,
    }, function (err, user) {
      if (err) {
        throw err;
      }
      if (!user) {
        res.json({
          success: false,
          message: 'Login failed, user does not exist.',
        });
      } else if (user) {
        // comparing password to the one we have in the database
        if (bcrypt.compareSync(req.body.password, user.password) === false) {
          res.json({
            success: false,
            message: 'Incorrect password.',
          });
        } else {
          const token = createToken(user); // if password is matching, token is created
          // token is returned as json
          res.json({
            success: true,
            message: 'This is your token!',
            token: token,
            user: user.username,
          });
          return currentUser = user.username;
        }
        currentUser = user.username;
      }
      currentUser = user.username;

    });
  },
};


module.exports = UserController;
module.exports.currentUser = currentUser;