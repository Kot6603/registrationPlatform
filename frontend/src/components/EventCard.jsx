import { useContext, useEffect, useState } from "react"

import AuthContext from "../context/AuthContext"

function EventCard({ event, callback, options = [] }) {
  const { user, isAdmin } = useContext(AuthContext)
  const [selectedOption, setSelectedOption] = useState(-1)

  useEffect(() => {
    if (event.competitionId) {
      setSelectedOption(event.competitionId)
    }
  }, [options, event])

  const handleOptionSelect = (e) => {
    setSelectedOption(e.target.value)
    callback(e.target.value)
  }

  return (
    <div className="w-full mx-auto p-4 border-2 border-white bg-gray-800 shadow-lg rounded-md m-2">
      <div className="flex justify-between items-center border-b-2 border-white pb-2 mb-2">
        <h2 className="text-xl font-bold text-white">{event.name}</h2>
        <div>
          <h3 className="text-sm text-gray-200 mb-1">{new Date(event.date).toDateString()}</h3>
          {isAdmin(user?.email) &&
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
            </div>}
        </div>
      </div>
      <p className="text-white">{event.description}</p>
    </div>
  )
}

export default EventCard
