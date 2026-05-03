const createReportSchema = {
  schema: {
    tags: ['Reportes'],
    summary: 'Generar reporte',
    description: 'Genera y almacena un nuevo reporte del sistema (solo ADMINISTRADOR)',
    headers: {
      type: 'object',
      required: ['x-role', 'x-user-id'],
      properties: {
        'x-role': { type: 'string', enum: ['ADMINISTRADOR'] },
        'x-user-id': { type: 'string', description: 'ID del administrador que genera el reporte' }
      }
    },
    body: {
      type: 'object',
      required: ['title', 'type', 'data'],
      properties: {
        title: { type: 'string', description: 'Título descriptivo del reporte' },
        type: {
          type: 'string',
          enum: ['DOCUMENTS', 'EVENTS', 'TEACHERS', 'SYSTEM'],
          description: 'Categoría del reporte'
        },
        data: {
          type: 'object',
          description: 'Datos o métricas que componen el reporte',
          additionalProperties: true
        }
      }
    },
    response: {
      201: {
        description: 'Reporte generado exitosamente',
        type: 'object',
        properties: {
          message: { type: 'string' },
          data: { type: 'object' }
        }
      }
    }
  }
};

const getReportsSchema = {
  schema: {
    tags: ['Reportes'],
    summary: 'Listar todos los reportes',
    description: 'Retorna todos los reportes generados (excluye eliminados)',
    headers: {
      type: 'object',
      required: ['x-role', 'x-user-id'],
      properties: {
        'x-role': { type: 'string', enum: ['ADMINISTRADOR'] },
        'x-user-id': { type: 'string' }
      }
    },
    response: {
      200: {
        description: 'Lista de reportes',
        type: 'object',
        properties: {
          total: { type: 'number' },
          data: { type: 'array', items: { type: 'object' } }
        }
      }
    }
  }
};

const getReportSchema = {
  schema: {
    tags: ['Reportes'],
    summary: 'Obtener reporte por ID',
    description: 'Retorna el detalle completo de un reporte específico',
    headers: {
      type: 'object',
      required: ['x-role', 'x-user-id'],
      properties: {
        'x-role': { type: 'string', enum: ['ADMINISTRADOR'] },
        'x-user-id': { type: 'string' }
      }
    },
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string', description: 'ID del reporte (MongoDB ObjectId)' }
      }
    },
    response: {
      200: {
        description: 'Reporte encontrado',
        type: 'object',
        properties: {
          data: { type: 'object' }
        }
      },
      404: {
        description: 'Reporte no encontrado',
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      }
    }
  }
};

const deleteReportSchema = {
  schema: {
    tags: ['Reportes'],
    summary: 'Eliminar reporte (soft delete)',
    description: 'Marca el reporte como eliminado sin borrarlo de la base de datos',
    headers: {
      type: 'object',
      required: ['x-role', 'x-user-id'],
      properties: {
        'x-role': { type: 'string', enum: ['ADMINISTRADOR'] },
        'x-user-id': { type: 'string' }
      }
    },
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string', description: 'ID del reporte a eliminar' }
      }
    },
    response: {
      200: {
        description: 'Reporte eliminado exitosamente',
        type: 'object',
        properties: {
          message: { type: 'string' },
          data: { type: 'object' }
        }
      },
      404: {
        description: 'Reporte no encontrado',
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      }
    }
  }
};

module.exports = {
  createReportSchema,
  getReportsSchema,
  getReportSchema,
  deleteReportSchema
};
