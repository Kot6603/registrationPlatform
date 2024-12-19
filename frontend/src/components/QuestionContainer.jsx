import { useState, useEffect } from "react"
import QuestionCard from "./QuestionCard"
import QuestionModalForm from "./QuestionModalForm"

function QuestionContainer() {
  const [filter, setFilter] = useState("")
  const [questions, setQuestions] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => setQuestions([
    { "title": "question 1" },
    { "title": "test 2" },
    { "title": "test 3" },
    { "title": "test 4" },
    { "title": "test 5" },
  ]), [])

  const handleSubmit = (question) => {
    setQuestions([...questions, question])
    console.log("saved question", question)
  };

  const handleDelete = (question) => async () => {
    console.log(question)
  }

  const questionsToShow = questions.filter((question) => question.title.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div className="w-full bg-gray-800 p-5 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Questions</h2>
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
