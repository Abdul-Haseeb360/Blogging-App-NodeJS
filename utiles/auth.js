const JWT = require("jsonwebtoken");
require("dotenv").config();
const secrate_key = process.env.JWT_SECRET;

function createTokenFroUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
    profileImageURL: user.profileImageURL,
  };
  const token = JWT.sign(payload, secrate_key);
  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, secrate_key);
  return payload;
}

module.exports = {
  createTokenFroUser,
  validateToken,
};
