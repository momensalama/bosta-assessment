import type { ReactNode } from "react";
import Header from "./Header";

export default function Layout({ children }: { readonly children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
