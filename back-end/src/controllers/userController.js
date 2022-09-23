const userService = require('../services/userService');

const userController = {
  async getAll(_req, res) {
    const all = await userService.getAll();
    res.status(200).json(all);
  },

  // async query(req, res) {
  //   const { name, email } = req.query;

  //   const userExists = await userService.query(name, email);

  //   res.status(200).json();
  // }
};

module.exports = userController;