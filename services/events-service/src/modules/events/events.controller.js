const service = require('./events.service');

const createEvent = async (request, reply) => {
  const userId = request.headers['x-user-id'];

  const event = await service.createEvent(
    request.body,
    userId
  );

  reply.code(201).send({
    message: 'Event created',
    data: event
  });
};

const getEvents = async (request, reply) => {
  const events = await service.getEvents();

  reply.send({
    total: events.length,
    data: events
  });
};

const getEvent = async (request, reply) => {
  const event = await service.getEvent(request.params.id);

  reply.send({ data: event });
};

const deleteEvent = async (request, reply) => {
  const event = await service.deleteEvent(request.params.id);

  reply.send({
    message: 'Event cancelled',
    data: event
  });
};

module.exports = {
  createEvent,
  getEvents,
  getEvent,
  deleteEvent
};