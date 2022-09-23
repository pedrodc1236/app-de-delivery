const saleService = require('../services/saleService');

const saleController = {
  async create(req, res) {
    const { body } = req;
    const data = await saleService.validateData(body);
    const newSale = await saleService.create(data);
    res.status(201).json(newSale);
  },

  async getAll(_req, res) {
    const all = await saleService.getAll();
    res.status(200).json(all);
  },

  async getById(req, res) {
    const { id } = req.params;
    const sale = await saleService.getById(id);
    res.status(200).json(sale);
  },

  async update(req, res) {
    const { body } = req;
    const { id } = req.params;
    const data = await saleService.validateData(body);
    const updateSale = await saleService.update(id, data);

    res.status(200).json(updateSale);
  },

  async remove(req, res) {
    const { id } = req.params;
    await saleService.remove(id);

    res.status(204).end();
  },
};

module.exports = saleController;