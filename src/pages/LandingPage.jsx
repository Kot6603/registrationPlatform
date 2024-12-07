import EventContainer from '../components/EventContainer'

function LandingPage() {
  const events = [
    {
      "name": "event 1",
      "date": "tuesday",
      "desc": "desc of event 1"
    },
    {
      "name": "event 2",
      "date": "wednesday",
      "desc": "desc of event 2"
    },
  ]
  return (
    <div>
      <EventContainer events={events} />
    </div>
  )
}


export default LandingPage
