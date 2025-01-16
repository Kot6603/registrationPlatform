import axios from "axios";
import { useState, useContext } from "react";
import toast from "react-hot-toast";

import AuthContext from "../context/AuthContext";

const baseUrl = `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/users`;

function useSignup() {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AuthContext);

  const signup = async (email, password, name) => {
    setLoading(true);

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
      toast.error(error.response.data.detail);
      setLoading(false);
    }
  };

  return { signup, loading };
}

export default useSignup;
