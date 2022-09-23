const { Router } = require('express');

const saleController = require('../controllers/saleController');

const authMiddleware = require('../middlewares/tokenValidationMiddleware');

const route = Router();

route.post('/', authMiddleware, saleController.create);

route.get('/', authMiddleware, saleController.getAll);

route.get('/:id', authMiddleware, saleController.getById);

route.put('/:id', authMiddleware, saleController.update);

route.delete('/:id', authMiddleware, saleController.remove);

module.exports = route;