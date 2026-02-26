import { Link, Navigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import SignupForm from "../components/SignupForm";

export default function SignupPage() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (isAuthenticated) return <Navigate to="/" replace />;

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Create an account</h1>
          <p className="mt-1 text-sm text-gray-500">
            Join to start shopping and manage products.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8">
          <SignupForm />
        </div>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-red-600 font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
