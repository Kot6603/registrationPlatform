import axios from "axios"
import UserCard from "../components/UserCard"
import { useContext, useEffect, useState } from "react"
import AuthContext from "../context/AuthContext"

function UserContainer() {
  const [users, setUsers] = useState([])
  const { user, isAdmin } = useContext(AuthContext)
  const [filter, setFilter] = useState("")

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
  const usersToDisplay = users.filter(user => !isAdmin(user.email) && user.name.toLowerCase().includes(filter.toLowerCase()))
  usersToDisplay.sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">Users</h2>
      <div className="text-lg pb-2 font-bold">
        Filter: <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search users"
          className="border-2 border-gray-300 rounded-md p-2 text-md font-normal"
        />
      </div>
      {usersToDisplay.map((user, _) => {
        return (
          <div key={user.email} className="flex items-center space-x-4">
            <UserCard user={user} />
          </div>
        )
      })
      }
    </div>
  )

}

export default UserContainer;
