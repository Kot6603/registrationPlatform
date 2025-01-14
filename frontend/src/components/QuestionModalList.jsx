import { useState } from "react"

import QuestionCard from "./QuestionCard"
import { DIFFICULTY_TAGS, TOPIC_TAGS } from "../data.js"

function QuestionModalList({ isOpen, onSubmit, onClose, allQuestions, questions }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState("")
  const [selectedTopic, setSelectedTopic] = useState("")

  if (!isOpen) return null

  const questionsToShow = allQuestions.filter((question) => {
    return !(questions.some((q) => q.id === question.id))
  })

  const filterDifficulty = questionsToShow.filter((question) => {
    if (!selectedDifficulty) return true
    return question.difficulty === selectedDifficulty
  })

  const filterTopic = filterDifficulty.filter((question) => {
    if (!selectedTopic) return true
    return question.topic === selectedTopic
  })

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div
        className="bg-blue-600 rounded-lg p-6 min-w-[600px] max-h-[700px] overflow-y-auto overflow-x-hidden"
        style={{ scrollbarWidth: "none" }}
      >
        <h2 className="text-xl font-semibold mb-4 text-white">Add Question</h2>

        {/* Filters */}
        <div className="flex justify-between mb-2">
          <div className="flex flex-col">
            <label className="text-white">Filter by Difficulty:</label>
            <select
              value={selectedDifficulty}
              onChange={(event) => setSelectedDifficulty(event.target.value)}
              className="p-1 rounded"
            >
              <option value={""}>No Filter</option>
              {DIFFICULTY_TAGS.map((difficulty) => (
                <option key={difficulty} value={difficulty}>{difficulty}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-white">Filter by Topic:</label>
            <select
              value={selectedTopic}
              onChange={(event) => setSelectedTopic(event.target.value)}
              className="p-1 rounded"
            >
              <option value={""}>No Filter</option>
              {TOPIC_TAGS.map((topic) => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Options */}
        {filterTopic.length === 0
          ? <p className="text-white font-bold text-center mt-5">No questions found</p>
          : filterTopic.map((question, index) => (
            <div key={index} className="mb-2 flex items-center justify-between min-w-[600px]">
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
    </div >
  )
}

export default QuestionModalList
