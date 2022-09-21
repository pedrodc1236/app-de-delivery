const { Router } = require('express');

const registerController = require('../controllers/registerController');

const route = Router();

route.post('/', registerController.create);

module.exports = route;