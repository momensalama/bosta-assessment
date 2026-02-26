import type { SortOption } from "../utils/productSort";
import ProductSortSelect from "./ProductSortSelect";

type ProductsPageHeaderProps = Readonly<{
  totalCount: number;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
}>;

function ProductsPageHeader({
  totalCount,
  sort,
  onSortChange,
}: ProductsPageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <h1 className="text-2xl font-bold text-gray-900">
        Products{" "}
        <span className="text-base font-normal text-gray-500">
          ({totalCount})
        </span>
      </h1>
      <ProductSortSelect value={sort} onChange={onSortChange} />
    </div>
  );
}

export default ProductsPageHeader;
