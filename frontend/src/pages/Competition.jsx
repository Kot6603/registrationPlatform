function Competition() {
  return (
    <div>
      <header className="p-4 bg-gray-800 shadow-lg rounded-md m-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-white">Competitions</h1>
          <button
            onClick={() => console.log("hi")}
            className="bg-white text-black px-4 py-2 rounded-md shadow-md hover:bg-gray-100 transition duration-200"
          >
            Submit
          </button>
        </div>
      </header>
    </div>
  )
}

export default Competition