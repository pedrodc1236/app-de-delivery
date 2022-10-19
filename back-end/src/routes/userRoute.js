const { Router } = require('express');
const tokenValidationMiddleware = require('../middlewares/tokenValidationMiddleware');

const userController = require('../controllers/userController');

const route = Router();

route.get('/', tokenValidationMiddleware, userController.getAll);
route.get('/seller', tokenValidationMiddleware, userController.getAllSellers);
route.get('/:id', tokenValidationMiddleware, userController.getById);
route.delete('/:id', tokenValidationMiddleware, userController.remove);

module.exports = route;