import { FiTrash2, FiMinus, FiPlus } from "react-icons/fi";
import type { CartItem } from "../types";
import { useCartStore } from "../store/cartStore";

interface CartItemRowProps {
  item: CartItem;
}

export default function CartItemRow({ item }: Readonly<CartItemRowProps>) {
  const updateQty = useCartStore((s) => s.updateQty);
  const removeFromCart = useCartStore((s) => s.removeFromCart);

  const { product, quantity } = item;

  return (
    <div className="py-4 border-b border-gray-100 last:border-0">
      <div className="flex items-start gap-3">
        {/* Image */}
        <div className="flex items-center justify-center bg-gray-50 rounded-lg h-20 w-20 shrink-0 p-2">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain"
          />
        </div>

        {/* Name + category */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-800 line-clamp-2">
            {product.title}
          </p>
          <span className="text-xs text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full mt-1 inline-block capitalize">
            {product.category}
          </span>
        </div>

        {/* Delete button */}
        <button
          onClick={() => removeFromCart(product.id)}
          className="flex items-center justify-center h-8 w-8 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer shrink-0"
          aria-label="Remove item"
        >
          <FiTrash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="flex items-center justify-between mt-3 pl-23">
        {/* Qty stepper */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => updateQty(product.id, quantity - 1)}
            className="flex items-center justify-center h-7 w-7 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Decrease quantity"
          >
            <FiMinus className="h-3 w-3" />
          </button>
          <span className="w-8 text-center text-sm font-medium text-gray-800">
            {quantity}
          </span>
          <button
            onClick={() => updateQty(product.id, quantity + 1)}
            className="flex items-center justify-center h-7 w-7 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Increase quantity"
          >
            <FiPlus className="h-3 w-3" />
          </button>
        </div>

        {/* Line total */}
        <span className="text-sm font-bold text-gray-900">
          ${(product.price * quantity).toFixed(2)}
        </span>
      </div>
    </div>
  );
}
