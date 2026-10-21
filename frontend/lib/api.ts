import { API_URL } from "./config";

export const authFetch = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const user = JSON.parse(
    sessionStorage.getItem("gn-user") || "{}"
  );

  const token = user.token;

  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      Authorization: token
        ? `Bearer ${token}`
        : "",
      ...(options.headers || {}),
    },
  });
};