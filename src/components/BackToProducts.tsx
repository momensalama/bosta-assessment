import { useNavigate } from 'react-router';
import { FiArrowLeft } from 'react-icons/fi';
import Button from './ui/Button';

const linkClassName =
  'flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors cursor-pointer';

type BackToProductsProps = Readonly<{
  variant?: 'link' | 'button';
}>;

export default function BackToProducts({ variant = 'link' }: BackToProductsProps) {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  if (variant === 'button') {
    return (
      <Button variant="secondary" onClick={goBack}>
        <FiArrowLeft className="h-4 w-4" />
        Back to Products
      </Button>
    );
  }

  return (
    <button type="button" onClick={goBack} className={linkClassName}>
      <FiArrowLeft className="h-4 w-4" />
      Back to Products
    </button>
  );
}
