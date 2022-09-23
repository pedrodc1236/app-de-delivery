const { User } = require('../database/models');
// const { ValidationError, NotFoundError } = require('../middlewares/errors');

const userService = {

  async getAll() {
    const users = await User.findAll();
    return users;
  },
};

module.exports = userService;