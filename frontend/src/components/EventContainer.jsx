import axios from "axios"
import { useState, useContext } from "react"
import { useNavigate } from "react-router"
import toast from "react-hot-toast"

import AuthContext from "../context/AuthContext"
import CompetitionContext from "../context/CompetitionContext"
import EventContext from "../context/EventContext"
import EventCard from "./EventCard"

function EventContainer() {
  const { user } = useContext(AuthContext)
  const { events, setEvents } = useContext(EventContext)
  const [filter, setFilter] = useState("")
  const navigate = useNavigate()
  const { competitions } = useContext(CompetitionContext)


  const handleJoin = (event) => async () => {
    try {
      const response = await axios.post(
        `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/events/${event.id}/users`,
        { userId: user.id },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      setEvents(events.map((e) => e.id === event.id ? response.data : e))
    } catch (error) {
      toast.error(error.response.data.error)
    }
  }

  const eventsToShow = events.filter((event) => event.name.toLowerCase().includes(filter.toLowerCase()))

  const getButton = (event) => {
    if (!(event.users.includes(user.id))) {
      return (
        <button
          className="w-32 bg-blue-500 text-white py-4 px-2 rounded-md hover:bg-blue-600"
          onClick={handleJoin(event)}
        >
          Join
        </button>
      )
    }

    if (event?.competitionId === "") {
      return (
        <button
          className="w-32 cursor-not-allowed bg-gray-300 text-white py-4 px-2 rounded-md"
        >
          Joined
        </button>
      )
    }

    const competition = competitions.find((comp) => comp.id === event.competitionId)
    const currentDate = new Date()
    const notStarted = currentDate < new Date(competition?.startTime) ? true : false
    const finished = currentDate > new Date(competition?.endTime) ? true : false
    if (notStarted || finished) {
      return (
        <button
          onClick={() => navigate(`/competitions/${event.competitionId}`)}
          className="w-32 cursor-not-allowed bg-red-300 text-white py-4 px-2 rounded-md"
          disabled
        >
          {notStarted ? "Competition not started" : "Competition finished"}
        </button>
      )
    }

    return (
      <button
        onClick={() => navigate(`/competitions/${event.competitionId}`)}
        className="w-32 bg-blue-500 text-white py-4 px-2 rounded-md hover:bg-blue-600"
      >
        Start Competition
      </button>
    )
  }

  return (
    <div className="w-full bg-white p-5 rounded-lg">
      <h2 className="text-3xl font-bold mb-4">Events</h2>
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
          <div
            key={event.name + event.date}
            className="flex items-center space-x-4"
          >
            <EventCard
              event={event}
              callback={() => null}
            />
            {user && getButton(event)}
          </div>
        )
      })}
    </div >
  )
}

export default EventContainer
