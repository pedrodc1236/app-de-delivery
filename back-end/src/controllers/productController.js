const productService = require('../services/productService');

const productController = {

  async create(req, res) {
    const newProduct = await productService.create(req.body);
    return res.status(201).json(newProduct);
  },

  async getAll(req, res) {
    const products = await productService.getAll(req.body)
    return res.status(200).json(products);
  },

  async getById(req, res) {
    const { id } = req.param
    const product = await productService.getById(id);
    return res.status(200).json(product);
  },

  async update(req, res) {
    const { id } = req.param
    const product = await productService.update(id);
    return res.status(200).json(product);
  },

  async delete(req, res) {
    const { id } = req.param;
    const product = await productService.delete(id);
    return res.status(204).json(product);
  }
}

module.exports = productController;