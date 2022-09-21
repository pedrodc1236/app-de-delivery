const authService = require('../services/authService');

/** @type {Record<string, import('express').RequestHandler>} */
const authController = {
  async login(req, res) {
    const data = await authService.validateBodyLogin(req.body);
    const user = await authService.validateUserByEmail(data);
    await authService.verifyUserPassword(data.password, user.password);
    const token = await authService.makeToken(user);
    res.json({ token });
  },
  async list(_req, res) {
    const users = await authService.list();
    res.json(users);
  },
};

module.exports = authController;