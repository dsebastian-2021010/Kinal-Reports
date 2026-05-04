const service = require('./users.service.js');

const createUser = async (request, reply) => {
  try {
    const user = await service.createUser(request.body);
    reply.code(201).send({ message: 'User created', data: user });
  } catch (error) {
    reply.code(error.statusCode || 500).send({ message: error.message });
  }
};

const getUsers = async (request, reply) => {
  try {
    const users = await service.getUsers();
    reply.send({ total: users.length, data: users });
  } catch (error) {
    reply.code(error.statusCode || 500).send({ message: error.message });
  }
};

const getUser = async (request, reply) => {
  try {
    const user = await service.getUser(request.params.id);
    reply.send({ data: user });
  } catch (error) {
    reply.code(error.statusCode || 500).send({ message: error.message });
  }
};

const updateUser = async (request, reply) => {
  try {
    const user = await service.updateUser(request.params.id, request.body);
    reply.send({ message: 'User updated', data: user });
  } catch (error) {
    reply.code(error.statusCode || 500).send({ message: error.message });
  }
};

const deleteUser = async (request, reply) => {
  try {
    const user = await service.softDeleteUser(request.params.id);
    reply.send({ message: 'User deleted', data: user });
  } catch (error) {
    reply.code(error.statusCode || 500).send({ message: error.message });
  }
};

module.exports = { createUser, getUsers, getUser, updateUser, deleteUser };
