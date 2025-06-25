const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateUserRegistration, validateUserAuthentication } = require('../middleware/validation');


router.post('/register', validateUserRegistration, userController.registerUser);

router.post('/login', validateUserAuthentication, userController.authenticateUser);

module.exports = router;
