import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"

import AuthContext from "../context/AuthContext"

function Competition() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  // should be a map
  const [attempt, setAttempt] = useState({})
  const [questions, setQuestions] = useState([])

  // get competition data (questions no answers)
  useEffect(() => {
    async function fetchQuestions() {
      const response = await axios.get(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/competitions/${id}/questions/test`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      console.log(response.data)
      setQuestions(response.data)
    }
    if (user) {
      fetchQuestions();
    }
  }, [id, user])

  // should we get their previous attempt data?

  // save the attempt
  const handleSubmit = () => {
    alert("gonna save this attempt :D")
  }

  return (
    <div>
      <header className="p-4 bg-gray-800 shadow-lg rounded-md m-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-white">{id}</h1>
          <div>
            <button
              onClick={() => navigate("/")}
              className="bg-white text-black px-4 mr-4 py-2 rounded-md shadow-md hover:bg-gray-100 transition duration-200"
            >
              Home
            </button>
            <button
              onClick={handleSubmit}
              className="bg-white text-black px-4 py-2 rounded-md shadow-md hover:bg-gray-100 transition duration-200"
            >
              Submit
            </button>
          </div>
        </div>
      </header>
      <div className="m-8">
        <div className="w-full bg-white p-5 rounded-lg">
          {questions.map((question, index) => (
            <div key={index} className="mb-4">
              <h2 className="text-lg font-bold">{question.title}</h2>
              <div className="flex flex-col">
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="radio"
                      id={option}
                      name={question.title}
                      value={option}
                      onChange={(e) => {
                        setAttempt({ ...attempt, [question.id]: e.target.value })
                      }}
                    />
                    <label htmlFor={option} className="ml-2">{option}</label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Competition
