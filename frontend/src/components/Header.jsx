function Header({ heading, onClick, buttonText }) {
  return (
    <div className="p-4 bg-gray-800 shadow-lg rounded-md mx-4 my-4">
      <div className="flex justify-between">
        <h1 className="font-bold text-xl text-white py-2">{heading}</h1>
        <button
          onClick={onClick}
          className="bg-white text-black px-4 py-2 rounded-md shadow-md hover:bg-gray-100 transition duration-200"
        >
          {buttonText}
        </button>
      </div>
    </div>
  )
}

export default Header
