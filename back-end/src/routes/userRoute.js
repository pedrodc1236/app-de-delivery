const { Router } = require('express');

const userController = require('../controllers/userController');

const route = Router();

route.get('/', userController.getAll);

module.exports = route;