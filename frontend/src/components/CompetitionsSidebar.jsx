import { useState } from "react"
import CompetitionsList from './CompetitionsList'


function CompetitionsSidebar() {
  const [error, setError] = useState(null)

  const handleNewCompetition = (e) => {
    e.preventDefault()
    console.log(e.target)
  }

  return (
    <div className="bg-gray-800 rounded-md p-6 shadow-md">
      <h2 className="text-xl text-white font-bold mb-4">Competitions</h2>
      <div>
        <CompetitionsList />
      </div>
      <h2 className="text-xl text-white font-bold mt-4 mb-4">Create New Competition</h2>
      <form className="space-y-4" onSubmit={handleNewCompetition}>
        <div>
          <label htmlFor="title" className="block text-white">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Enter competition title"
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
