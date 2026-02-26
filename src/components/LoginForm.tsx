import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { login, getUser, decodeJwtPayload } from "../api/auth";
import { useAuthStore } from "../store/authStore";
import FormField from "./ui/FormField";
import Button from "./ui/Button";
import ErrorMessage from "./ui/ErrorMessage";

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [username, setUsername] = useState("mor_2314");
  const [password, setPassword] = useState("83r5^_");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const from =
    (location.state as { from?: { pathname: string } } | null)?.from
      ?.pathname ?? "/";

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { token } = await login(username, password);
      const { sub } = decodeJwtPayload(token);
      const user = await getUser(sub);
      setAuth(user, token);
      navigate(from, { replace: true });
    } catch {
      setError("Invalid username or password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {error && <ErrorMessage message={error} />}

      <FormField
        type="text"
        label="Username"
        name="username"
        value={username}
        placeholder="Enter your username"
        required
        onChange={(e) => {
          setUsername(e.target.value);
          setError(null);
        }}
      />

      <FormField
        type="password"
        label="Password"
        name="password"
        value={password}
        placeholder="Enter your password"
        required
        onChange={(e) => {
          setPassword(e.target.value);
          setError(null);
        }}
      />

      <Button type="submit" loading={loading} className="w-full">
        {loading ? "Signing in…" : "Sign In"}
      </Button>
    </form>
  );
}
