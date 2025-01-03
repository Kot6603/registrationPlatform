import { useState } from "react";

function CompetitionsList({ competitions, activeCompetition, setActiveCompetition }) {
  const [filter, setFilter] = useState("")

  const competitionsToShow = competitions.filter((competition) => competition.title.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div className="w-full bg-white p-5 rounded-lg">
      <div className="pb-2 font-bold">
        Filter: <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search competitions"
          className="border-2 border-gray-300 rounded-md p-1 text-sm font-normal"
        />
      </div>
      <div
        className="max-h-[150px] overflow-y-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {competitionsToShow.map((comp) => {
          return (
            <div
              key={comp.title}
              className="flex items-center space-x-4"
            >
              <button
                className={`w-full mx-auto p-2 border-2 border-white ${comp.id === activeCompetition?.id ? "bg-blue-700" : "bg-gray-800"} shadow-lg rounded-md m-1`}
                onClick={() => setActiveCompetition({
                  id: comp.id,
                  title: comp.title
                })}
              >
                <p className="text-lg font-bold text-white">{comp.title}</p>
              </button >
            </div>
          )
        })}
      </div>
    </div >
  );
}

export default CompetitionsList
