import axios from "axios";
import { useState, useEffect } from "react";

import EventContext from "./EventContext";

function EventContextProvider({ children }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      const response = await axios.get("http://localhost:3001/api/events");
      response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
      setEvents(response.data);
    }
    fetchEvents();
  }, [])

  return (
    <EventContext.Provider
      value={{
        events,
        setEvents
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export default EventContextProvider;
