const { Router } = require('express');
const productController = require('../controllers/productController');
const tokenValidationMiddleware = require('../middlewares/tokenValidationMiddleware');

const productRoute = Router();

productRoute.post('/', tokenValidationMiddleware, productController.create);

productRoute.get('/', tokenValidationMiddleware, productController.getAll);

productRoute.get('/:id', tokenValidationMiddleware, productController.getById);

productRoute.put('/:id', tokenValidationMiddleware, productController.update);

productRoute.delete('/:id', tokenValidationMiddleware, productController.delete);

module.exports = productRoute;