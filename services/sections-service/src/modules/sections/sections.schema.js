const createSectionSchema = {
  schema: {
    tags: ['Secciones'],
    summary: 'Crear sección',
    description: 'Crea una nueva sección técnica (solo ADMINISTRADOR)',
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
      required: ['code', 'career', 'grade', 'shift'],
      properties: {
        code: { type: 'string', description: 'Código de sección (ej: IN6AM)' },
        career: { type: 'string', description: 'Carrera técnica (ej: Informática, Electrónica)' },
        grade: { type: 'number', description: 'Grado (1 al 6)' },
        shift: { type: 'string', enum: ['AM', 'PM'], description: 'Jornada matutina o vespertina' },
        combinedWith: {
          type: 'array',
          items: { type: 'string' },
          description: 'Códigos de secciones combinadas'
        }
      }
    }
  }
};

const getSectionsSchema = {
  schema: {
    tags: ['Secciones'],
    summary: 'Listar secciones',
    description: 'Retorna todas las secciones técnicas registradas con información de carrera, grado y jornada.',
    response: {
      200: {
        description: 'Listado de secciones',
        type: 'object',
        properties: {
          total: { type: 'number', description: 'Número total de secciones' },
          data: { type: 'array', items: { type: 'object' } }
        }
      }
    }
  }
};

const getSectionSchema = {
  schema: {
    tags: ['Secciones'],
    summary: 'Obtener sección por ID',
    description: 'Retorna los datos completos de una sección técnica específica.',
    params: {
      type: 'object',
      required: ['id'],
      properties: { id: { type: 'string', description: 'Identificador único de la sección' } }
    }
  }
};

const deleteSectionSchema = {
  schema: {
    tags: ['Secciones'],
    summary: 'Eliminar sección',
    description: 'Elimina una sección registrada usando su identificador, solo disponible para administradores.',
    headers: {
      type: 'object',
      required: ['x-role'],
      properties: { 'x-role': { type: 'string', enum: ['ADMINISTRADOR'], description: 'Rol del usuario autenticado' } }
    },
    params: {
      type: 'object',
      required: ['id'],
      properties: { id: { type: 'string', description: 'Identificador único de la sección a eliminar' } }
    }
  }
};

module.exports = { createSectionSchema, getSectionsSchema, getSectionSchema, deleteSectionSchema };
