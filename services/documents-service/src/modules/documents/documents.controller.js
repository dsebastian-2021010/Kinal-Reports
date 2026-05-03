const service = require('./documents.service');

const createDocument = async (request, reply) => {
  try {
    const document = await service.createDocument(request.body);
    reply.code(201).send({ message: 'Document request created', data: document });
  } catch (error) {
    reply.code(error.statusCode || 500).send({ message: error.message });
  }
};

const getDocuments = async (request, reply) => {
  try {
    const filters = request.query;
    const documents = await service.getDocuments(filters);
    reply.send({ total: documents.length, data: documents });
  } catch (error) {
    reply.code(error.statusCode || 500).send({ message: error.message });
  }
};

const getDocument = async (request, reply) => {
  try {
    const document = await service.getDocument(request.params.id);
    reply.send({ data: document });
  } catch (error) {
    reply.code(error.statusCode || 500).send({ message: error.message });
  }
};

const approveDocument = async (request, reply) => {
  try {
    const document = await service.approveDocument(
      request.params.id,
      request.headers['x-user-id']
    );
    reply.send({ message: 'Document approved', data: document });
  } catch (error) {
    reply.code(error.statusCode || 500).send({ message: error.message });
  }
};

module.exports = { createDocument, getDocuments, getDocument, approveDocument };
