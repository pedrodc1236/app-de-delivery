const saleProductService = require('../services/salesProductService');

const saleProductController = {

  async create(req, res) {
    const newSaleProduct = await saleProductService.create(req.body);
    return res.status(201).json(newSaleProduct);
  },

  async getAll(req, res) {
    const salesProducts = await saleProductService.getAll(req.body);
    return res.status(200).json(salesProducts);
  },

  async getById(req, res) {
    const { id } = req.params;
    const saleProduct = await saleProductService.getById(id);
    return res.status(200).json(saleProduct);
  },

  async update(req, res) {
    const { id } = req.params;
    const saleProduct = await saleProductService.update(id);
    return res.status(200).json(saleProduct);
  },

  async delete(req, res) {
    const { id } = req.param;
    const saleProduct = await saleProductService.delete(id);
    return res.status(204).json(saleProduct);
  },
};

module.exports = saleProductController;