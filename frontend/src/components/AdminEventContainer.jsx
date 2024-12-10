import axios from "axios"
import EventCard from "./EventCard"
import { useContext, useState } from "react"
import EventContext from "../context/EventContext"
import AuthContext from "../context/AuthContext"

function AdminEventContainer() {
  const { events, setEvents } = useContext(EventContext)
  const { user } = useContext(AuthContext)
  const [filter, setFilter] = useState("")

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

  const eventsToShow = events.filter((event) => event.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div className="bg-white p-5 rounded-lg">
      <h2 className="text-3xl font-bold mb-2">Events</h2>
      <div className="text-lg pb-2 font-bold">
        Filter: <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search events"
          className="border-2 border-gray-300 rounded-md p-2 text-md font-normal"
        />
      </div>
      {eventsToShow.map((event, _) => {
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
