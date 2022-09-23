const { User } = require('../database/models');
// const { ValidationError, NotFoundError } = require('../middlewares/errors');

const userService = {

  async getAll() {
    const users = await User.findAll();
    return users;
  },

  async findOne(name, email) {
    const userName = await User.findOne({ where: { name } });

    const userEmail = await User.findOne({ where: { email } });

    if (userName) {
      return { code: 409, message: 'This username already exists' };
    }

    if (userEmail) {
      return { code: 409, message: 'This email already exists' };
    }
  },
};

module.exports = userService;