import { useState } from "react"

function EventCard({ name, date, desc }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState([])

  const options = ["None", "Option 1", "Option 2", "Option 3", "Option 4", "Option 5"]
  const filteredOptions = options.filter((option) => option.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value)
    setIsDropdownOpen(true)
  }

  const handleOptionSelect = (option) => {
    setSelectedOption(option)
    setSearchQuery(option)
    setIsDropdownOpen(false)
  }

  return (
    <div className="w-full mx-auto p-4 border-2 border-white bg-gray-800 shadow-lg rounded-md m-2">
      <div className="flex justify-between items-center border-b-2 border-white pb-2 mb-2">
        <h2 className="text-xl font-bold text-white">{name}</h2>
        <div>
          <h3 className="text-sm text-gray-200 mb-1">{date}</h3>
          <div className="relative text-sm">
            <input
              type="text"
              placeholder="Select competition"
              value={searchQuery}
              onChange={handleInputChange}
              className="p-1 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
            {isDropdownOpen && (
              <div className="absolute top-full mt-1 bg-white border rounded shadow-lg w-full z-10">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleOptionSelect(option)}
                    >
                      {option}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500">No results found</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <p className="text-white">{desc}</p>

    </div >
  )
}

export default EventCard
