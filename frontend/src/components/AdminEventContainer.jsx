import axios from "axios"
import { useContext, useEffect, useState } from "react"

import AuthContext from "../context/AuthContext"
import EventContext from "../context/EventContext"
import EventCard from "./EventCard"

function AdminEventContainer() {
  const { events, setEvents } = useContext(EventContext)
  const { user } = useContext(AuthContext)
  const [filter, setFilter] = useState("")
  const [options, setOptions] = useState([])

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/competitions`)
        setOptions(response.data)
      } catch (error) {
        console.log(error.response.data.error)
      }
    }
    fetchOptions()
  }, [])

  const handleDelete = (event) => async () => {
    try {
      const response = await axios.delete(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/events/${event.id}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      const returnedEvent = response.data
      setEvents(events.filter(e => e.id !== returnedEvent.id))
    } catch (error) {
      console.log(error.response.data.error)
    }
  }

  const handleCompetition = (event) => async (competitionId) => {
    try {
      const response = await axios.patch(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/events/${event.id}/competitions`,
        { competitionId },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      const returnedEvent = response.data
      setEvents(events.map(e => e.id === returnedEvent.id ? returnedEvent : e))
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
              event={event}
              callback={handleCompetition(event)}
              options={options}
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
