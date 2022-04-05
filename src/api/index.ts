import axios from "axios";
import env from "../utils/env";

const apiInstance = axios.create({
  baseURL: env("API_URL"),
});

// adding interceptors
apiInstance.interceptors.request.use((config) => {
  const authData = JSON.parse(localStorage.getItem("_AUTH_DATA_") || "{}");
  if (config.headers) {
    if (authData.token)
      config.headers.Authorization = `Bearer ${authData.token}`;
    config.headers["accept-language"] = "en";
  }
  return config;
});

export default apiInstance;
