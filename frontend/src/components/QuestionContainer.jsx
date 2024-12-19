import axios from "axios"
import { useContext, useEffect, useState } from "react"

import AuthContext from "../context/AuthContext"
import QuestionCard from "./QuestionCard"
import QuestionModalForm from "./QuestionModalForm"

function QuestionContainer({ competition }) {
  const { user } = useContext(AuthContext)
  const [filter, setFilter] = useState("")
  const [questions, setQuestions] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchQuestions = async (competitionId) => {
      try {
        const response = await axios.get(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/competitions/${competitionId}/questions`,
          { headers: { Authorization: `Bearer ${user.token}` } }
        )
        setQuestions(response.data)
      } catch (error) {
        console.error("Error fetching questions", error)
      }
    }
    if (competition) {
      fetchQuestions(competition.id)
    }
  }, [user.token, competition])

  const handleSubmit = async (question) => {
    try {
      const response = await axios.post(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/competitions/${competition.id}/questions`,
        question,
        { headers: { Authorization: `Bearer ${user.token}` } }
      )

      setQuestions(questions.concat(response.data))
    } catch (error) {
      console.error("Error creating question", error)
    }
  };

  const handleDelete = (question) => async () => {
    console.log(question)
  }

  const questionsToShow = questions.filter((question) => question.title.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div className="w-full bg-gray-800 p-5 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">{competition?.name}</h2>
      <div className="flex justify-between">
        <div className="text-lg pb-2 font-bold text-white">
          Filter: <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search questions"
            className="border-2 border-gray-300 rounded-md p-2 text-sm font-normal"
          />
        </div>
        <div>
          <button
            className="border-2 bg-white rounded-md p-2 text-sm font-normal"
            onClick={() => setIsModalOpen(true)}
          >
            Add Question
          </button>
          <QuestionModalForm
            isOpen={isModalOpen}
            onSubmit={handleSubmit}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </div>
      <div
        className="max-h-[65vh] overflow-y-auto overflow-x-hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {questionsToShow.map((question, _) => {
          return (
            <div
              key={question.title}
              className="flex items-center space-x-4"
            >
              <QuestionCard question={question} />
              <button
                onClick={handleDelete(question)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          )
        })}
      </div >
    </div >
  )
}

export default QuestionContainer
