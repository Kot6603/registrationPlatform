import { useContext } from "react";
import AuthContext from "../context/authContext";

function useLogout() {
  const { dispatch } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();

    dispatch({ type: "LOGOUT" });
  };

  return { logout };
}

export default useLogout;
