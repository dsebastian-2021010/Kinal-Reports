const createDocumentSchema = {
  schema: {
    tags: ['Documentos'],
    summary: 'Solicitar un documento',
    description: 'Permite a un alumno solicitar un documento académico',
    headers: {
      type: 'object',
      required: ['x-role', 'x-user-id'],
      properties: {
        'x-role': { type: 'string', enum: ['ALUMNO', 'PROFESOR', 'ADMINISTRADOR'] },
        'x-user-id': { type: 'string' }
      }
    },
    body: {
      type: 'object',
      required: ['studentId', 'studentName', 'sectionCode', 'type'],
      properties: {
        studentId: { type: 'string' },
        studentName: { type: 'string' },
        sectionCode: { type: 'string', description: 'Ej: IN6AM' },
        type: {
          type: 'string',
          enum: ['PRACTICAS_SUPERVISADAS', 'PERMISO_FALTA', 'JUSTIFICACION', 'CARTA_GENERAL']
        },
        description: { type: 'string' }
      }
    },
    response: {
      201: { description: 'Documento solicitado', type: 'object', properties: { message: { type: 'string' }, data: { type: 'object' } } }
    }
  }
};

const getDocumentsSchema = {
  schema: {
    tags: ['Documentos'],
    summary: 'Listar documentos',
    description: 'Retorna documentos con filtros opcionales por estudiante, sección, estado o tipo',
    headers: {
      type: 'object',
      required: ['x-role', 'x-user-id'],
      properties: {
        'x-role': { type: 'string', enum: ['ALUMNO', 'PROFESOR', 'ADMINISTRADOR'] },
        'x-user-id': { type: 'string' }
      }
    },
    querystring: {
      type: 'object',
      properties: {
        studentId: { type: 'string', description: 'Filtrar por ID de estudiante' },
        sectionCode: { type: 'string', description: 'Filtrar por código de sección' },
        status: { type: 'string', enum: ['PENDING', 'APPROVED', 'REJECTED', 'READY_TO_PRINT'] },
        type: { type: 'string', enum: ['PRACTICAS_SUPERVISADAS', 'PERMISO_FALTA', 'JUSTIFICACION', 'CARTA_GENERAL'] }
      }
    },
    response: {
      200: {
        description: 'Lista de documentos',
        type: 'object',
        properties: { total: { type: 'number' }, data: { type: 'array', items: { type: 'object' } } }
      }
    }
  }
};

const getDocumentSchema = {
  schema: {
    tags: ['Documentos'],
    summary: 'Obtener documento por ID',
    description: 'Recupera la solicitud de documento completo, incluyendo su estado actual y los datos del solicitante.',
    headers: {
      type: 'object',
      required: ['x-role', 'x-user-id'],
      properties: {
        'x-role': { type: 'string' },
        'x-user-id': { type: 'string' }
      }
    },
    params: {
      type: 'object',
      required: ['id'],
      properties: { id: { type: 'string', description: 'Identificador del documento solicitado' } }
    },
    response: {
      200: { description: 'Documento encontrado', type: 'object', properties: { data: { type: 'object' } } },
      404: { description: 'No encontrado', type: 'object', properties: { message: { type: 'string' } } }
    }
  }
};

const approveDocumentSchema = {
  schema: {
    tags: ['Documentos'],
    summary: 'Aprobar o rechazar un documento',
    description: 'Actualiza el estado de una solicitud de documento, estableciendo si se aprueba o rechaza e incluyendo observaciones de revisión.',
    headers: {
      type: 'object',
      required: ['x-role', 'x-user-id'],
      properties: {
        'x-role': { type: 'string', enum: ['ADMINISTRADOR', 'PROFESOR'] },
        'x-user-id': { type: 'string' }
      }
    },
    params: {
      type: 'object',
      required: ['id'],
      properties: { id: { type: 'string', description: 'Identificador del documento a revisar' } }
    },
    body: {
      type: 'object',
      properties: {
        status: { type: 'string', enum: ['APPROVED', 'REJECTED'], description: 'Estado nuevo del documento' },
        notes: { type: 'string', description: 'Comentarios o motivo de la decisión' }
      }
    },
    response: {
      200: { description: 'Documento actualizado', type: 'object', properties: { message: { type: 'string' }, data: { type: 'object' } } },
      404: { description: 'No encontrado', type: 'object', properties: { message: { type: 'string' } } }
    }
  }
};

module.exports = { createDocumentSchema, getDocumentsSchema, getDocumentSchema, approveDocumentSchema };
