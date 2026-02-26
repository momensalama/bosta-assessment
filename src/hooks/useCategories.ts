import { useState, useEffect } from "react";
import { getCategories } from "../api/products";

interface UseCategoriesResult {
  categories: string[];
  loading: boolean;
  error: string | null;
}

export function useCategories(): UseCategoriesResult {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const categories = await getCategories();
        setCategories(categories);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to load categories.",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return { categories, loading, error };
}
