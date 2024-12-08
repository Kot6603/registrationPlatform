import axios from "axios";
import { useContext } from "react";

const baseUrl = "http://localhost:3001/api/events";

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

// user functions
const update = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  const response = await request;
  return response.data;
};

export default { getAll, update };
