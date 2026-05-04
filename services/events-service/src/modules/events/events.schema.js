const createEventSchema = {
  schema: {
    tags: ['Eventos'],
    summary: 'Crear evento',
    description: 'Crea un nuevo evento académico o institucional (solo ADMINISTRADOR)',
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
      required: ['title', 'date', 'startTime', 'endTime', 'location', 'sections'],
      properties: {
        title: { type: 'string', description: 'Título del evento' },
        description: { type: 'string' },
        date: { type: 'string', description: 'Fecha del evento (YYYY-MM-DD)' },
        startTime: { type: 'string', description: 'Hora de inicio (HH:MM)' },
        endTime: { type: 'string', description: 'Hora de finalización (HH:MM)' },
        location: { type: 'string', description: 'Lugar del evento' },
        sections: {
          type: 'array',
          items: { type: 'string' },
          description: 'Códigos de secciones invitadas'
        }
      }
    }
  }
};

const getEventsSchema = {
  schema: {
    tags: ['Eventos'],
    summary: 'Listar eventos',
    description: 'Devuelve todos los eventos activos del sistema, incluyendo fecha, hora, ubicación y secciones invitadas.',
    response: {
      200: {
        description: 'Listado de eventos',
        type: 'object',
        properties: {
          total: { type: 'number', description: 'Número total de eventos' },
          data: { type: 'array', items: { type: 'object' } }
        }
      }
    }
  }
};

const getEventSchema = {
  schema: {
    tags: ['Eventos'],
    summary: 'Obtener evento por ID',
    description: 'Retorna los datos completos de un evento específico a partir de su identificador.',
    params: {
      type: 'object',
      required: ['id'],
      properties: { id: { type: 'string', description: 'Identificador único del evento' } }
    }
  }
};

const deleteEventSchema = {
  schema: {
    tags: ['Eventos'],
    summary: 'Eliminar evento',
    description: 'Elimina un evento existente por su identificador. Solo administradores pueden ejecutar esta acción.',
    headers: {
      type: 'object',
      required: ['x-role'],
      properties: { 'x-role': { type: 'string', enum: ['ADMINISTRADOR'], description: 'Rol del usuario autenticado' } }
    },
    params: {
      type: 'object',
      required: ['id'],
      properties: { id: { type: 'string', description: 'Identificador único del evento a eliminar' } }
    }
  }
};

module.exports = { createEventSchema, getEventsSchema, getEventSchema, deleteEventSchema };
