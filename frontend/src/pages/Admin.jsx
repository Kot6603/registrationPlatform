import { useContext, useEffect } from "react"
import EventContainer from '../components/EventContainer'
import EventContext from '../context/EventContext'
import EventForm from '../components/EventForm'
import EventService from "../services/event"

function Admin() {
  const { events, setEvents } = useContext(EventContext)

  useEffect(() => {
    EventService
      .getAll()
      .then(notes => {
        setEvents(notes)
      })
  }, [])

  return (
    <div>
      <header className="p-4 bg-gray-800 shadow-lg rounded-md m-4">
        <h1 className="text-2xl font-bold text-white">Admin</h1>
      </header>
      <div className="max-w-screen mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <EventContainer events={events} />
        </div>
        <EventForm />
        <div className="lg:col-span-3 bg-gray-800 rounded-md p-6 shadow-md">
          Account Manager
        </div>
      </div>
    </div>
  )
}

export default Admin
