const authService = require('../services/authService');
/**
 * 
 * @param {Error} err 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
const tokenValidationMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  const validator = await authService.validateAuthorization(token);
  const user = await authService.readToken(validator);
  req.user = user;
  next();
};

module.exports = tokenValidationMiddleware;