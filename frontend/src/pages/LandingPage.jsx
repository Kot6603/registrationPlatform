import EventContainer from '../components/EventContainer'
import Header from '../components/Header'

function LandingPage() {
  const events = [
    {
      "name": "event 1",
      "date": "tuesday",
      "description": "desc of event 1"
    },
    {
      "name": "event 2",
      "date": "wednesday",
      "description": "desc of event 2"
    },
  ]
  return (
    <div>
      <Header
        heading={"Landing Page"}
        onClick={() => console.log("hi from landing")}
        buttonText={"Log In"}
      />
      <EventContainer events={events} />
    </div>
  )
}


export default LandingPage
