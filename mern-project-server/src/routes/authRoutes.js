const express = require('express');
const authController = require('../controller/authController');
const router = express.Router(); // instance of  Router

router.post('/login', authController.login); // POST request to /login
router.post('/logout', authController.logout);
router.post('/isUserLoggedIn', authController.isUserLoggedIn); // POST request to /isUserLoggedIn
router.post('/register', authController.register); // 


module.exports = router;