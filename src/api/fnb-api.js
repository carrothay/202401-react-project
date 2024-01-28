import axios from "axios";

const baseURL = "https://api.stb.gov.sg/content/food-beverages/v2";

const headers = {
  "Content-Type": "application/json",
  "X-API-Key": import.meta.env.STB_API_KEY,
};

const fnbApi = axios.create({
  baseURL,
  headers,
});

export default fnbApi;
