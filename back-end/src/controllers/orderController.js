const orderService = require('../services/ordersService');

const orderController = {
  async create(req, res) {
    const { body } = req;
    const data = await orderService.validateData(body);
    const newSale = await orderService.create(data);
    res.status(201).json(newSale);
  },

  async getAll(_req, res) {
    const all = await orderService.getAll();
    res.status(200).json(all);
  },

  async getById(req, res) {
    const { id } = req.params;
    const sale = await orderService.getById(id);
    res.status(200).json(sale);
  },

  async update(req, res) {
    const { body } = req;
    const { id } = req.params;
    const data = await orderService.validateData(body);
    const updateSale = await orderService.update(id, data);

    res.status(200).json(updateSale);
  },

  async remove(req, res) {
    const { id } = req.params;
    await orderService.remove(id);

    res.status(204).end();
  },
};

module.exports = orderController;