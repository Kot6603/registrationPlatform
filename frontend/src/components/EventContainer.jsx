import EventCard from "./EventCard";

function EventContainer({ events }) {
  return (
    <div className="w-4/5 bg-white mx-auto p-5 rounded-lg m-10">
      {events.map((event, _) => {
        return (
          <EventCard key={event.name + event.date} name={event.name} date={event.date} desc={event.desc} />
        )
      })}
    </div >
  )
}

export default EventContainer
