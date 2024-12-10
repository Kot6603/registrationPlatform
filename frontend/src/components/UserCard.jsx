import { useContext } from "react";

import EventContext from "../context/EventContext";

function UserCard({ user }) {
  const { events } = useContext(EventContext);

  const userEvents = events.filter((event) => event.users.includes(user._id));

  return (
    <div className="w-full mx-auto p-4 border-2 border-white bg-gray-700 shadow-lg rounded-md m-2">
      <div className="flex justify-between items-center border-b-2 border-white pb-2 mb-2">
        <h2 className="text-xl font-bold text-white">{user.name}</h2>
        <h3 className="text-sm text-gray-200">{user.email}</h3>
      </div>
      <p className="text-white">
        {user.name} has joined {userEvents.length} events{userEvents.length > 0 ? ":" : "."}
      </p>
      <ul className="text-white">
        {userEvents.map(e =>
          <li key={e.name + e.date}>- {e.name} ({new Date(e.date).toDateString()})</li>
        )}
      </ul>
    </div >
  )
}

export default UserCard
