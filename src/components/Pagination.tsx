import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const navButtonClassName =
  "flex items-center justify-center h-9 w-9 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer";

const pageButtonBase =
  "h-9 w-9 rounded-lg text-sm font-medium transition-colors cursor-pointer";
const pageButtonActive = "bg-red-600 text-white";
const pageButtonInactive =
  "border border-gray-300 text-gray-600 hover:bg-gray-100";

type PaginationProps = Readonly<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}>;

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-1 pt-4">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={navButtonClassName}
        aria-label="Previous page"
      >
        <FiChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`${pageButtonBase} ${
            page === currentPage ? pageButtonActive : pageButtonInactive
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={navButtonClassName}
        aria-label="Next page"
      >
        <FiChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
