import { Link, NavLink } from "react-router";
import { FiShoppingCart, FiLogOut, FiUser } from "react-icons/fi";
import { useCartStore } from "../../store/cartStore";
import { useAuthStore } from "../../store/authStore";

export default function Header() {
  const cartCount = useCartStore((s) => s.cartCount);
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-red-600">bosta</span>
          <span className="hidden sm:block text-sm text-gray-500 font-medium">
            store
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "text-red-600 bg-red-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`
            }
          >
            Products
          </NavLink>

          {isAuthenticated && (
            <NavLink
              to="/create"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "text-red-600 bg-red-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`
              }
            >
              Create
            </NavLink>
          )}

          {/* Cart */}
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "text-red-600 bg-red-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`
            }
          >
            <FiShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </NavLink>

          {/* Auth */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2 ml-2 pl-2 border-l border-gray-200">
              <FiUser className="h-4 w-4 text-gray-500 shrink-0" />
              <span className="hidden sm:block text-sm text-gray-700 font-medium">
                {user?.name.firstname}
              </span>
              <button
                onClick={logout}
                title="Logout"
                className="flex items-center gap-1 px-2 py-1.5 rounded-md text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <FiLogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ml-2 ${
                  isActive
                    ? "text-red-600 bg-red-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`
              }
            >
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
