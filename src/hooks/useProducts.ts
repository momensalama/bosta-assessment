import { useState, useEffect, useCallback } from "react";
import { getProducts } from "../api/products";
import type { Product } from "../types";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const products = await getProducts();
      setProducts(products);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to load products. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
}
