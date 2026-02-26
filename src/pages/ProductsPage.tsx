import { useState, useEffect, useMemo } from "react";
import { useProducts } from "../hooks/useProducts";
import { sortProducts } from "../utils/productSort";
import type { SortOption } from "../utils/productSort";
import { PRODUCTS_PER_PAGE } from "../constants/products";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorMessage from "../components/ui/ErrorMessage";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import ProductsPageHeader from "../components/ProductsPageHeader";

export default function ProductsPage() {
  const { products, loading, error, refetch } = useProducts();
  const [sort, setSort] = useState<SortOption>("default");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [sort]);

  const sortedProducts = useMemo(
    () => sortProducts(products, sort),
    [products, sort],
  );

  const totalPages = Math.max(
    1,
    Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE),
  );
  const paginatedProducts = useMemo(
    () =>
      sortedProducts.slice(
        (currentPage - 1) * PRODUCTS_PER_PAGE,
        currentPage * PRODUCTS_PER_PAGE,
      ),
    [sortedProducts, currentPage],
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <ProductsPageHeader
        totalCount={sortedProducts.length}
        sort={sort}
        onSortChange={setSort}
      />

      {paginatedProducts.length === 0 ? (
        <div className="py-20 text-center text-gray-500">
          <p className="text-lg font-medium">No products found.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}
