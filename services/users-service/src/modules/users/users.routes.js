const controller = require('./users.controller');
const schemas = require('./users.schema');
const roleMiddleware = require('../../middlewares/role.middleware');

async function routes(fastify, options) {

  fastify.post(
    '/',
    {
      preHandler: roleMiddleware(['ADMINISTRADOR']),
      schema: schemas.createUserSchema
    },
    controller.createUser
  );

  fastify.get('/', controller.getUsers);

  fastify.get('/:id', controller.getUser);

  fastify.delete(
    '/:id',
    {
      preHandler: roleMiddleware(['ADMINISTRADOR'])
    },
    controller.deleteUser
  );

  fastify.put(
    '/:id',
    {
      schema: schemas.updateUserSchema
    },
    controller.updateUser
  );
}

module.exports = routes;