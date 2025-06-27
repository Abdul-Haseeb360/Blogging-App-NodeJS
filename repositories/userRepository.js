const User = require('../models/user');

exports.create = (data) => {
  return User.create(data);
};

exports.findByEmail = (email) => {
  return User.findOne({ email });
};

exports.matchPasswordAndGenerateToken = (email, password) => {
  return User.matchPasswordAndGenrateToken(email, password);
}; 