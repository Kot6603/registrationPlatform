import QuestionCard from "./QuestionCard"

function QuestionModalList({ isOpen, onSubmit, onClose, allQuestions, questions }) {
  if (!isOpen) return null

  const questionsToShow = allQuestions.filter((question) => {
    return !(questions.some((q) => q.id === question.id))
  })

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-gray-800 rounded-lg p-6 h-[700px] overflow-y-auto overflow-x-hidden">
        <h2 className="text-xl font-semibold mb-4 text-white">Add Question</h2>
        {/* Options */}
        {questionsToShow.map((question, index) => (
          <div key={index} className="mb-2 flex items-center justify-between">
            <QuestionCard question={question} />
            <button
              type="button"
              className="ml-4 mr-2 px-4 py-2 bg-red-500 rounded text-white"
              onClick={onSubmit(question.id)}
            >
              Add
            </button>
          </div>
        ))}

        {/* Actions */}
        <div className="flex justify-end mt-4">
          <button
            type="button"
            className="mr-2 px-4 py-2 bg-gray-200 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuestionModalList
