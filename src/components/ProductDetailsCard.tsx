import type { Product } from '../types';
import StarRating from './StarRating';
import BackToProducts from './BackToProducts';

type ProductDetailsCardProps = Readonly<{
  product: Product;
}>;

export default function ProductDetailsCard({ product }: ProductDetailsCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="flex items-center justify-center bg-gray-50 p-10 min-h-72">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-80 w-full object-contain"
          />
        </div>

        <div className="flex flex-col gap-4 p-8">
          <span className="self-start text-xs font-medium uppercase tracking-wide text-red-600 bg-red-50 px-2.5 py-1 rounded-full">
            {product.category}
          </span>

          <h1 className="text-2xl font-bold text-gray-900 leading-snug">
            {product.title}
          </h1>

          <StarRating
            rate={product.rating.rate}
            count={product.rating.count}
          />

          <p className="text-3xl font-extrabold text-gray-900">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-sm text-gray-600 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-auto pt-4">
            <BackToProducts variant="button" />
          </div>
        </div>
      </div>
    </div>
  );
}
