import axios from "axios";
import { baseURL } from "@constants/apiUrls";

const baseHeaders = {
  Accept: "application/vnd.github+json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
};

const API = axios.create({ baseURL: baseURL, headers: baseHeaders });

export default API;
