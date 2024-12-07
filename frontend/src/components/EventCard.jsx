function EventCard({ name, date, desc }) {
  return (
    <div className="mx-auto p-4 border-2 border-white bg-gray-800 shadow-lg rounded-md m-2">
      <div className="flex justify-between items-center border-b-2 border-white pb-2 mb-2">
        <h2 className="text-xl font-bold text-white">{name}</h2>
        <h3 className="text-sm text-gray-200">{date}</h3>
      </div>
      <p className="text-white">{desc}</p>
    </div >
  )
}

export default EventCard
