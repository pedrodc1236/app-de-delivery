const express = require('express');

const route = express.Router();

// https://programandosolucoes.dev.br/2021/02/16/arquivos-estaticos-express/
route.use('/images', express.static('./src/images'));

module.exports = route;