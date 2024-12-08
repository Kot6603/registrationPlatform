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

// create a new event
const createEvent = async (request, response, next) => {
  const { name, description, date } = request.body;

  if (name === undefined) {
    return response.status(400).json({ error: "title missing" });
  }
  if (description === undefined) {
    return response.status(400).json({ error: "description missing" });
  }
  if (date === undefined) {
    return response.status(400).json({ error: "date missing" });
  }

  const event = new Event({
    name,
    description,
    date,
  });

  try {
    const savedEvent = await event.save();
    response.json(savedEvent);
  } catch (error) {
    next(error);
  }
};

export { getEvents, getEvent, createEvent };
