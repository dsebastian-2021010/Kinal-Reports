const updateStatusSchema = {
  body: {
    type: 'object',
    required: ['status'],
    properties: {
      status: {
        type: 'string',
        enum: [
          'IN_CLASS',
          'AVAILABLE',
          'LUNCH',
          'EVENT',
          'ABSENT'
        ]
      },
      currentClassroom: { type: 'string' },
      currentSectionCode: { type: 'string' },
      notes: { type: 'string' }
    }
  }
};

module.exports = {
  updateStatusSchema
};