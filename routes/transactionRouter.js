const express = require('express');
const isAuthenticated = require('../middlewares/isAuth');
const transactionController = require('../controllers/transactionCtrl');
const transactionRouter = express.Router();

//! Add Transaction
transactionRouter.post(
  '/api/v1/transactions/create',
  isAuthenticated,
  transactionController.create
);

//! Lists Transaction
transactionRouter.get(
  '/api/v1/transactions/lists',
  isAuthenticated,
  transactionController.getFilteredTransactions
);

//! Update Transaction
transactionRouter.put(
  '/api/v1/transactions/update/:id',
  isAuthenticated,
  transactionController.update
);

//! Delete Transaction
transactionRouter.delete(
  '/api/v1/transactions/delete/:id',
  isAuthenticated,
  transactionController.delete
);

module.exports = transactionRouter;
