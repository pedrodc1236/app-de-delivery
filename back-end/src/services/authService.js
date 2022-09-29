const Joi = require('joi');
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const fs = require('fs');
const models = require('../database/models');
const { UnauthorizedError, ValidationError, NotFoundError } = require('../middlewares/errors');

const authService = {
  async validateAuthorization(unknown) {
    const schema = Joi.string().required();
    try {
      const result = await schema.validateAsync(unknown);
      return result;
    } catch (error) {
      UnauthorizedError('Token not found');
    }
  },
  async validateBodyLogin(unknown) {
    const schema = Joi.object({
      email: Joi.string().required().email().max(255),
      password: Joi.string().required().min(6),
    });
    try {
      const result = await schema.validateAsync(unknown);
      return result;
    } catch (error) {
      ValidationError('Some required fields are missing');
    }
  },
  async makeToken(user) {
    const { name, email, role } = user;
    const secret = fs.readFileSync('./jwt.evaluation.key', 'utf8');
    const payload = { name, email, role };
    const token = jwt.sign(payload, secret);
    return token;
  },
  async readToken(token) {
    const secret = fs.readFileSync('./jwt.evaluation.key', 'utf8');
    try {
      const { email } = jwt.verify(token, secret);
      return email;
    } catch (error) {
      UnauthorizedError('Expired or invalid token');
    }
  },
  async validateUserByEmail(data) {
    const { email } = data;
    const userModel = await models.User.findOne({
      where: { email },
    });
    if (!userModel) {
      NotFoundError('Invalid email');
    }
    return userModel;
  },
  async verifyUserPassword(dataPassword, userPassword) {
    const icnryptedPassword = md5(dataPassword);
    if (userPassword !== icnryptedPassword) {
      NotFoundError('Invalid password');
    }
  },
};

module.exports = authService;