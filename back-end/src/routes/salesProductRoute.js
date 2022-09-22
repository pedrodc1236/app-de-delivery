const { Router } = require('express');
const saleProductController = require('../controllers/salesProductController');
const tokenValidationMiddleware = require('../middlewares/tokenValidationMiddleware');

const salesProductRoute = Router();

salesProductRoute.post('/', tokenValidationMiddleware, saleProductController.create);

salesProductRoute.get('/', tokenValidationMiddleware, saleProductController.getAll);

salesProductRoute.get('/:id', tokenValidationMiddleware, saleProductController.getById);

salesProductRoute.put('/:id', tokenValidationMiddleware, saleProductController.update);

salesProductRoute.delete('/:id', tokenValidationMiddleware, saleProductController.delete);

module.exports = salesProductRoute;