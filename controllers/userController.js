const bcrypt = require('bcryptjs');
const User = require('../models/User.js');
const createToken = require('../createToken.js'); // this is where we create the token

let currentUser = '';

/**
 * Standard error response handler
 * @param {Error} error - The error object
 * @param {Object} res - Express response object
 * @param {String} operation - Description of the operation that failed
 * @param {Number} statusCode - HTTP status code (default: 500)
 */
const handleError = (error, res, operation, statusCode = 500) => {
  console.error(`Error in ${operation}:`, error);
  res.status(statusCode).json({
    success: false,
    message: `Failed to ${operation}`,
    error: error.message
  });
};

const UserController = {

  // eslint-disable-next-line indent
  // registering new user
  registerUser: function (req, res, next) {
    try {
      const { username, password } = req.body;
      
      const hashedPassword = bcrypt.hashSync(password, 8);

      User.create({
        username: username,
        password: hashedPassword,
      },
      (err, user) => {
        if (err) {
          // Check for duplicate key error (MongoDB code 11000)
          if (err.code === 11000) {
            return res.status(409).json({
              success: false,
              message: 'Username already exists',
              error: err.message
            });
          }
          return handleError(err, res, 'register user');
        }
        
        res.status(201).json({
          success: true,
          message: 'User registered successfully'
        });
      });
    } catch (error) {
      handleError(error, res, 'register user');
    }
  },
  // if a user is authenticated, a token is created
  authenticateUser: function (req, res, next) {
    try {
      const { username, password } = req.body;

      User.findOne({
        username: username,
      }, function (err, user) {
        if (err) {
          return handleError(err, res, 'authenticate user');
        }
        
        if (!user) {
          return res.status(401).json({
            success: false,
            message: 'Login failed, user does not exist',
          });
        }
        
        // comparing password to the one we have in the database
        if (bcrypt.compareSync(password, user.password) === false) {
          return res.status(401).json({
            success: false,
            message: 'Incorrect password',
          });
        }
        
        // if password is matching, token is created
        const token = createToken(user); 
        
        // Set current user and return token as json
        currentUser = user.username;
        
        res.status(200).json({
          success: true,
          message: 'Authentication successful',
          token: token,
          user: user.username,
        });
      });
    } catch (error) {
      handleError(error, res, 'authenticate user');
    }
  },
};


module.exports = UserController;
module.exports.currentUser = currentUser;