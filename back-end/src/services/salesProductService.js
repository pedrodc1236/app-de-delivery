const { SaleProduct } = require('../database/models');
const { NotFoundError } = require('../middlewares/errors');

const saleProductService = {

  async create(body) {
    const newSaleProduct = await SaleProduct.create(body);
    return newSaleProduct;
  },

  async getAll() {
    const salesProducts = await SaleProduct.findAll({ raw: true });
    return salesProducts;
  },

  async getById(id) {
    const saleProduct = await SaleProduct.findOne({ where: { id } });
    if (!saleProduct) {
      return NotFoundError('Sales products not found');
    }
    return saleProduct;
  },

  async update(id) {
    const saleProduct = await SaleProduct.update(id);
    if (!saleProduct) {
      return NotFoundError('Sales products not found');
    }
    return saleProduct;
  },

  async delete(id) {
    const saleProduct = await SaleProduct.delete(id);
    if (!saleProduct) {
      return NotFoundError('Sales products not found!');
    }
    return saleProduct;
  },
};

module.exports = saleProductService;