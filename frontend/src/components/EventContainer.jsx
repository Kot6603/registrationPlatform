import axios from "axios"
import EventCard from "./EventCard"
import { useContext } from "react"
import AuthContext from "../context/AuthContext"
import EventContext from "../context/EventContext"

function EventContainer() {
  const { user } = useContext(AuthContext)
  const { events, setEvents } = useContext(EventContext)

  const handleJoin = (event) => async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/events/${event.id}/users`,
        { userId: user.id },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      console.log(response.data)
      console.log("Joined event")
      const updateEvent = await axios.get(`http://localhost:3001/api/events/${event.id}`);
      setEvents(events.map((e) => e.id === event.id ? updateEvent.data : e))
    } catch (error) {
      console.log(error.response.data.error)
    }
  }

  const getButton = (event) => {
    return event.users.includes(user.id) ? (
      <button
        className="w-32 cursor-not-allowed bg-gray-300 text-white py-4 px-8 rounded-md"
      >
        Joined
      </button>
    ) : (
      <button
        className="w-32 bg-blue-500 text-white py-4 px-8 rounded-md hover:bg-blue-600"
        onClick={handleJoin(event)}
      >
        Join
      </button>
    )
  }

  return (
    <div className="w-full bg-white p-5 rounded-lg">
      <h2 className="text-3xl font-bold mb-4">Events</h2>
      {events.map((event, _) => {
        return (
          <div
            key={event.name + event.date}
            className="flex items-center space-x-4"
          >
            <EventCard
              name={event.name}
              date={new Date(event.date).toDateString()}
              desc={event.description}
            />
            {user && getButton(event)}
          </div>
        )
      })}
    </div >
  )
}

export default EventContainer
