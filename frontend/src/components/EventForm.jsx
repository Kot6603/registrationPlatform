function EventForm() {
  const handleNewEvent = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const newEvent = {
      title: formData.get('title'),
      description: formData.get('description'),
      date: formData.get('date'),
    }
    console.log(newEvent)
  }

  return (
    <div className="bg-gray-800 rounded-md p-6 shadow-md">
      <h2 className="text-xl text-white font-bold mb-4">Create Event</h2>
      <form className="space-y-4" onSubmit={handleNewEvent}>
        <div>
          <label htmlFor="title" className="block text-white">Title</label>
          <input
            id="event-name"
            type="text"
            placeholder="Enter event name"
            className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
        <div>
          <label htmlFor="event-desc" className="block text-gray-300">Description</label>
          <textarea
            id="event-desc"
            placeholder="Enter event description"
            className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          ></textarea>
        </div>
        <div>
          <label htmlFor="event-date" className="block text-gray-300">Date</label>
          <input
            id="event-date"
            type="date"
            className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
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
