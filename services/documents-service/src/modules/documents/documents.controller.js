const service = require('./documents.service');

const createDocument = async (request, reply) => {
  
  const document = await service.createDocument(request.body);

  reply.code(201).send({
    message: 'Document request created',
    data: document
  });
};

const approveDocument = async (request, reply) => {
  const document = await service.approveDocument(
    request.params.id,
    request.headers['x-user-id']
  );

  reply.send({
    message: 'Document approved',
    data: document
  });
};

module.exports = {
  createDocument,
  approveDocument
};