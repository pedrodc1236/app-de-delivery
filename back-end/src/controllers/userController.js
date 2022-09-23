const userService = require('../services/userService');

const userController = {
  async getAll(_req, res) {
    const all = await userService.getAll();
    res.status(200).json(all);
  },
};

module.exports = userController;