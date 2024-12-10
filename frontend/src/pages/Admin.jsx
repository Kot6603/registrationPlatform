import axios from "axios"
import AdminEventContainer from '../components/AdminEventContainer'
import EventForm from '../components/EventForm'
import useLogout from "../hooks/useLogout"
import { useContext, useEffect, useState } from "react"
import AuthContext from "../context/AuthContext"
import UserCard from "../components/UserCard"

function Admin() {
  const { logout } = useLogout()
  const [users, setUsers] = useState([])
  const { user, isAdmin } = useContext(AuthContext)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/users', {
          headers: { Authorization: `Bearer ${user.token}` }
        })
        setUsers(response.data)
      } catch (error) {
        console.log(error.response.data.error)
      }
    }
    if (user) {
      fetchUsers()
    }
  }, [user])

  const usersToDisplay = users.filter(user => !isAdmin(user.email))
  usersToDisplay.sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div>
      <header className="p-4 bg-gray-800 shadow-lg rounded-md m-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-white">Admin</h1>
          <button
            onClick={() => logout()}
            className="bg-white text-black px-4 py-2 rounded-md shadow-md hover:bg-gray-100 transition duration-200"
          >
            Logout
          </button>
        </div>
      </header>
      <div className="max-w-screen mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AdminEventContainer />
        </div>
        <div>
          <EventForm />
        </div>
        <div className="lg:col-span-3 bg-white rounded-md p-6 shadow-md">
          <h2 className="text-3xl font-bold mb-2">Users</h2>
          {usersToDisplay.map((user, _) => {
            return (
              <div key={user.email} className="flex items-center space-x-4">
                <UserCard user={user} />
              </div>
            )
          })
          }
        </div>
      </div>
    </div >
  )
}

export default Admin
