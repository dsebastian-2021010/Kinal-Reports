const createChatSchema = {
  body: {
    type: 'object',
    required: ['participants'],
    properties: {
      participants: {
        type: 'array',
        items: { type: 'string' }
      }
    }
  }
};

const sendMessageSchema = {
  body: {
    type: 'object',
    required: ['content'],
    properties: {
      content: { type: 'string' }
    }
  }
};

module.exports = {
  createChatSchema,
  sendMessageSchema
};