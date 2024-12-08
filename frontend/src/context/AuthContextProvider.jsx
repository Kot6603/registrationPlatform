import { useReducer } from "react";

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

  console.log("AuthContext state: ", state);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
