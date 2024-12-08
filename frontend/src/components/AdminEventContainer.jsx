import axios from "axios"
import EventCard from "./EventCard"
import { useContext } from "react"
import EventContext from "../context/EventContext"
import AuthContext from "../context/AuthContext"

function AdminEventContainer() {
  const { events, setEvents } = useContext(EventContext)
  const { user } = useContext(AuthContext)

  const handleDelete = (event) => async () => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/events/${event.id}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      const returnedEvent = response.data
      setEvents(events.filter(e => e.id !== returnedEvent.id))
    } catch (error) {
      console.log(error.response.data.error)
    }
  }

  return (
    <div className="bg-white p-5 rounded-lg">
      <h2 className="text-3xl font-bold mb-2">Events</h2>
      {events.map((event, _) => {
        return (
          <div key={event.name + event.date} className="flex items-center space-x-4">
            <EventCard
              name={event.name}
              date={new Date(event.date).toDateString()}
              desc={event.description}
            />
            <button
              onClick={handleDelete(event)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        )
      })}
    </div >
  )
}

export default AdminEventContainer
