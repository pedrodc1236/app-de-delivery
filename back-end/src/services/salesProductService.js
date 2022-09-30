const { SaleProduct } = require('../database/models');
const { NotFoundError } = require('../middlewares/errors');

const saleProductService = {

  async create(body) {
    // if (body.length >= 2) {
      const newSaleProduct = await SaleProduct.bulkCreate(body);
      return newSaleProduct;
    // }
    // const newSaleProduct = await SaleProduct.create(body);
    // return newSaleProduct;
  },

  async getAll() {
    const salesProducts = await SaleProduct.findAll({ raw: true });
    return salesProducts;
  },

  async getById(saleId) {
    const saleProduct = await SaleProduct.findAll({ where: { saleId } });
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