const productService = require('../services/productService');

const saleProductController = {

  async create(req, res) {
    const newSaleProduct = await productService.create(req.body);
    return res.status(201).json(newSaleProduct);
  },

  async getAll(req, res) {
    const salesProducts = await productService.getAll(req.body);
    return res.status(200).json(salesProducts);
  },

  async getById(req, res) {
    const { id } = req.params;
    const saleProduct = await productService.getById(id);
    return res.status(200).json(saleProduct);
  },

  async update(req, res) {
    const { id } = req.params;
    const saleProduct = await productService.update(id);
    return res.status(200).json(saleProduct);
  },

  async delete(req, res) {
    const { id } = req.param;
    const saleProduct = await productService.delete(id);
    return res.status(204).json(saleProduct);
  },
};

module.exports = saleProductController;