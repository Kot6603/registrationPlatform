import Event from "../models/event.js";

// get all events
const getEvents = async (_, response) => {
  const events = await Event.find({});
  response.json(events);
};

export { getEvents };
