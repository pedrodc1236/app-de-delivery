const express = require('express');
require('express-async-errors');
const authRoute = require('../routes/authRoute');
const errorHandlerMiddleware = require('../middlewares/errorHandlerMiddleware');

const app = express();

app.use(express.json());
app.use('/login', authRoute);
app.use(errorHandlerMiddleware);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
