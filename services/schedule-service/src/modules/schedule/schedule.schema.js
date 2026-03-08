const createScheduleSchema = {
  body: {
    type: 'object',
    required: [
      'sectionCode',
      'subject',
      'teacherId',
      'classroom',
      'day',
      'startTime',
      'endTime'
    ],
    properties: {
      sectionCode: { type: 'string' },
      subject: { type: 'string' },
      teacherId: { type: 'string' },
      classroom: { type: 'string' },
      day: {
        type: 'string',
        enum: ['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY']
      },
      startTime: { type: 'string' },
      endTime: { type: 'string' }
    }
  }
};

module.exports = {
  createScheduleSchema
};