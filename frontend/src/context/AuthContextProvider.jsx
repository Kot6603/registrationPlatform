import { useReducer, useEffect, useState } from "react";

import AuthContext from "./AuthContext";

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
}

function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
    setLoading(false);
  }, [])

  const isAdmin = (email) => {
    return email === import.meta.env.VITE_ADMIN_EMAIL;
  }

  console.log("AuthContext state: ", state);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
        loading,
        isAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
