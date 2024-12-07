import { useState } from "react";

import EventContext from "./EventContext";

function EventContextProvider({ children }) {
  const [events, setEvents] = useState([]);

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
