const service = require('./users.service.js');

const createUser = async (request, reply) => {
  const user = await service.createUser(request.body);
  reply.code(201).send(user);
};

const getUser = async (request, reply) => {
  const user = await service.getUser(request.params.id);
  reply.send(user);
};

const getUsers = async (request, reply) => {
  const users = await service.getUsers();
  reply.send(users);
};

const updateUser = async (request, reply) => {
  const user = await service.updateUser(
    request.params.id,
    request.body
  );
  reply.send(user);
};

const deleteUser = async (request, reply) => {
  const user = await service.softDeleteUser(request.params.id);
  reply.send({
    message: 'User soft deleted',
    user
  });
};

module.exports = {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser
};