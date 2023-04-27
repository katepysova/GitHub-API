import axios from "axios";
import { baseURL } from "@constants/apiUrls";

const baseHeaders = {
  Accept: "application/vnd.github+json",
  "Content-Type": "application/json"
};

const API = axios.create({ baseURL: baseURL, headers: baseHeaders });

export default API;
