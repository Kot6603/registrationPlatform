import axios from "axios"
import { useContext, useState } from "react"

import AuthContext from "../context/AuthContext"
import CompetitionContext from "../context/CompetitionContext"
import CompetitionsList from './CompetitionsList'


function CompetitionsSidebar({ activeCompetition, setActiveCompetition }) {
  const { user } = useContext(AuthContext)
  const { competitions, setCompetitions } = useContext(CompetitionContext)
  const [error, setError] = useState(null)

  const handleNewCompetition = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/competitions`,
        { title: e.target.title.value, startTime: e.target.startTime.value, endTime: e.target.endTime.value },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      setError(null)
      setCompetitions(competitions.concat(response.data))
    } catch (error) {
      setError(error.response.data.error)
    }
    e.target.reset()
  }

  return (
    <div className="bg-gray-800 rounded-md p-6 shadow-md">
      <h2 className="text-xl text-white font-bold mb-4">All Competitions</h2>
      <div>
        <CompetitionsList
          competitions={competitions}
          activeCompetition={activeCompetition}
          setActiveCompetition={setActiveCompetition}
        />
      </div>
      <h2 className="text-xl text-white font-bold mt-4 mb-4">Create New Competition</h2>
      <form className="space-y-4" onSubmit={handleNewCompetition}>
        <div className="space-y-2">
          <label htmlFor="title" className="block text-white">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Enter competition title"
            className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
          <label htmlFor="startTime" className="block text-white">Start Time</label>
          <input
            id="startTime"
            type="datetime-local"
            className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
          <label htmlFor="endTime" className="block text-white">End Time</label>
          <input
            id="endTime"
            type="datetime-local"
            className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
        </div>
        {error && <div className="mx-auto p-2 text-white bg-red-500 shadow-lg rounded-md text-center">{error}</div>}
        <button
          type="submit"
          className="w-full bg-white text-black py-2 rounded-md hover:bg-gray-300 transition"
        >
          Create
        </button>
      </form>
    </div >
  );
}

export default CompetitionsSidebar
