const createUserSchema = {
  schema: {
    tags: ['Usuarios'],
    summary: 'Crear usuario',
    description: 'Crea un nuevo usuario en el sistema (solo ADMINISTRADOR)',
    headers: {
      type: 'object',
      required: ['x-role', 'x-user-id'],
      properties: {
        'x-role': { type: 'string', enum: ['ADMINISTRADOR'] },
        'x-user-id': { type: 'string' }
      }
    },
    body: {
      type: 'object',
      required: ['authId', 'email', 'firstName', 'lastName', 'role'],
      properties: {
        authId: { type: 'string', description: 'ID del Auth Service' },
        email: { type: 'string', format: 'email', description: 'Correo institucional' },
        firstName: { type: 'string', minLength: 2 },
        lastName: { type: 'string', minLength: 2 },
        role: { type: 'string', enum: ['ALUMNO', 'PROFESOR', 'ADMINISTRADOR'] },
        academicInfo: {
          type: 'object',
          properties: {
            sectionCode: { type: 'string' },
            career: { type: 'string' },
            grade: { type: 'number' },
            shift: { type: 'string' }
          }
        },
        teacherInfo: {
          type: 'object',
          properties: {
            subjects: { type: 'array', items: { type: 'string' } },
            isCoordinator: { type: 'boolean' }
          }
        }
      }
    },
    response: {
      201: {
        description: 'Usuario creado exitosamente',
        type: 'object'
      }
    }
  }
};

const updateUserSchema = {
  schema: {
    tags: ['Usuarios'],
    summary: 'Actualizar usuario',
    description: 'Actualiza los datos de un usuario existente',
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string', description: 'ID del usuario' }
      }
    },
    body: {
      type: 'object',
      additionalProperties: true
    },
    response: {
      200: {
        description: 'Usuario actualizado exitosamente',
        type: 'object'
      }
    }
  }
};

const getUsersSchema = {
  schema: {
    tags: ['Usuarios'],
    summary: 'Obtener todos los usuarios',
    description: 'Devuelve la lista de usuarios registrados, con sus roles y datos identificativos básicos.',
    response: {
      200: {
        description: 'Lista de usuarios',
        type: 'object',
        properties: {
          total: { type: 'number', description: 'Número total de usuarios' },
          data: { type: 'array', items: { type: 'object' } }
        }
      }
    }
  }
};

const getUserSchema = {
  schema: {
    tags: ['Usuarios'],
    summary: 'Obtener usuario por ID',
    description: 'Retorna la información de un usuario específico a partir de su identificador.',
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string', description: 'Identificador único del usuario' }
      }
    }
  }
};

const deleteUserSchema = {
  schema: {
    tags: ['Usuarios'],
    summary: 'Eliminar usuario (soft delete)',
    description: 'Marca al usuario como eliminado sin borrarlo de la base de datos',
    headers: {
      type: 'object',
      required: ['x-role'],
      properties: {
        'x-role': { type: 'string', enum: ['ADMINISTRADOR'] }
      }
    },
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string' }
      }
    }
  }
};

module.exports = {
  createUserSchema,
  updateUserSchema,
  getUsersSchema,
  getUserSchema,
  deleteUserSchema
};
