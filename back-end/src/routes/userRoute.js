const { Router } = require('express');
const tokenValidationMiddleware = require('../middlewares/tokenValidationMiddleware');

const userController = require('../controllers/userController');

const route = Router();

route.get('/', userController.getAll);
route.get('/:id', tokenValidationMiddleware, userController.getById);

module.exports = route;