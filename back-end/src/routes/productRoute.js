const  { Router } = require('express')
const productController = require('../controllers/productController');

const productRoute = Router();

productRoute.post('/', productController.create);

productRoute.get('/', productController.getAll);

productRoute.get('/:id', productController.getById);

productRoute.put('/:id', productController.update);

productRoute.delete('/:id', productController.delete);

module.exports = productRoute;