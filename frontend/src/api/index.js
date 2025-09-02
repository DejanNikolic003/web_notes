import axios from "axios";
import store from "../reducers/index";
import { refreshToken } from "./auth";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

API.interceptors.request.use(
  (req) => {
    const token = store.getState().auth.data?.token;
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await refreshToken();

        store.dispatch({
          type: "AUTH",
          data: {
            ...store.getState().auth.data,
            token: data.accessToken,
          },
        });

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        return API(originalRequest);
      } catch (error) {
        store.dispatch({ type: "LOGOUT" });
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
