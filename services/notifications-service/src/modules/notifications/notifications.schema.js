const createNotificationSchema = {
  schema: {
    tags: ['Notificaciones'],
    summary: 'Crear notificación',
    description: 'Envía una notificación a un usuario (solo ADMINISTRADOR)',
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
      required: ['userId', 'title', 'message', 'type'],
      properties: {
        userId: { type: 'string', description: 'ID del usuario destinatario' },
        title: { type: 'string' },
        message: { type: 'string' },
        type: {
          type: 'string',
          enum: ['EVENT', 'DOCUMENT', 'SYSTEM'],
          description: 'Tipo de notificación'
        }
      }
    }
  }
};

const getMyNotificationsSchema = {
  schema: {
    tags: ['Notificaciones'],
    summary: 'Mis notificaciones',
    description: 'Devuelve las notificaciones recibidas por el usuario autenticado, ordenadas por fecha de creación.',
    headers: {
      type: 'object',
      required: ['x-role', 'x-user-id'],
      properties: {
        'x-role': { type: 'string', description: 'Rol del usuario autenticado' },
        'x-user-id': { type: 'string', description: 'ID del usuario autenticado' }
      }
    }
  }
};

const markAsReadSchema = {
  schema: {
    tags: ['Notificaciones'],
    summary: 'Marcar notificación como leída',
    description: 'Actualiza el estado de una notificación como leída para el usuario autenticado.',
    headers: {
      type: 'object',
      required: ['x-role', 'x-user-id'],
      properties: {
        'x-role': { type: 'string', description: 'Rol del usuario autenticado' },
        'x-user-id': { type: 'string', description: 'ID del usuario autenticado' }
      }
    },
    params: {
      type: 'object',
      required: ['id'],
      properties: { id: { type: 'string', description: 'Identificador de la notificación' } }
    }
  }
};

module.exports = { createNotificationSchema, getMyNotificationsSchema, markAsReadSchema };
