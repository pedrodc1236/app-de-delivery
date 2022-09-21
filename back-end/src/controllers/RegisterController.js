const registerService = require('../services/Register');

const registerController = {
  async create (req, res) {
    const { body } = req;
    const data = await registerService.validateData(body);
    await registerService.validateUserByEmail(body.email);
    const newUser = await registerService.create(data);
    res.status(201).json(newUser);
  }
}

module.exports = registerController;