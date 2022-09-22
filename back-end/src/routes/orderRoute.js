const { Router } = require('express');

const orderController = require('../controllers/orderController');

const authMiddleware = require('../middlewares/tokenValidationMiddleware');

const route = Router();

route.post('/', authMiddleware, orderController.create);

route.get('/', authMiddleware, orderController.getAll);

route.get('/:id', authMiddleware, orderController.getById);

route.put('/:id', authMiddleware, orderController.update);

route.delete('/:id', authMiddleware, orderController.remove);

module.exports = route;