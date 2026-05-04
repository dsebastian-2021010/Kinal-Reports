const updateStatusSchema = {
  schema: {
    tags: ['Estado Docente'],
    summary: 'Actualizar estado del profesor',
    description: 'Permite al profesor actualizar su estado actual en tiempo real para que otros servicios y usuarios puedan conocer su disponibilidad.',
    headers: {
      type: 'object',
      required: ['x-role', 'x-user-id'],
      properties: {
        'x-role': { type: 'string', enum: ['PROFESOR'], description: 'Rol del usuario autenticado' },
        'x-user-id': { type: 'string', description: 'Identificador del profesor' }
      }
    },
    body: {
      type: 'object',
      required: ['status'],
      properties: {
        status: {
          type: 'string',
          enum: ['IN_CLASS', 'AVAILABLE', 'LUNCH', 'EVENT', 'ABSENT'],
          description: 'Estado actual del profesor que será visible en el sistema'
        },
        currentClassroom: { type: 'string', description: 'Salón o laboratorio donde se encuentra actualmente' },
        currentSectionCode: { type: 'string', description: 'Código de la sección que está impartiendo o atendiendo' },
        notes: { type: 'string', description: 'Información adicional sobre el estado del profesor' }
      }
    }
  }
};

const getStatusSchema = {
  schema: {
    tags: ['Estado Docente'],
    summary: 'Ver estado de un profesor',
    description: 'Retorna el estado actual de un profesor específico',
    params: {
      type: 'object',
      required: ['teacherId'],
      properties: {
        teacherId: { type: 'string', description: 'ID del profesor' }
      }
    }
  }
};

const getAllStatusSchema = {
  schema: {
    tags: ['Estado Docente'],
    summary: 'Ver estado de todos los profesores',
    description: 'Retorna el estado actual de todos los profesores del instituto'
  }
};

module.exports = { updateStatusSchema, getStatusSchema, getAllStatusSchema };
