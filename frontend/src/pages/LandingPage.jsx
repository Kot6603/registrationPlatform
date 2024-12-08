import EventContainer from '../components/EventContainer'
import { useContext, useState } from "react"
import EventContext from '../context/EventContext'
import { useNavigate } from "react-router"
import useLogout from "../hooks/useLogout"
import AuthContext from '../context/AuthContext'
import UserInfo from '../components/UserInfo'

function LandingPage() {
  const { events } = useContext(EventContext)
  const { user } = useContext(AuthContext)
  const { logout } = useLogout()
  const [name, setName] = useState("")
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div>
      <header className="p-4 bg-gray-800 shadow-lg rounded-md m-4">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-white">Event Registery</h1>
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
                onClick={handleLogout}
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
          <EventContainer events={events} />
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
