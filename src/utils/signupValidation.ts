import type { SignupInput } from "../types";

export type SignupErrors = Partial<Record<keyof SignupInput, string>>;

export function validateSignup(values: SignupInput): SignupErrors {
  const errors: SignupErrors = {};

  if (!values.username.trim()) errors.username = "Username is required.";

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  return errors;
}
