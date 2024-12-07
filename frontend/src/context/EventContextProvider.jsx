import { useState, useEffect } from "react";

import EventContext from "./EventContext";
import axios from "axios";

function EventContextProvider({ children }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      const response = await axios.get("http://localhost:3001/api/events");
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
