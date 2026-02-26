import { apiFetch } from "./client";
import type { AuthUser } from "../types";

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

export function getUser(id: number): Promise<AuthUser> {
  return apiFetch<AuthUser>(`/users/${id}`);
}

export function decodeJwtPayload(token: string): { sub: number } {
  const payload = token.split(".")[1];
  return JSON.parse(atob(payload)) as { sub: number };
}
