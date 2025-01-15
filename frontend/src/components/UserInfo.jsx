import axios from "axios";
import { useState, useContext } from "react";
import toast from "react-hot-toast";

import AuthContext from "../context/AuthContext";

function UserInfo({ name, email, setName }) {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useContext(AuthContext);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!name) {
      toast.error("Name cannot be empty");
      return;
    }

    setIsEditing(false);

    try {
      const response = await axios.patch(
        `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/users/${user.id}`,
        { name },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      setName(response.data.name);
    } catch (error) {
      console.log(error.response.data.error);
    }
  }

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

