const asyncHandler = require('express-async-handler');
const Transaction = require('../model/Transaction');

const transactionController = {
  //! Add Transaction
  create: asyncHandler(async (req, res) => {
    const { type, category, amount, date, description } = req.body;

    if (!amount || !type || !date) {
      throw new Error('Name and type are required for creating a category!');
    }

    //! Create Transaction
    const transaction = await Transaction.create({
      user: req.user,
      type,
      category,
      amount,
      description,
    });

    res.status(201).json(transaction);
  }),

  //! Lists Transaction
  getFilteredTransactions: asyncHandler(async (req, res) => {
    const { startDate, endDate, type, category } = req.query;
    let filters = { user: req.user };

    if (startDate) {
      filters.date = { ...filters.date, $gte: new Date(startDate) };
    }

    if (endDate) {
      filters.date = { ...filters.date, $lte: new Date(endDate) };
    }

    if (type) {
      filters.type = type;
    }

    if (category) {
      if (category === 'All') {
        //! No category filtering needed when filtering for 'All'
      } else if (category === 'Uncategorized') {
        //! Filter for transactions that are specifically categorized as 'Uncategorized'
        filters.category = 'Uncategorized';
      } else {
        filters.category = category;
      }
    }

    const transactions = await Transaction.find(filters).sort({ date: -1 });
    res.json({ transactions });
  }),

  //! Update Transaction
  update: asyncHandler(async (req, res) => {
    //! Find the transaction
    const transaction = await Transaction.findById(req.params.id);

    if (transaction && transaction.user.toString() === req.user.toString()) {
      (transaction.type = req.body.type || transaction.type),
        (transaction.category = req.body.category || transaction.category),
        (transaction.amount = req.body.amount || transaction.amount),
        (transaction.date = req.body.date || transaction.date),
        (transaction.description =
          req.body.description || transaction.description);

      //! Update
      const updatedTransaction = await transaction.save();
      res.json(updatedTransaction);
    }
  }),

  //! Delete Transaction
  delete: asyncHandler(async (req, res) => {
    //! Find the transaction
    const transaction = await Transaction.findById(req.params.id);

    if (transaction && transaction.user.toString() === req.user.toString()) {
      await Transaction.findByIdAndDelete(req.params.id);
      res.json({ message: 'Transaction Removed' });
    }
  }),
};

module.exports = transactionController;
