const express = require('express');
const wrapAsync = require('../utility/wrapAsync');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const { savedRedirectUrl } = require('../middelware');
const usercontroller = require('../controllers/user');


router.route('/signup')
.get(usercontroller.signUpPage)
.post(wrapAsync(usercontroller.registerUser));


router.route('/login')
.get(usercontroller.login)
.post(savedRedirectUrl, passport.authenticate('local', {failureRedirect: '/login', failureFlash: true}), usercontroller.loginUser);


router.get('/logout', usercontroller.logOutUser);

module.exports = router;