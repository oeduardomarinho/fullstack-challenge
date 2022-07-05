import axios from "axios";

const host = process.env.REACT_APP_API_HOST;
const port = process.env.REACT_APP_API_PORT;
const api_version = process.env.REACT_APP_API_VERSION;

console.log(`${host}:${port}/api/${api_version}`)
const api = axios.create({
  baseURL: `${host}:${port}/api/${api_version}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
