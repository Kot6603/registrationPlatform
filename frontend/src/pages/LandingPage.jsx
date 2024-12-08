import EventContainer from '../components/EventContainer'
import { useContext, useEffect } from "react"
import EventContext from '../context/EventContext'
import EventService from "../services/event"
import { useNavigate } from "react-router"
import useLogout from "../hooks/useLogout"
import AuthContext from '../context/AuthContext'

function LandingPage() {
  const { events, setEvents } = useContext(EventContext)
  const { user } = useContext(AuthContext)
  const { logout } = useLogout()

  const navigate = useNavigate()

  useEffect(() => {
    EventService
      .getAll()
      .then(notes => {
        setEvents(notes)
      })
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
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
        <EventContainer events={events} />
      </div>
    </div>
  )
}


export default LandingPage
