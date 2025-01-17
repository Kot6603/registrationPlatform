import { useState } from "react"

import { DIFFICULTY_TAGS, TOPIC_TAGS } from "../data.js"

function QuestionModalForm({ isOpen, onSubmit, onClose }) {
  const [title, setTitle] = useState("")
  const [options, setOptions] = useState(["", "", "", ""])
  const [correctOptionIndex, setCorrectOptionIndex] = useState(0)
  const [difficulty, setDifficulty] = useState(DIFFICULTY_TAGS[0])
  const [topic, setTopic] = useState(TOPIC_TAGS[0])

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ title, options, correctOptionIndex, difficulty, topic })
    onClose()

    setTitle("")
    setOptions(["", "", "", ""])
    setCorrectOptionIndex(0)
    setDifficulty(DIFFICULTY_TAGS[0])
    setTopic(TOPIC_TAGS[0])
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-slate-600 rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4 text-white">Create Question</h2>
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-white">Question</label>
            <textarea
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Options */}
          {options.map((option, index) => (
            <div key={index} className="mb-2 flex items-center text-white">
              Option {index + 1} <input
                type="text"
                className="flex-grow border border-gray-300 rounded px-3 py-2 m-2 text-black"
                value={option}
                onChange={(e) => {
                  const newOptions = [...options]
                  newOptions[index] = e.target.value
                  setOptions(newOptions)
                }}
                required
              />
              <input
                type="radio"
                name="correctOption"
                checked={correctOptionIndex === index}
                onChange={() => setCorrectOptionIndex(index)}
              />
            </div>
          ))}

          {/* Tags */}
          <label className="block text-sm font-medium mb-1 text-white">Tags</label>
          <div className="m-auto flex justify-center gap-4">
            <div className="relative text-sm">
              <label className="block text-sm font-medium mb-1 text-white">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full p-1 rounded"
              >
                {DIFFICULTY_TAGS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="relative text-sm">
              <label className="block text-sm font-medium mb-1 text-white">Topic</label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full p-1 rounded"
              >
                {TOPIC_TAGS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="mr-2 px-4 py-2 bg-gray-200 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default QuestionModalForm
