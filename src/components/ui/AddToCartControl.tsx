import { FiShoppingCart, FiMinus, FiPlus } from "react-icons/fi";
import type { Product } from "../../types";
import { useCartStore } from "../../store/cartStore";
import Button from "./Button";

interface AddToCartControlProps {
  product: Product;
  size?: "sm" | "md";
}

export default function AddToCartControl({
  product,
  size = "md",
}: Readonly<AddToCartControlProps>) {
  const items = useCartStore((s) => s.items);
  const addToCart = useCartStore((s) => s.addToCart);
  const updateQty = useCartStore((s) => s.updateQty);

  const cartItem = items.find((i) => i.product.id === product.id);
  const quantity = cartItem?.quantity ?? 0;

  const btnH = size === "sm" ? "h-7 w-7" : "h-8 w-8";
  const btnText = size === "sm" ? "text-xs" : "text-sm";

  if (quantity === 0) {
    return (
      <Button
        variant="primary"
        className={`gap-1 ${size === "sm" ? "text-xs px-3 py-1.5" : ""}`}
        onClick={() => addToCart(product)}
      >
        <FiShoppingCart className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} />
        Add to Cart
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => updateQty(product.id, quantity - 1)}
        className={`flex items-center justify-center ${btnH} rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer`}
        aria-label="Decrease quantity"
      >
        <FiMinus className="h-3 w-3" />
      </button>
      <span className={`w-8 text-center font-medium text-gray-800 ${btnText}`}>
        {quantity}
      </span>
      <button
        onClick={() => updateQty(product.id, quantity + 1)}
        className={`flex items-center justify-center ${btnH} rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer`}
        aria-label="Increase quantity"
      >
        <FiPlus className="h-3 w-3" />
      </button>
    </div>
  );
}
