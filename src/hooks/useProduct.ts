import { useState, useEffect, useCallback } from "react";
import { getProductById } from "../api/products";
import type { Product } from "../types";

interface UseProductResult {
  product: Product | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useProduct(id: number): UseProductResult {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const product = await getProductById(id);
      setProduct(product);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to load product. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const refetch = useCallback(() => {
    fetch();
  }, [fetch]);

  return { product, loading, error, refetch };
}
