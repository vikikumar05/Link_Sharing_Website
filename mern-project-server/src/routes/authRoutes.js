const express = require('express');
const authController = require('../controller/authController');
const router = express.Router(); // instance of  Router
const {body} = require('express-validator'); // to validate the request body

const loginValidator = [
    body('username').notEmpty().withMessage('Username is required').isEmail().withMessage('Username must be a valid email'),
    body('password').notEmpty().withMessage('Password is required').isLength({ min: 4 }).withMessage('Password must be at least 6 characters long')
];


router.post('/login',loginValidator, authController.login); // POST request to /login
router.post('/logout', authController.logout);
router.post('/isUserLoggedIn', authController.isUserLoggedIn); // POST request to /isUserLoggedIn
router.post('/register', authController.register); // 
router.post('/google-auth', authController.googleAuth);



module.exports = router;