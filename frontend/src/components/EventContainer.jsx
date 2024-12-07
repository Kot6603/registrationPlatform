import EventCard from "./EventCard"

function EventContainer({ events }) {
  return (
    <div className="bg-white p-5 rounded-lg">
      {events.map((event, _) => {
        return (
          <EventCard key={event.name + event.date} name={event.name} date={event.date} desc={event.description} />
        )
      })}
    </div >
  )
}

export default EventContainer
