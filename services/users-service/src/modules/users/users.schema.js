const createUserSchema = {
  body: {
    type: 'object',
    required: ['authId', 'email', 'firstName', 'lastName', 'role'],
    properties: {
      authId: { type: 'string' },
      email: { type: 'string', format: 'email' },
      firstName: { type: 'string', minLength: 2 },
      lastName: { type: 'string', minLength: 2 },
      role: {
        type: 'string',
        enum: ['ALUMNO', 'PROFESOR', 'ADMINISTRADOR']
      },
      academicInfo: { type: 'object' },
      teacherInfo: { type: 'object' }
    }
  }
};

const updateUserSchema = {
  body: {
    type: 'object',
    additionalProperties: true
  }
};

module.exports = {
  createUserSchema,
  updateUserSchema
};