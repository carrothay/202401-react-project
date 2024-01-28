import axios from "axios";

const baseURL = "https://api.stb.gov.sg/media/download/v2";

const headers = {
  "Content-Type": "application/json",
  "X-API-Key": process.env.REACT_APP_STB_API_KEY,
};

const mediaApi = axios.create({
  baseURL,
  headers,
});

export default mediaApi;
