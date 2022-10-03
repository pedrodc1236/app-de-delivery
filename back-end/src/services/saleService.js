const Joi = require('joi');
const { Sale } = require('../database/models');
const { ValidationError, NotFoundError } = require('../middlewares/errors');

const notFoundMessage = 'this sale does not exist';

const saleService = {
  async validateData(body) {
    const schema = Joi.object({
      userId: Joi.number().required(),
      sellerId: Joi.number().required(),
      totalPrice: Joi.number().required(),
      deliveryAddress: Joi.string().required(),
      deliveryNumber: Joi.string().required(),
      saleDate: Joi.date().required(),
      status: Joi.string().required(),
    });

    try {
      const result = await schema.validateAsync(body);

      return result;
    } catch (error) {
      ValidationError('Error Validation');
    }
  },

  async create(reqBody) {
    const newSale = await Sale.create(reqBody);
    return newSale;
  },

  async getAll(sellerId) {
    const sales = await Sale.findAll({ where: { sellerId } });
    return sales;
  },

  async getAllByUser(userId) {
    const sales = await Sale.findAll(({
      where: { userId },
    }));
    return sales;
  },

  async getById(id) {
    const sale = await Sale.findByPk(id);

    if (!sale) return NotFoundError(notFoundMessage);

    return sale;
  },

  async update(id, reqBody) {
    const sale = await Sale.findByPk(id);

    if (!sale) return NotFoundError(notFoundMessage);

    const { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, saleDate } = reqBody;

    await Sale.update(
      { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, saleDate },
      { where: { id } },
    );

    return { id, ...reqBody };
  },

  async remove(id) {
    const removeSale = await Sale.destroy({ where: { id } });

    if (!removeSale) return NotFoundError(notFoundMessage);

    return true;
  },
};

module.exports = saleService;