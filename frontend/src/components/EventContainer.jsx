import EventCard from "./EventCard"

function EventContainer({ events }) {
  return (
    <div className="bg-white p-5 rounded-lg">
      <h2 className="text-3xl font-bold mb-4">Events</h2>
      {events.map((event, _) => {
        return (
          <EventCard
            key={event.name + event.date}
            name={event.name}
            date={new Date(event.date).toDateString()}
            desc={event.description}
          />
        )
      })}
    </div >
  )
}

export default EventContainer
