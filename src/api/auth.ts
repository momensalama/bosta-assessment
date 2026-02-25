import { apiFetch } from "./client";

interface LoginResponse {
  token: string;
}

export function login(
  username: string,
  password: string,
): Promise<LoginResponse> {
  return apiFetch<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}
