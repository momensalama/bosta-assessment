import { useNavigate } from "react-router";
import { FiShoppingCart } from "react-icons/fi";
import { useCartStore } from "../store/cartStore";
import CartItemRow from "../components/CartItemRow";
import CartSummary from "../components/CartSummary";
import Button from "../components/ui/Button";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
        <FiShoppingCart className="h-16 w-16 text-gray-300" />
        <h2 className="text-xl font-bold text-gray-700">Your cart is empty</h2>
        <p className="text-gray-500 text-sm">
          Browse our products and add something you like.
        </p>
        <Button onClick={() => navigate("/")}>Browse Products</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Cart items */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm px-6 py-2">
          {items.map((item) => (
            <CartItemRow key={item.product.id} item={item} />
          ))}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
