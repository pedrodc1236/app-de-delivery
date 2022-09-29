const { Product, sequelize } = require('../database/models');
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

  async getAllBySale(id) {
    const sql = `SELECT id, name, price, url_image 
    from products as p
    JOIN sales_products as sp 
    ON sp.sale_id = ${id}
    WHERE sp.product_id = p.id 
    GROUP BY p.id`;
    const products = await sequelize.query(sql, { 
      type: sequelize.QueryTypes.SELECT, 
    });
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
      return NotFoundError('Product not found!');
    }
    return product;
  },
};

module.exports = productService;