import { Link, Navigate, useLocation } from "react-router";
import { FiCheckCircle } from "react-icons/fi";
import { useAuthStore } from "../store/authStore";
import LoginForm from "../components/LoginForm";
import { useEffect } from "react";

export default function LoginPage() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const location = useLocation();
  const justRegistered =
    (location.state as { registered?: boolean } | null)?.registered === true;

  useEffect(() => {
    if (justRegistered) {
      globalThis.history.replaceState({}, "");
    }
  }, [justRegistered]);

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

        {justRegistered && (
          <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm space-y-1">
            <div className="flex items-center gap-2 font-medium text-green-700">
              <FiCheckCircle className="h-5 w-5 shrink-0" />
              Account submitted successfully!
            </div>
            <p className="text-xs text-green-600 pl-7">
              This is a demo API. new accounts aren&apos;t persisted. Use the
              test credentials below to sign in.
            </p>
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8">
          <LoginForm />
        </div>

        <p className="text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-red-600 font-medium hover:underline"
          >
            Create one
          </Link>
        </p>

        <p className="text-center text-xs text-gray-400">
          Test credentials:
          <span className="font-mono block">username: mor_2314</span>
          <span className="font-mono block">password: 83r5^_</span>
        </p>
      </div>
    </div>
  );
}
