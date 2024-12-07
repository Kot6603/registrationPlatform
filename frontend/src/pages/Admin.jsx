import EventContainer from '../components/EventContainer'

function Admin() {
  return (
    <div>
      <header className="p-4 bg-gray-800 shadow-lg rounded-md m-4">
        <h1 className="text-2xl font-bold text-white">Admin</h1>
      </header>
      <div className="max-w-screen">
        <EventContainer events={[]} />
      </div>
    </div>
  )
}

export default Admin
