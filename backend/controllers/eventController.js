import Event from "../models/event.js";

// get all events
const getEvents = async (_, response) => {
  const events = await Event.find({});
  response.json(events);
};

// get one event
const getEvent = async (request, response) => {
  const { id } = request.params;
  const event = await Event.findById(id);

  if (event) {
    response.json(event);
  } else {
    response.status(404).end();
  }
};

export { getEvents, getEvent };
