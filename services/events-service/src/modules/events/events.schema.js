const createEventSchema = {
  body: {
    type: 'object',
    required: [
      'title',
      'date',
      'startTime',
      'endTime',
      'location',
      'sections'
    ],
    properties: {
      title: { type: 'string' },
      description: { type: 'string' },
      date: { type: 'string' },
      startTime: { type: 'string' },
      endTime: { type: 'string' },
      location: { type: 'string' },
      sections: {
        type: 'array',
        items: { type: 'string' }
      }
    }
  }
};

module.exports = {
  createEventSchema
};