import API from ".";

export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);
export const test = () => API.get("/auth/test");
export const refreshToken = () =>
  API.get("/auth/refresh", { withCredentials: true });
export const me = () => API.get("/auth/me");
