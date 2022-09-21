/* const authService = require('../database/services/authService');

/**
 * 
 * @param {Error} err 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
/* const tokenValidationMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  const validator = await authService.validateAuthorization(token);
  const user = await authService.readToken(validator);
  req.user = user;
  next();
};

module.exports = tokenValidationMiddleware; */