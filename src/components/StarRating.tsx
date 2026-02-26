import { FiStar } from 'react-icons/fi';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

type StarRatingProps = Readonly<{
  rate: number;
  count: number;
}>;

export default function StarRating({ rate, count }: StarRatingProps) {
  const starStates = Array.from({ length: 5 }, (_, i) => {
    const filled = i + 1 <= rate;
    const half = !filled && i + 0.5 < rate;
    return { key: `star-${i}`, filled, half };
  });

  function renderStarIcon(s: { key: string; filled: boolean; half: boolean }) {
    if (s.filled) return <FaStar className="h-4 w-4 text-yellow-400" />;
    if (s.half) return <FaStarHalfAlt className="h-4 w-4 text-yellow-400" />;
    return <FiStar className="h-4 w-4 text-gray-300" />;
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {starStates.map((s) => (
          <span key={s.key}>{renderStarIcon(s)}</span>
        ))}
      </div>
      <span className="text-sm text-gray-500">
        {rate.toFixed(1)} ({count} reviews)
      </span>
    </div>
  );
}
