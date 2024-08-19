const express = require('express');
const usersController = require('../controllers/usersCtrl');
const isAuthenticated = require('../middlewares/isAuth');
const userRouter = express.Router();

//! Register
userRouter.post('/api/v1/users/register', usersController.register);

//! Login
userRouter.post('/api/v1/users/login', usersController.login);

//! Profile
userRouter.get(
  '/api/v1/users/profile',
  isAuthenticated,
  usersController.profile
);

//! Change password
userRouter.put(
  '/api/v1/users/change-password',
  isAuthenticated,
  usersController.changeUserPassword
);

//! Update profile
userRouter.put(
  '/api/v1/users/update-profile',
  isAuthenticated,
  usersController.updateUserProfile
);

module.exports = userRouter;
