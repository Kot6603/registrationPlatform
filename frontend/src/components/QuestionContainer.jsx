import axios from "axios"
import { useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"

import AuthContext from "../context/AuthContext"
import QuestionCard from "./QuestionCard"
import QuestionModalForm from "./QuestionModalForm"
import QuestionModalList from "./QuestionModalList"

function QuestionContainer({ competition, allQuestions, setAllQuestions }) {
  const { user } = useContext(AuthContext)
  const [filter, setFilter] = useState("")
  const [questions, setQuestions] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  useEffect(() => {
    const fetchQuestions = async (competitionId) => {
      try {
        const response = await axios.get(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/competitions/${competitionId}/questions`,
          { headers: { Authorization: `Bearer ${user.token}` } }
        )
        setQuestions(response.data)
      } catch (error) {
        toast.error("Error fetching questions", error)
      }
    }
    if (competition) {
      fetchQuestions(competition.id)
    }
  }, [user.token, competition])

  const handleAddQuestion = (questionId) => async () => {
    try {
      const response = await axios.post(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/competitions/${competition.id}/questions`,
        { questionId },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      setQuestions(questions.concat(response.data))
      toast.success("Question added")
    } catch (error) {
      toast.error("Error adding question", error)
    }
  }

  const handleNewQuestion = async (question) => {
    try {
      const response = await axios.post(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/competitions/questions`,
        question,
        { headers: { Authorization: `Bearer ${user.token}` } }
      )

      setAllQuestions(allQuestions.concat(response.data))
      toast.success("Question created successfully")
    } catch (error) {
      toast.error("Error creating question", error)
    }
  };

  const handleDelete = (question) => async () => {
    try {
      const response = await axios.delete(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/competitions/${competition.id}/questions/${question.id}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      setQuestions(questions.filter((q) => q.id !== response.data.id))
      toast.success("Question deleted successfully")
    } catch (error) {
      toast.error("Error deleting question", error)
    }
  }

  const questionsToShow = questions.filter((question) => question.title.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div className="w-full bg-gray-800 p-5 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">{competition?.title}</h2>
      <div className="flex justify-between">
        <div className="text-lg pb-2 font-bold text-white">
          Filter: <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search questions"
            className="border-2 border-gray-300 rounded-md p-2 text-sm font-normal text-black"
          />
        </div>
        <div>
          <button
            className="border-2 bg-white rounded-md p-2 text-sm font-normal mr-2"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Question
          </button>
          <QuestionModalList
            isOpen={isAddModalOpen}
            onSubmit={handleAddQuestion}
            onClose={() => setIsAddModalOpen(false)}
            allQuestions={allQuestions}
            questions={questions}
          />
          <button
            className="border-2 bg-white rounded-md p-2 text-sm font-normal"
            onClick={() => setIsModalOpen(true)}
          >
            Create Question
          </button>
          <QuestionModalForm
            isOpen={isModalOpen}
            onSubmit={handleNewQuestion}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </div>
      <div
        className="max-h-[65vh] overflow-y-auto overflow-x-hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {questionsToShow.map((question) => {
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
