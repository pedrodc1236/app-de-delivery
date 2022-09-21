const express = require('express');
require('express-async-errors');
const errorHandlerMiddleware = require('../middlewares/errorHandlerMiddleware');
const registerRouter = require('../routes/register.route');

const app = express();

app.use(express.json());

app.use('/register', registerRouter);

app.use(errorHandlerMiddleware);

app.get('/coffee', (_req, res) => res.status(418).end());
module.exports = app;
