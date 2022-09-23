const registerService = require('../services/registerService');

const registerController = {
  async create(req, res) {
    const { body } = req;
    const { name, email } = body;
    const exists = await registerService.userExists(name, email);

    if (exists) {
      const { code, message } = exists;
      res.status(code).json({ message });
    }
    const data = await registerService.validateData(body);
    const newUser = await registerService.create(data);
    res.status(201).json(newUser);
  },
};

module.exports = registerController;