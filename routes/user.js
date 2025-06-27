const { Router } = require('express');
const router = Router();
const userController = require('../controllers/userController');

router.get('/signUp', userController.renderSignUp);
router.get('/signIn', userController.renderSignIn);
router.post('/signUp', userController.signUp);
router.post('/signIn', userController.signIn);
router.get('/signOut', userController.signOut);

module.exports = router;
