import { useNavigate } from "react-router";
import { FiArrowRight } from "react-icons/fi";
import type { Product } from "../types";
import Button from "./ui/Button";
import AddToCartControl from "./ui/AddToCartControl";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: Readonly<ProductCardProps>) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {/* Image */}
      <div className="flex items-center justify-center bg-gray-50 h-52 p-4">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* Category badge */}
        <span className="self-start text-xs font-medium uppercase tracking-wide text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
          {product.category}
        </span>

        {/* Title */}
        <p className="text-sm font-semibold text-gray-800 line-clamp-2 flex-1">
          {product.title}
        </p>

        {/* Price */}
        <span className="text-lg font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </span>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-1">
          <AddToCartControl product={product} size="sm" />
          <Button
            variant="secondary"
            className="flex-1 text-xs gap-1 whitespace-nowrap"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            View Details
            <FiArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
