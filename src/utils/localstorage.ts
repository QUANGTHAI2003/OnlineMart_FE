export const getAccessToken = () => {
  return localStorage.getItem("accessToken") || null;
};

export const setAccessToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};

export const getLang = () => {
  return localStorage.getItem("lang") || "en";
};
