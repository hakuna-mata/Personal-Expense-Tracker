const express = require('express');
const router = express.Router();
const passport = require('passport');
const { registerUser,login,logout } = require('../controllers/user');
const wrapAsync = require('../utils/wrapAsync');

// Signup route
router.post('/register', wrapAsync(registerUser));

//Login route
router.post("/login",login)

//Logout route
router.get("/logout",logout)

module.exports = router;
