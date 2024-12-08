import axios from "axios"
import { useContext } from "react"
import EventContext from "../context/EventContext"
import AuthContext from "../context/AuthContext"

function EventForm() {
  const { events, setEvents } = useContext(EventContext)
  const { user } = useContext(AuthContext)
  const handleNewEvent = async (e) => {
    e.preventDefault()
    const formDate = new Date(e.target.date.value)

    if (!user) {
      console.log("You need to be logged in to create an event")
      return
    }

    if (events.some(event => event.name === e.target.name.value && new Date(event.date).getTime() === formDate.getTime())) {
      console.log("Event already exists")
      return
    }

    const newEvent = {
      name: e.target.name.value,
      description: e.target.description.value,
      date: formDate,
    }

    try {
      const request = await axios.post("http://localhost:3001/api/events",
        newEvent,
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      const returnedEvent = request.data
      setEvents(events.concat(returnedEvent))
    } catch (error) {
      console.log(error.response.data.error)
    }
  }

  return (
    <div className="bg-gray-800 rounded-md p-6 shadow-md">
      <h2 className="text-xl text-white font-bold mb-4">Create Event</h2>
      <form className="space-y-4" onSubmit={handleNewEvent}>
        <div>
          <label htmlFor="name" className="block text-white">Title</label>
          <input
            id="name"
            type="text"
            placeholder="Enter event name"
            className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-300">Description</label>
          <textarea
            id="description"
            placeholder="Enter event description"
            className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="date" className="block text-gray-300">Date</label>
          <input
            id="date"
            type="date"
            className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-white text-black py-2 rounded-md hover:bg-gray-300 transition"
        >
          Create
        </button>
      </form>
    </div>

  )
}

export default EventForm
