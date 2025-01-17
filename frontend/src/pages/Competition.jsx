import axios from "axios"
import { useCallback, useContext, useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import toast from "react-hot-toast"

import AuthContext from "../context/AuthContext"
import CompetitionContext from "../context/CompetitionContext"

function Competition() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const { competitions } = useContext(CompetitionContext)

  const [attempt, setAttempt] = useState({})
  const [questions, setQuestions] = useState([])

  const competition = competitions.find((competition) => competition.id === id)
  const [time, setTime] = useState(new Date(competition?.endTime) - new Date())

  const formatTime = (milliseconds) => {
    const totalSeconds = milliseconds / 1000
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = Math.floor(totalSeconds % 60)
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  useEffect(() => {
    async function fetchQuestions() {
      const response = await axios.get(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/competitions/${id}/questions/test`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setQuestions(response.data)
    }
    if (user) {
      fetchQuestions();
    }
  }, [id, user])

  // save the attempt
  const handleSubmit = useCallback(async () => {
    try {
      await axios.post(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/competitions/${id}/attempts`,
        { attempt },
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
      toast.success(`Attempt submitted successfully`)
      navigate("/")
    } catch (error) {
      toast.error(error)
    }
  }, [attempt, id, navigate, user])

  // polling
  useEffect(() => {
    let timeoutId = null
    const poll = () => {
      let isCheckInProgress = false

      const check = () => {
        if (isCheckInProgress) {
          return
        }

        isCheckInProgress = true
        if (competition) {
          const newTime = new Date(competition.endTime) - new Date()
          if (newTime <= 0) {
            handleSubmit()
            return
          }
          setTime(newTime)
          timeoutId = setTimeout(check, 1000)
        }
        isCheckInProgress = false
      }

      check()
    }
    poll()

    return () => {
      clearTimeout(timeoutId)
    }
  }, [competition, handleSubmit])

  return (
    <div>
      <header className="p-4 bg-gray-800 shadow-lg rounded-md m-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-white">{competition?.title}</h1>
          <div className="flex space-x-4">
            <div className="text-white text-xl my-auto">
              {formatTime(time)} left
            </div>
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
                      id={index}
                      name={question.title}
                      value={option}
                      onChange={(e) => {
                        setAttempt({ ...attempt, [question.id]: e.target.id })
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
