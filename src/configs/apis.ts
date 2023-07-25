export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/";

const API_URL = {
  LOGIN: "auth/login",
  REGISTER: "auth/register",
};

export default API_URL;
