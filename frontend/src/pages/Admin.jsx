import axios from "axios"
import AdminEventContainer from '../components/AdminEventContainer'
import EventForm from '../components/EventForm'
import { useNavigate } from "react-router"
import useLogout from "../hooks/useLogout"
import { useContext, useEffect, useState } from "react"
import AuthContext from "../context/AuthContext"

function Admin() {
  const { logout } = useLogout()
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const { user } = useContext(AuthContext)

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
    fetchUsers()
  }, [user])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div>
      <header className="p-4 bg-gray-800 shadow-lg rounded-md m-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-white">Admin</h1>
          <button
            onClick={handleLogout}
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
          {users.map((user, _) => {
            return (
              <div key={user.email} className="flex items-center space-x-4">
                <div>
                  <p className="text-lg font-bold">{user.name}</p>
                  <p className="text-gray-500">{user.email}</p>
                </div>
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
