import axios from "axios"
import { useContext, useState } from "react"
import toast from "react-hot-toast"

import AuthContext from "../context/AuthContext"
import CompetitionContext from "../context/CompetitionContext"
import EventContext from "../context/EventContext"
import EventCard from "./EventCard"
import GradeModal from "./GradeModal"

function AdminEventContainer() {
  const { events, setEvents } = useContext(EventContext)
  const { user } = useContext(AuthContext)
  const { competitions } = useContext(CompetitionContext)
  const [filter, setFilter] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [marks, setMarks] = useState([])

  const handleDelete = (event) => async () => {
    try {
      const response = await axios.delete(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/events/${event.id}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      const returnedEvent = response.data
      setEvents(events.filter(e => e.id !== returnedEvent.id))
    } catch (error) {
      toast.error(error.response.data.error)
    }
  }

  const handleMark = (event) => async () => {
    if (!event.competitionId) {
      toast.error("No competition selected")
      return
    }
    try {
      const response = await axios.get(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/competitions/${event.competitionId}/mark`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      const marks = response.data
      setIsModalOpen(true)
      setMarks(marks)
    } catch (error) {
      toast.error(error)
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
      toast.error(error.response.data.error)
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
      {eventsToShow.map((event) => {
        return (
          <div key={event.name + event.date} className="flex items-center space-x-4">
            <EventCard
              event={event}
              callback={handleCompetition(event)}
              options={competitions}
            />
            <button
              onClick={handleMark(event)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed"
              disabled={!event.competitionId}
            >
              Mark
            </button>
            <button
              onClick={handleDelete(event)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        )
      })}
      <GradeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        marks={marks}
      />
    </div >
  )
}

export default AdminEventContainer
