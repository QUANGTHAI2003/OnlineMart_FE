export const getAccessToken = () => {
  return localStorage.getItem("accessToken") || null;
};

export const setAccessToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};

export const setUser = (user: any): void => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = (): any => {
  const userStr = localStorage.getItem("user");

  return userStr && JSON.parse(userStr);
};

export const deleteToken = (): void => localStorage.removeItem("accessToken");
export const deleteUser = (): void => localStorage.removeItem("user");

// Get language
export const getLang = () => {
  return localStorage.getItem("lang") || "en";
};
