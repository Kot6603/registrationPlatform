import axios from "axios";
import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

const baseUrl = "http://localhost:3001/api/users";

function useLogin() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AuthContext);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${baseUrl}/login`, {
        email,
        password,
      });

      const json = response.data;

      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setLoading(false);
      return true;
    } catch (error) {
      setError(error.response.data.error);
      console.log(error.response.data.error);
      setLoading(false);

      return false;
    }
  };

  return { login, loading, error };
}

export default useLogin;
