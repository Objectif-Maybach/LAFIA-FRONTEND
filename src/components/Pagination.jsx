import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
}) => {
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-1 rounded-md border ${
            i === currentPage
              ? 'bg-orange-500 text-white'
              : 'bg-white hover:bg-gray-100'
          }`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="px-4 py-3 border-t flex flex-col md:flex-row md:items-center md:justify-between gap-2">
      <div className="flex items-center space-x-2 text-sm text-gray-700">
        <span>Afficher</span>
        <select
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
          className="border rounded-md px-2 py-1"
        >
          {[50, 100, 200, 500, 1000].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <span>par page</span>
      </div>

      <div className="text-sm text-gray-700">
        Page <span className="font-semibold">{currentPage}</span> sur{' '}
        <span className="font-semibold">{totalPages}</span>
      </div>

      <div className="flex space-x-2 items-center">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-md border disabled:opacity-50"
        >
          <ChevronLeft size={18} />
        </button>

        {renderPageNumbers()}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-md border disabled:opacity-50"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
