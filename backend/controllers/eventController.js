import Event from "../models/event.js";
import User from "../models/user.js";

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

// register a user for an event
const registerUser = async (request, response, next) => {
  const { id } = request.params;
  const { userId } = request.body;

  const event = await Event.findById(id);
  const user = await User.findById(userId);

  if (!event) {
    return response.status(404).json({ error: "event not found" });
  }
  if (!user) {
    return response.status(404).json({ error: "user not found" });
  }
  if (event.users.includes(userId)) {
    return response
      .status(400)
      .json({ error: "User already added to the event" });
  }

  event.users.push(userId);

  try {
    const savedEvent = await event.save();
    response.json(savedEvent);
  } catch (error) {
    next(error);
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
    users: [],
  });

  try {
    const savedEvent = await event.save();
    response.json(savedEvent);
  } catch (error) {
    next(error);
  }
};

export { getEvents, getEvent, registerUser, createEvent };
