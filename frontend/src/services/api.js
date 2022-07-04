import axios from "axios";

require("dotenv").config();

const host = process.env.APP_HOST;
const port = process.env.APP_PORT;
const api_version = process.env.API_VERSION;

const api = axios.create({
  baseURL: `${host}:${port}/api/${api_version}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
