const express = require('express');
require('express-async-errors');

const cors = require('cors');
const authRoute = require('../routes/authRoute');
const registerRouter = require('../routes/registerRoute');
const productRoute = require('../routes/productRoute');
const saleRoute = require('../routes/saleRoute');
const salesProductRoute = require('../routes/salesProductRoute');
const userRoute = require('../routes/userRoute');

const errorHandlerMiddleware = require('../middlewares/errorHandlerMiddleware');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/login', authRoute);
app.use('/register', registerRouter);
app.use('/products', productRoute);
app.use('/sales', saleRoute);
app.use('/sales_products', salesProductRoute);
app.use('/users', userRoute);

app.use(errorHandlerMiddleware);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
