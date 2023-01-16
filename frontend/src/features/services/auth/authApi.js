import axios from "axios";

export const authApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`
});
