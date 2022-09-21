const Joi = require('joi');
const md5 = require('md5');
const { User } = require('../database/models');
const { ValidationError } = require('../middlewares/errors');

const registerService = {
  async validateData(body) {
    const schema = Joi.object({
      name: Joi.string().required().min(2),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
      role: Joi.string().required(),
    });

    try {
      const result = await schema.validateAsync(body);

      return result;
    } catch (error) {
      ValidationError('Error Validation');
    }
  },

  async validateUserByEmail(email) {
    const userModel = await User.findOne({
      where: { email },
    });
    if (userModel) {
      ValidationError('Email exists');
    }
    return userModel;
  },
  
  async create(reqBody) {
    const { name, email, password, role } = reqBody;

    const newPassword = md5(password);

    const newUser = await User.create({ name, email, password: newPassword, role });

    return newUser;
  },
};

module.exports = registerService;