const repository = require('./events.repository');

const createEvent = async (data, userId) => {

  if (data.startTime >= data.endTime) {
    const error = new Error('Invalid time range');
    error.statusCode = 400;
    throw error;
  }

  return repository.create({
    ...data,
    createdBy: userId
  });
};

const getEvents = () => repository.getAll();

const getEvent = async (id) => {
  const event = await repository.getById(id);

  if (!event) {
    const error = new Error('Event not found');
    error.statusCode = 404;
    throw error;
  }

  return event;
};

const deleteEvent = async (id) => {
  const event = await repository.getById(id);

  if (!event) {
    const error = new Error('Event not found');
    error.statusCode = 404;
    throw error;
  }

  return repository.softDelete(id);
};

module.exports = {
  createEvent,
  getEvents,
  getEvent,
  deleteEvent
};