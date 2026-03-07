const createNotificationSchema = {
  body: {
    type: 'object',
    required: ['userId', 'title', 'message', 'type'],
    properties: {
      userId: { type: 'string' },
      title: { type: 'string' },
      message: { type: 'string' },
      type: {
        type: 'string',
        enum: ['EVENT', 'DOCUMENT', 'SYSTEM']
      }
    }
  }
};

module.exports = {
  createNotificationSchema
};