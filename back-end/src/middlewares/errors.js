const NotFoundError = (message) => {
  const err = new Error(message);
  err.name = 'NotFoundError';
  throw err;
};

const UnauthorizedError = (message = 'Não autorizado') => {
  const err = new Error(message);
  err.name = 'UnauthorizedError';
  throw err;
};

const ValidationError = (message) => {
  const err = new Error(message);
  err.name = 'ValidationError';
  throw err;
};

const SequelizeUniqueConstraintError = (message) => {
  const err = new Error(message);
  err.name = 'SequelizeUniqueConstraintError';
  throw err;
};

module.exports = {
  NotFoundError,
  UnauthorizedError,
  ValidationError,
  SequelizeUniqueConstraintError,
};