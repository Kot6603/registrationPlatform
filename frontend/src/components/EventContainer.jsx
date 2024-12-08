import axios from "axios"
import EventCard from "./EventCard"
import { useContext } from "react"
import AuthContext from "../context/AuthContext"

function EventContainer({ events }) {
  const { user } = useContext(AuthContext)

  const handleJoin = (event) => async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/events/${event.id}/users`,
        { userId: user.id },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      console.log(response.data)
      console.log("Joined event")
    } catch (error) {
      console.log(error.response.data.error)
    }
  }

  return (
    <div className="bg-white p-5 rounded-lg">
      <h2 className="text-3xl font-bold mb-4">Events</h2>
      {events.map((event, _) => {
        return (
          <div
            key={event.name + event.date}
            className="flex items-center space-x-4"
          >
            <EventCard
              name={event.name}
              date={new Date(event.date).toDateString()}
              desc={event.description}
            />
            {user &&
              <button
                className="bg-blue-500 text-white py-4 px-8 rounded-md hover:bg-blue-600"
                onClick={handleJoin(event)}
              >
                Join
              </button>
            }
          </div>
        )
      })}
    </div >
  )
}

export default EventContainer
