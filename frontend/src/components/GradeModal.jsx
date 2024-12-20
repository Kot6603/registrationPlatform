function GradeModal({ isOpen, onClose, marks }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4 text-white">Marks for {marks.title}</h2>
        <table className="w-full text-white text-left">
          <thead>
            <tr>
              <th>Student</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {marks.marks.map((mark) => (
              <tr key={mark.studentEmail}>
                <td>{mark.studentEmail}</td>
                <td>{mark.mark} / {marks.totalMarks} ({mark.mark / marks.totalMarks * 100}%)</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default GradeModal 
