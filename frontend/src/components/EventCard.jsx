import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"

import AuthContext from "../context/AuthContext"
import CompetitionContext from "../context/CompetitionContext"

function EventCard({ event, callback, options = [] }) {
  const { user, isAdmin } = useContext(AuthContext)
  const { competitions } = useContext(CompetitionContext)
  const [selectedOption, setSelectedOption] = useState(-1)
  const navigate = useNavigate()

  const competition = competitions.find((comp) => comp.id === event.competitionId)
  const currentDate = new Date()
  const notStarted = currentDate < new Date(competition?.startTime) ? true : false
  const finished = currentDate > new Date(competition?.endTime) ? true : false

  useEffect(() => {
    if (event.competitionId) {
      setSelectedOption(event.competitionId)
    }
  }, [options, event])

  const handleOptionSelect = (e) => {
    setSelectedOption(e.target.value)
    callback(e.target.value)
  }

  const subcomponent = () => {
    if (!user) {
      return null
    }

    if (isAdmin(user.email)) {
      return (
        <div className="relative text-sm">
          <select
            value={selectedOption}
            onChange={handleOptionSelect}
            className="w-full p-1 rounded"
          >
            <option value={-1}>Select competition</option>
            {options.map((option) => (
              <option key={option.id} value={option.id}>{option.title}</option>
            ))}
          </select>
        </div>
      )
    }

    if (notStarted || finished) {
      return (
        <div className="relative text-sm">
          <button
            onClick={() => navigate(`/competitions/${event.competitionId}`)}
            className="w-full p-1 bg-red-500 text-white border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            disabled
          >
            {notStarted ? "Competition not started" : "Competition finished"}
          </button>
        </div>
      )
    }

    return (
      <div className="relative text-sm">
        <button
          onClick={() => navigate(`/competitions/${event.competitionId}`)}
          className="w-full p-1 bg-white border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
        >
          Start Competition
        </button>
      </div>
    )
  }


  return (
    <div className="w-full mx-auto p-4 border-2 border-white bg-gray-800 shadow-lg rounded-md m-2">
      <div className="flex justify-between items-center border-b-2 border-white pb-2 mb-2">
        <h2 className="text-xl font-bold text-white">{event.name}</h2>
        <div>
          <h3 className="text-sm text-gray-200 mb-1">{new Date(event.date).toDateString()}</h3>
          {subcomponent()}
        </div>
      </div>
      <p className="text-white">{event.description}</p>
    </div>
  )
}

export default EventCard
