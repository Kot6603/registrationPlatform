import EventCard from "./EventCard"
import { useContext } from "react"
import EventContext from "../context/EventContext"

function AdminEventContainer() {
  const { events, setEvents } = useContext(EventContext)


  const handleEdit = (event) => () => {
    console.log("Edit event", event)
  }
  const handleDelete = (event) => () => {
    console.log("Delete event", event)
  }
  return (
    <div className="bg-white p-5 rounded-lg">
      {events.map((event, _) => {
        return (
          <div key={event.name + event.date} className="flex items-center space-x-4">
            <EventCard
              name={event.name}
              date={new Date(event.date).toDateString()}
              desc={event.description}
            />
            <button
              onClick={handleEdit(event)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={handleDelete(event)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        )
      })}
    </div >
  )
}

export default AdminEventContainer
