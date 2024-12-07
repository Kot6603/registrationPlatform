import EventCard from '../components/EventCard'

function LandingPage() {
  return (
    <div className="red">
      <h1>Landing Page</h1>
      <EventCard name={"event 1"} date={"tuesday"} desc={"some desc"} />
      <EventCard name={"event 2"} date={"wednesday"} desc={"some desc"} />
    </div>
  )
}


export default LandingPage
