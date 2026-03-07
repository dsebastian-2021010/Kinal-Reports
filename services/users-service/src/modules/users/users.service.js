const repository = require('./users.repository');

const createUser = async (data) => {

  const existing = await repository.getByAuthId(data.authId);

  if (existing) {
    const error = new Error('User with this authId already exists');
    error.statusCode = 400;
    throw error;
  }

  return repository.createUser(data);
};

const getUser = async (id) => {
  const user = await repository.getUserById(id);

  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  return user;
};

const softDeleteUser = async (id) => {

  const user = await repository.getUserById(id);

  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  return repository.softDeleteUser(id);
};

const getUsers = async () => repository.getAllUsers();

const updateUser = async (id, data) => {
  return repository.updateUser(id, data);
};

module.exports = {
  createUser,
  getUser,
  getUsers,
  updateUser,
  softDeleteUser
};