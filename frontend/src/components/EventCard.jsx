import { useContext, useEffect, useState } from "react"

import AuthContext from "../context/AuthContext"

function EventCard({ event, callback, options = [] }) {
  const { user, isAdmin } = useContext(AuthContext)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState({ title: "Select competition", id: "" })

  useEffect(() => {
    if (event.competitionId) {
      setSelectedOption(options.find(option => option.id === event.competitionId))
    }
  }, [options, event])

  const handleOptionSelect = (option) => {
    setSelectedOption(option)
    callback(option.id)
    setIsDropdownOpen(false)
  }

  return (
    <div className="w-full mx-auto p-4 border-2 border-white bg-gray-800 shadow-lg rounded-md m-2">
      <div className="flex justify-between items-center border-b-2 border-white pb-2 mb-2">
        <h2 className="text-xl font-bold text-white">{event.name}</h2>
        <div>
          <h3 className="text-sm text-gray-200 mb-1">{new Date(event.date).toDateString()}</h3>

          {!user || !isAdmin(user.email) ? null :
            <div className="relative text-sm">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full p-1 bg-white border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              >
                {selectedOption?.title}
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full mt-1 bg-white border rounded shadow-lg w-full z-10">
                  {options.length > 0 ? (
                    options.map((option, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleOptionSelect(option)}
                      >
                        {option.title}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500">No results found</div>
                  )}
                </div>
              )}
            </div>}
        </div>
      </div>
      <p className="text-white">{event.description}</p>

    </div >
  )
}

export default EventCard
