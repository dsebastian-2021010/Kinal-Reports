const createScheduleSchema = {
  schema: {
    tags: ['Horarios'],
    summary: 'Crear entrada de horario',
    description: 'Crea un bloque de horario para una sección (solo ADMINISTRADOR)',
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
      required: ['sectionCode', 'subject', 'teacherId', 'classroom', 'day', 'startTime', 'endTime'],
      properties: {
        sectionCode: { type: 'string', description: 'Código de sección (ej: IN6AM)' },
        subject: { type: 'string', description: 'Materia o asignatura' },
        teacherId: { type: 'string', description: 'ID del profesor asignado' },
        classroom: { type: 'string', description: 'Salón o laboratorio' },
        day: {
          type: 'string',
          enum: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'],
          description: 'Día de la semana'
        },
        startTime: { type: 'string', description: 'Hora de inicio (HH:MM)' },
        endTime: { type: 'string', description: 'Hora de fin (HH:MM)' }
      }
    }
  }
};

const getSchedulesSchema = {
  schema: {
    tags: ['Horarios'],
    summary: 'Listar horarios',
    description: 'Devuelve todos los bloques de horario registrados, con sección, materia, profesor, día y aula asignados.',
    response: {
      200: {
        description: 'Listado de horarios',
        type: 'object',
        properties: {
          total: { type: 'number', description: 'Número total de bloques de horario' },
          data: { type: 'array', items: { type: 'object' } }
        }
      }
    }
  }
};

const getScheduleSchema = {
  schema: {
    tags: ['Horarios'],
    summary: 'Obtener horario por ID',
    description: 'Consulta un bloque de horario específico usando su identificador único.',
    params: {
      type: 'object',
      required: ['id'],
      properties: { id: { type: 'string', description: 'Identificador único del horario' } }
    }
  }
};

const deleteScheduleSchema = {
  schema: {
    tags: ['Horarios'],
    summary: 'Eliminar bloque de horario',
    description: 'Elimina un bloque de horario registrado por su identificador. Requiere permisos de administrador.',
    headers: {
      type: 'object',
      required: ['x-role'],
      properties: { 'x-role': { type: 'string', enum: ['ADMINISTRADOR'], description: 'Rol del usuario autenticado' } }
    },
    params: {
      type: 'object',
      required: ['id'],
      properties: { id: { type: 'string', description: 'Identificador único del horario a eliminar' } }
    }
  }
};

module.exports = { createScheduleSchema, getSchedulesSchema, getScheduleSchema, deleteScheduleSchema };
