const repository = require('./documents.repository');

const createDocument = async (data) => {

  const document = await repository.create({
    ...data,
    history: [
      {
        action: 'CREATED',
        performedBy: data.studentId
      }
    ]
  });

  return document;
};

const approveDocument = async (id, coordinatorId) => {

  const document = await repository.getById(id);

  if (!document) {
    const error = new Error('Document not found');
    error.statusCode = 404;
    throw error;
  }

  document.status = 'APPROVED';
  document.coordinatorId = coordinatorId;

  document.history.push({
    action: 'APPROVED',
    performedBy: coordinatorId
  });

  await document.save();

  return document;
};

module.exports = {
  createDocument,
  approveDocument
};