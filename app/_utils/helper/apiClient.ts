// apiClient.ts
import axios from "axios";
import { encrypt, decrypt, generateSignature } from "./crypto";

const apiClient = axios.create({
  baseURL: "https://your-api.com",
});

apiClient.interceptors.request.use((config) => {
  if (config.data) {
    const signature = generateSignature(config.data);

    config.headers["X-Signature"] = signature;
    config.data = {
      payload: encrypt(config.data),
    };
  }

  return config;
});

apiClient.interceptors.response.use((response) => {
  if (response.data?.payload) {
    response.data = decrypt(response.data.payload);
  }
  return response;
});

export default apiClient;