import CompetitionsSidebar from "../components/CompetitionsSidebar"
import useLogout from "../hooks/useLogout"

function AdminCompetition() {
  const { logout } = useLogout()

  return (
    <div>
      <header className="p-4 bg-gray-800 shadow-lg rounded-md m-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-white">Competitions</h1>
          <button
            onClick={() => logout()}
            className="bg-white text-black px-4 py-2 rounded-md shadow-md hover:bg-gray-100 transition duration-200"
          >
            Logout
          </button>
        </div>
      </header>
      <div className="max-w-screen mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <CompetitionsSidebar />
        </div>
        <div>
          testing
        </div>
      </div>
    </div>
  )
}

export default AdminCompetition
