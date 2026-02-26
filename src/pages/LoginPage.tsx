import { Navigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (isAuthenticated) return <Navigate to="/" replace />;

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="mt-1 text-sm text-gray-500">
            Sign in to access your cart and create products.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8">
          <LoginForm />
        </div>

        <p className="text-center text-xs text-gray-400">
          Test credentials: <div className="font-mono"> username: mor_2314</div>
          <div className="font-mono"> password: 83r5^_</div>
        </p>
      </div>
    </div>
  );
}
