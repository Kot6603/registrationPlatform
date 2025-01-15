import { useNavigate } from 'react-router'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-10 rounded-md shadow-lg flex flex-col justify-center max-w-lg space-y-4 items-center">
        <div className="text-white text-center font-bold text-2xl">
          Page not found (404)
        </div>
        <button
          onClick={() => navigate("/")}
          className="bg-white text-black px-4 py-2 rounded-md shadow-md hover:bg-gray-100 transition duration-200"
        >
          Go to Home
        </button>
      </div>
    </div >
  )
}

export default NotFound
