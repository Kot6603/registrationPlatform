import { useState } from "react"

function QuestionModalForm({ isOpen, onSubmit, onClose }) {
  const [title, setTitle] = useState("")
  const [options, setOptions] = useState(["", "", "", ""])
  const [correctOptionIndex, setCorrectOptionIndex] = useState(null)

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ title, options, correctOptionIndex })
    onClose()

    setTitle("")
    setOptions(["", "", "", ""])
    setCorrectOptionIndex(null)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-96">
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
