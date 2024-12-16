function QuestionCard({ question }) {
  return (
    <div className="w-full mx-auto p-4 border-2 border-white bg-white shadow-lg rounded-md m-2">
      <h2 className="font-bold">{question.title}</h2>
      <p>option 1 (correct)</p>
      <p>option 2</p>
      <p>option 3</p>
      <p>option 4</p>
    </div >
  )
}

export default QuestionCard
