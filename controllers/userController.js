const userService = require('../services/userService');

// Renders
exports.renderSignUp = (req, res) => res.render('signUp');
exports.renderSignIn = (req, res) => res.render('signIn');

// Signup Handler
exports.signUp = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    await userService.registerUser({ fullName, email, password });
    return res.redirect('/');
  } catch (err) {
    return res.render('signUp', { error: err.message });
  }
};

// Signin Handler
exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await userService.loginUser(email, password);
    return res.cookie('token', token).redirect('/');
  } catch (err) {
    return res.render('signIn', { error: 'Incorrect Email or Password' });
  }
};

// Signout
exports.signOut = (req, res) => {
  res.clearCookie('token').redirect('/');
};
