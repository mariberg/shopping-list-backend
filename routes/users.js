const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// registering a new user
// http://localhost:3000/users/register
router.post('/register', userController.registerUser);

// login when you already have a username and password
router.post('/login', userController.authenticateUser);

module.exports = router;
