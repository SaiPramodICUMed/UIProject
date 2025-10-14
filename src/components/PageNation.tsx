import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let startPage = Math.max(2, currentPage - 2);
      let endPage = Math.min(totalPages - 1, currentPage + 2);

      // Adjust when near start
      if (currentPage <= 4) {
        startPage = 2;
        endPage = 5;
      }

      // Adjust when near end
      if (currentPage >= totalPages - 3) {
        startPage = totalPages - 4;
        endPage = totalPages - 1;
      }

      // Always include first page
      pages.push(1);

      // Add left ellipsis if gap exists
      if (startPage > 2) pages.push("...");

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) pages.push(i);

      // ✅ Add right ellipsis if not close to the end
      if (endPage < totalPages - 1) pages.push("...");

      // Always include last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 py-3 bg-gray-50 border-t border-gray-200 flex-wrap">
      {/* Prev Button */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded hover:bg-[#0f59ac] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        « Prev
      </button>

      {/* Desktop Pagination */}
      <div className="hidden sm:flex gap-2">
        {renderPageNumbers().map((page, index) =>
          page === "..." ? (
            <span
              key={`dots-${index}`}
              className="px-3 py-1 text-gray-500 select-none"
            >
              ...
            </span>
          ) : (
            <button
              key={`page-${page}`}
              onClick={() => onPageChange(Number(page))}
              className={`px-3 py-1 border rounded  ${
                currentPage === page
                  ? "bg-[#0f59ac] text-white border-blue-600 font-semibold"
                  : "bg-white text-gray-700 hover:bg-[#0f59ac] hover:text-white"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>

      {/* Mobile Compact View */}
      <div className="flex sm:hidden items-center gap-2 text-sm font-medium">
        <span className="text-gray-600">
          Page <span className="text-[#0f59ac]">{currentPage}</span> /{" "}
          {totalPages}
        </span>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded hover:bg-[#0f59ac] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next »
      </button>
    </div>
  );
};

export default Pagination;
