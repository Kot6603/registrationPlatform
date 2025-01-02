import { useState } from "react";

function QuestionCard({ question }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <div className="w-full mx-auto p-4 border-2 border-white bg-white shadow-lg rounded-md m-2">
      <button className="w-full text-left" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <h2 className="font-bold mb-2">{question.title}</h2>
        <div className="flex justify-between items-center">
          <h2>Difficulty: {question.difficulty || "-"}</h2>
          <h2>Topic: {question.topic || "-"}</h2>
        </div>
      </button>
      {
        isDropdownOpen && <div className="mt-2">
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-4">
              <span
                className={`w-5 h-5 flex-shrink-0 rounded-full flex items-center justify-center ${question.correctOptionIndex === index
                  ? "bg-green-500 text-white before:content-['✓']"
                  : "bg-red-500 text-white before:content-['✕']"
                  }`}
              ></span>
              <p>{option}</p>
            </div>
          ))
          }
        </div >
      }
    </div >
  )
}

export default QuestionCard
