function QuestionCard({ question }) {
  return (
    <div className="w-full mx-auto p-4 border-2 border-white bg-gray-800 shadow-lg rounded-md m-2">
      <h2 className="text-xl font-bold text-white">{question.title}</h2>
    </div >
  )
}

export default QuestionCard
