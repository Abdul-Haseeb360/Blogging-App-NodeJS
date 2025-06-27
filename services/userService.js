const userRepository = require('../repositories/userRepository');

exports.registerUser = async ({ fullName, email, password }) => {
  if (!fullName || !email || !password) {
    throw new Error('All fields are required');
  }

  // You can also check if user already exists here
  return await userRepository.create({ fullName, email, password });
};

exports.loginUser = async (email, password) => {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  return await userRepository.matchPasswordAndGenerateToken(email, password);
};
