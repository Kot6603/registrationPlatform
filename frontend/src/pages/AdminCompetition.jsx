import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

import CompetitionsSidebar from "../components/CompetitionsSidebar"
import QuestionContainer from "../components/QuestionContainer"
import useLogout from "../hooks/useLogout"

function AdminCompetition() {
  const { logout } = useLogout()
  const navigate = useNavigate()
  const [competitions, setCompetitions] = useState([])
  const [activeCompetition, setActiveCompetition] = useState(null)

  useEffect(() => {
    async function fetchCompetitions() {
      const response = await axios.get(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/competitions`)
      if (response.data[0]) {
        setActiveCompetition({
          id: response.data[0].id,
          title: response.data[0].title
        })
      }
      setCompetitions(response.data)
    }
    fetchCompetitions()
  }, [])

  return (
    <div>
      <header className="p-4 bg-gray-800 shadow-lg rounded-md m-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-white">Competitions</h1>
          <div>
            <button
              onClick={() => navigate("/admin")}
              className="mr-4 bg-white text-black px-4 py-2 rounded-md shadow-md hover:bg-gray-100 transition duration-200"
            >
              Home
            </button>
            <button
              onClick={() => logout()}
              className="bg-white text-black px-4 py-2 rounded-md shadow-md hover:bg-gray-100 transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <div className="max-w-screen mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <CompetitionsSidebar competitions={competitions} setCompetitions={setCompetitions} />
        </div>
        <div className="lg:col-span-2">
          <QuestionContainer competition={activeCompetition} />
        </div>
      </div>
    </div>
  )
}

export default AdminCompetition
