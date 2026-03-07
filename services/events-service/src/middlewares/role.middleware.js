module.exports = (allowedRoles) => {
  return async (request, reply) => {
    const userRole = request.headers['x-role'];

    if (!userRole) {
      return reply.code(401).send({
        message: 'Role header missing'
      });
    }

    if (!allowedRoles.includes(userRole)) {
      return reply.code(403).send({
        message: 'Forbidden: insufficient role'
      });
    }
  };
};