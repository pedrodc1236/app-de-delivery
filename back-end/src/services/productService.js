const Product = require('../database/models/products');
const { NotFoundError } = require('../middlewares/errors');

const productService = {

  async create(body) {
    const newProduct = await Product.create(body);
    return newProduct;
  },

  async getAll() {
    const products = await Product.findAll({ raw: true });
    return products;
  },

  async getById(id) {
    const product = await Product.findOne({ where: { id } });
    if (!product) {
      return NotFoundError('Product not found');
    }
    return product;
  },

  async update(id) {
    const product = await Product.update(id);
    if (!product) {
      return NotFoundError('Product not found');
    }
    return product;
  },

  async delete(id) {
    const product = await Product.delete(id);
    if (!product) {
      return NotFoundError('Product not found');
    }
    return product;
  },
}

module.exports = productService;