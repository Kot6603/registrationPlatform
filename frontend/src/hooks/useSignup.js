import axios from "axios";
import { useState, useContext } from "react";

import AuthContext from "../context/AuthContext";

const baseUrl = `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/users`;

function useSignup() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AuthContext);

  const signup = async (email, password, name) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${baseUrl}/signup`, {
        email,
        password,
        name,
      });

      const json = response.data;

      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setLoading(false);
    } catch (error) {
      setError(error.response.data.error);
      setLoading(false);
    }
  };

  return { signup, loading, error };
}

export default useSignup;
