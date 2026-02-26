import { Routes, Route, Navigate } from "react-router";
import { useAuthStore } from "./store/authStore";
import Layout from "./components/layout/Layout";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CreateProductPage from "./pages/CreateProductPage";
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
        <Route path="/" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateProductPage />
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
