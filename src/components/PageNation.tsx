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

  return (
    <div className="flex justify-center items-center gap-2 py-3 bg-gray-50 border-t border-gray-200 flex-wrap">
      {/* Prev Button */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded hover:bg-[#0f59ac] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        « Prev
      </button>

      {/* Desktop Pagination */}
      <div className="hidden sm:flex gap-2">
        {[...Array(totalPages)].map((_, index) => {
          const pageNum = index + 1;
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`px-3 py-1 border rounded transition-all duration-150 ${
                currentPage === pageNum
                  ? "bg-[#0f59ac] text-white border-blue-600"
                  : "hover:bg-[0f59ac]}"
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Mobile Compact View */}
      <div className="flex sm:hidden items-center gap-2 text-sm font-medium">
        <span className="text-gray-600">
          Page <span className="text-[#0f59ac]">{currentPage}</span> / {totalPages}
        </span>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded hover:bg-[#0f59ac] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next »
      </button>
    </div>
  );
};

export default Pagination;
