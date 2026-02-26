import { useParams } from "react-router";
import { useProduct } from "../hooks/useProduct";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorMessage from "../components/ui/ErrorMessage";
import BackToProducts from "../components/BackToProducts";
import ProductDetailsCard from "../components/ProductDetailsCard";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error, refetch } = useProduct(Number(id));

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;
  if (!product) return null;

  return (
    <div className="space-y-6">
      <BackToProducts variant="link" />
      <ProductDetailsCard product={product} />
    </div>
  );
}
