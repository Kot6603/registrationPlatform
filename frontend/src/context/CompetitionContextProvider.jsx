import axios from "axios";
import { useState, useEffect } from "react";

import CompetitionContext from "./CompetitionContext";

function CompetitionContextProvider({ children }) {
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    async function fetchCompetitions() {
      const response = await axios.get(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/competitions`);
      response.data.sort((a, b) => new Date(a.startTime) - new Date(b.endTime));
      setCompetitions(response.data);
    }
    fetchCompetitions();
  }, [])

  return (
    <CompetitionContext.Provider
      value={{
        competitions,
        setCompetitions
      }}
    >
      {children}
    </CompetitionContext.Provider>
  );
}

export default CompetitionContextProvider;
