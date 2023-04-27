import axios from "axios";

const baseHeaders = {
  Accept: "application/vnd.github+json",
  "Content-Type": "application/json"
};

const API = axios.create({ headers: baseHeaders });

export default API;
