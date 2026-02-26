import type { SortOption } from '../utils/productSort';
import { SORT_OPTIONS } from '../utils/productSort';

const selectClassName =
  'self-start sm:self-auto border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer';

type ProductSortSelectProps = Readonly<{
  value: SortOption;
  onChange: (value: SortOption) => void;
}>;

export default function ProductSortSelect({ value, onChange }: ProductSortSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
      className={selectClassName}
    >
      {SORT_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
