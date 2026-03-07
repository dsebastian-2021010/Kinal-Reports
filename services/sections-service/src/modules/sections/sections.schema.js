const createSectionSchema = {
  body: {
    type: 'object',
    required: ['code', 'career', 'grade', 'shift'],
    properties: {
      code: { type: 'string' },
      career: { type: 'string' },
      grade: { type: 'number' },
      shift: {
        type: 'string',
        enum: ['AM', 'PM']
      },
      combinedWith: {
        type: 'array',
        items: { type: 'string' }
      }
    }
  }
};

module.exports = {
  createSectionSchema
};