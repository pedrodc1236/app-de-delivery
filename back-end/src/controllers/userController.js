const userService = require('../services/userService');

const userController = {
  async getAll(_req, res) {
    const all = await userService.getAll();
    res.status(200).json(all);
  },

  async getById(req, res) {
    const { id } = req.params;
    const user = await userService.getById(id);
    return res.status(200).json(user);
  },

};

module.exports = userController;