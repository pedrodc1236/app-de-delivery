const { Router } = require('express');

const registerController = require('../controllers/Register');

const route = Router();

route.post('/', registerController.create);

module.exports = route;