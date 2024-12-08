import { useState } from "react";

function UserInfo({ name, email, setName }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-80">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">User Details</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold">Name:</label>
        {isEditing ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <p className="text-gray-800 mt-2">{name}</p>
        )}
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-bold">Email:</label>
        <p className="text-gray-800 mt-2">{email}</p>
      </div>
      <button
        onClick={isEditing ? handleSave : handleEdit}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
      >
        {isEditing ? "Save Name" : "Edit Name"}
      </button>
    </div>
  );
}

export default UserInfo;

