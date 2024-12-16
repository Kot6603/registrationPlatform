import axios from "axios"
import { useEffect, useContext, useState } from "react"
import { useNavigate } from "react-router"

import AuthContext from '../context/AuthContext'
import EventContainer from '../components/EventContainer'
import UserInfo from '../components/UserInfo'
import useLogout from "../hooks/useLogout"

function LandingPage() {
  const { user } = useContext(AuthContext)
  const { logout } = useLogout()
  const [name, setName] = useState("nani")
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/users/${user.id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
        setName(response.data.name)
      } catch (error) {
        console.log(error.response.data.error)
      }
    }
    if (user) {
      fetchUser()
    }
  }, [user])

  return (
    <div>
      <header className="p-4 bg-gray-800 shadow-lg rounded-md m-4">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-white">Event Registration</h1>
          <div>
            {!user ? (
              <>
                <button
                  onClick={() => navigate('/signup')}
                  className="bg-white text-black mx-2 px-4 py-2 rounded-md shadow-md hover:bg-gray-100 transition duration-200"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="bg-white text-black mx-2 px-4 py-2 rounded-md shadow-md hover:bg-gray-100 transition duration-200"
                >
                  Login
                </button>
              </>
            ) :
              <button
                onClick={() => logout()}
                className="bg-white text-black mx-2 px-4 py-2 rounded-md shadow-md hover:bg-gray-100 transition duration-200"
              >
                Logout
              </button>
            }
          </div>
        </div>
      </header>
      <div className="m-8">
        {!user &&
          <div className="w-full mx-auto p-4 border-2 border-white bg-red-400 shadow-lg rounded-md text-center my-6">
            <p className="text-white">You are not logged in. Sign Up / Login to register for an event.</p>
          </div >
        }
        <div className="flex space-x-10">
          <EventContainer />
          {user &&
            <div>
              <UserInfo name={name} email={user.email} setName={setName} />
            </div>
          }
        </div>
      </div>
    </div>
  )
}


export default LandingPage
