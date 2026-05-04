const controller = require('./users.controller');
const schemas = require('./users.schema');
const roleMiddleware = require('../../middlewares/role.middleware');

async function routes(fastify, options) {

  fastify.post('/', {
    preHandler: roleMiddleware(['ADMINISTRADOR']),
    ...schemas.createUserSchema
  }, controller.createUser);

  fastify.get('/', {
    ...schemas.getUsersSchema
  }, controller.getUsers);

  fastify.get('/:id', {
    ...schemas.getUserSchema
  }, controller.getUser);

  fastify.put('/:id', {
    ...schemas.updateUserSchema
  }, controller.updateUser);

  fastify.delete('/:id', {
    preHandler: roleMiddleware(['ADMINISTRADOR']),
    ...schemas.deleteUserSchema
  }, controller.deleteUser);
}

module.exports = routes;
