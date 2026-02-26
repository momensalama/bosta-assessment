import { useState } from "react";
import { useNavigate } from "react-router";
import { signUp } from "../api/auth";
import { validateSignup, type SignupErrors } from "../utils/signupValidation";
import type { SignupInput } from "../types";
import FormField from "./ui/FormField";
import Button from "./ui/Button";
import ErrorMessage from "./ui/ErrorMessage";

const EMPTY: SignupInput = { username: "", email: "", password: "" };

export default function SignupForm() {
  const navigate = useNavigate();
  const [values, setValues] = useState<SignupInput>(EMPTY);
  const [errors, setErrors] = useState<SignupErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof SignupErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const fieldErrors = validateSignup(values);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    setSubmitError(null);
    try {
      await signUp(values);
      navigate("/login", { state: { registered: true } });
    } catch {
      setSubmitError("Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {submitError && <ErrorMessage message={submitError} />}

      <FormField
        type="text"
        label="Username"
        name="username"
        value={values.username}
        placeholder="johndoe"
        required
        error={errors.username}
        onChange={handleChange}
      />

      <FormField
        type="text"
        label="Email"
        name="email"
        value={values.email}
        placeholder="john@example.com"
        required
        error={errors.email}
        onChange={handleChange}
      />

      <FormField
        type="password"
        label="Password"
        name="password"
        value={values.password}
        placeholder="Min. 6 characters"
        required
        error={errors.password}
        onChange={handleChange}
      />

      <Button type="submit" loading={loading} className="w-full">
        {loading ? "Creating account…" : "Create Account"}
      </Button>
    </form>
  );
}
