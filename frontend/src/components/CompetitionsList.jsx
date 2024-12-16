import { useState, useEffect } from "react";

function CompetitionsList() {
  const [filter, setFilter] = useState("")
  const [competitions, setCompetitions] = useState([])

  useEffect(() => setCompetitions([
    { "title": "test 1" },
    { "title": "test 2" },
    { "title": "test 3" },
    { "title": "test 4" },
    { "title": "test 5" },
  ]), [])

  const competitionsToShow = competitions.filter((competition) => competition.title.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div className="w-full bg-white p-5 rounded-lg">
      <div className="pb-2 font-bold">
        Filter: <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search events"
          className="border-2 border-gray-300 rounded-md p-1 text-sm font-normal"
        />
      </div>
      {competitionsToShow.map((comp) => {
        return (
          <div
            key={comp.name}
            className="flex items-center space-x-4"
          >
            <button className="w-full mx-auto p-2 border-2 border-white bg-gray-800 shadow-lg rounded-md m-1">
              <p className="text-lg font-bold text-white">{comp.title}</p>
            </button >
          </div>
        )
      })}
    </div >
  );
}

export default CompetitionsList
