const User = require('../models/user');
const passport = require("passport")

module.exports.registerUser = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const user = new User({ username, email });

    const registeredUser = await User.register(user, password);

    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      res.send(registeredUser);
    });
  } catch (error) {
    next(error);
  }
};

module.exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log('Authentication Error:', err);
      return next(err);
    }
    if (!user) {
      console.log('No User Found:', info);
      return res.status(400).json({ message: 'Incorrect username or password' });
    }
    req.logIn(user, (err) => {
      if (err) {
        console.log('Login Error:', err);
        return next(err);
      }
      return res.json({ message: 'Logged in successfully', user });
    });
  })(req, res, next);
};



  module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        return next(err)
    });
    console.log("Logout successful");
    res.send("Logout successful")
  }

  