import { useNavigate } from "react-router";
import { useCartStore } from "../store/cartStore";
import Button from "./ui/Button";

export default function CartSummary() {
  const { total, cartCount, clearCart } = useCartStore();
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
      <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Items ({cartCount})</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="text-green-600 font-medium">Free</span>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-gray-900">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <Button className="w-full" onClick={() => navigate("/")}>
        Continue Shopping
      </Button>

      <button
        onClick={clearCart}
        className="w-full text-center text-xs text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
      >
        Clear cart
      </button>
    </div>
  );
}
