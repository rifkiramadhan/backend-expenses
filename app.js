const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter');
const errorHandler = require('./middlewares/errorHandlerMiddleware');
const categoryRouter = require('./routes/categoryRouter');
const transactionRouter = require('./routes/transactionRouter');
const app = express();

//! Connect to mongoose
mongoose
  .connect('mongodb://127.0.0.1:27017/mern-expenses')
  .then(() => console.log('DB Connected'))
  .catch(e => console.log(e));

//! Middlewares
app.use(express.json()); //? Pass incoming json data

//! Routes
app.use('/', userRouter);
app.use('/', categoryRouter);
app.use('/', transactionRouter);

//! Error
app.use(errorHandler);

//! Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`Server is running on this port... ${PORT}`)
);
