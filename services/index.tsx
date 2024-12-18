import axios from "axios";

const API = axios.create({ baseURL: process.env.API_URL || "http://localhost:8000/api/v1" });

export default API;