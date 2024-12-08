import EventCard from "./EventCard"
import { useContext } from "react"
import AuthContext from "../context/AuthContext"

function EventContainer({ events }) {
  const { user } = useContext(AuthContext)
  return (
    <div className="bg-white p-5 rounded-lg">
      <h2 className="text-3xl font-bold mb-4">Events</h2>
      {events.map((event, _) => {
        return (
          <div
            key={event.name + event.date}
            className="flex justify-between"
          >
            <EventCard
              name={event.name}
              date={new Date(event.date).toDateString()}
              desc={event.description}
            />
            {user &&
              <button
                className="my-8 ml-4 bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
              >Register</button>
            }
          </div>
        )
      })}
    </div >
  )
}

export default EventContainer
