const createChatSchema = {
  schema: {
    tags: ['Chat'],
    summary: 'Crear conversación',
    description: 'Inicia una nueva conversación entre participantes. El chat se crea con al menos dos usuarios y se registra al creador en el contexto de la conversación.',
    headers: {
      type: 'object',
      required: ['x-role', 'x-user-id'],
      properties: {
        'x-role': { type: 'string', enum: ['ALUMNO', 'PROFESOR', 'ADMINISTRADOR'], description: 'Rol del usuario que inicia la conversación' },
        'x-user-id': { type: 'string', description: 'Identificador del usuario autenticado' }
      }
    },
    body: {
      type: 'object',
      required: ['participants'],
      properties: {
        participants: {
          type: 'array',
          items: { type: 'string' },
          description: 'Lista de IDs de participantes que formarán parte de la conversación (mínimo 2)'
        }
      }
    }
  }
};

const sendMessageSchema = {
  schema: {
    tags: ['Chat'],
    summary: 'Enviar mensaje',
    description: 'Agrega un mensaje a una conversación existente y notifica al resto de participantes.',
    headers: {
      type: 'object',
      required: ['x-role', 'x-user-id'],
      properties: {
        'x-role': { type: 'string', description: 'Rol del usuario que envía el mensaje' },
        'x-user-id': { type: 'string', description: 'Identificador del usuario que envía el mensaje' }
      }
    },
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string', description: 'Identificador de la conversación donde se publica el mensaje' }
      }
    },
    body: {
      type: 'object',
      required: ['content'],
      properties: {
        content: { type: 'string', description: 'Texto del mensaje que se desea enviar' }
      }
    }
  }
};

const getMyChatsSchema = {
  schema: {
    tags: ['Chat'],
    summary: 'Mis conversaciones',
    description: 'Recupera todas las conversaciones en las que participa el usuario autenticado, incluyendo información de última actividad y participantes.',
    headers: {
      type: 'object',
      required: ['x-role', 'x-user-id'],
      properties: {
        'x-role': { type: 'string', description: 'Rol del usuario autenticado' },
        'x-user-id': { type: 'string', description: 'Identificador del usuario autenticado' }
      }
    }
  }
};

module.exports = { createChatSchema, sendMessageSchema, getMyChatsSchema };
