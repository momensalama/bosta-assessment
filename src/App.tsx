import { Routes, Route, Navigate } from "react-router";
import { useAuthStore } from "./store/authStore";
import Layout from "./components/layout/Layout";
import type { ReactNode } from "react";

// Placeholder pages for future pages
function ComingSoon({ page }: { readonly page: string }) {
  return (
    <div className="py-20 text-center text-gray-500 text-lg">
      {page} — coming soon
    </div>
  );
}

function ProtectedRoute({ children }: { readonly children: ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ComingSoon page="Product Listing" />} />
        <Route
          path="/products/:id"
          element={<ComingSoon page="Product Details" />}
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <ComingSoon page="Create Product" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <ComingSoon page="Cart" />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<ComingSoon page="Login" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
