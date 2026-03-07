const createDocumentSchema = {
  body: {
    type: 'object',
    required: [
      'studentId',
      'studentName',
      'sectionCode',
      'type'
    ],
    properties: {
      studentId: { type: 'string' },
      studentName: { type: 'string' },
      sectionCode: { type: 'string' },
      type: {
        type: 'string',
        enum: [
          'PRACTICAS_SUPERVISADAS',
          'PERMISO_FALTA',
          'JUSTIFICACION',
          'CARTA_GENERAL'
        ]
      },
      description: { type: 'string' }
    }
  }
};

module.exports = {
  createDocumentSchema
};