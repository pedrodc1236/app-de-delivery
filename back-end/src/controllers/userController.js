const userService = require('../services/userService');

const userController = {
  async getAll(_req, res) {
    const all = await userService.getAll();
    res.status(200).json(all);
  },

  async getAllSellers(_req, res) {
    const allUsersByRole = await userService.getAllSellers();
    return res.status(200).json(allUsersByRole);
  },

  async getById(req, res) {
    const { id } = req.params;
    const user = await userService.getById(id);
    return res.status(200).json(user);
  },

  async remove(req, res) {
    const { id } = req.params;
    await userService.remove(id);

    res.status(204).end();
  },

};

module.exports = userController;