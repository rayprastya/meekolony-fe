import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxButtons = 7;
  const halfButtons = Math.floor(maxButtons / 2);

  let startPage = Math.max(1, currentPage - halfButtons);
  let endPage = Math.min(totalPages, currentPage + halfButtons);

  if (currentPage - halfButtons < 1) {
    endPage = Math.min(totalPages, endPage + (halfButtons - (currentPage - 1)));
  }
  if (currentPage + halfButtons > totalPages) {
    startPage = Math.max(1, startPage - (currentPage + halfButtons - totalPages));
  }

  return (
    <div className="pagination flex justify-center space-x-4 mt-6">

      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-4 py-2 rounded-lg font-semibold bg-gray-700 text-gray-300 hover:bg-gray-600"
          >
            First
          </button>
          {startPage > 2 && (
            <span className="px-4 py-2">...</span>
          )}
        </>
      )}

      {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
        <button
          key={startPage + index}
          onClick={() => onPageChange(startPage + index)}
          className={`px-4 py-2 rounded-lg font-semibold ${
            currentPage === startPage + index ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-300'
          }`}
        >
          {startPage + index}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="px-4 py-2">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-4 py-2 rounded-lg font-semibold bg-gray-700 text-gray-300 hover:bg-gray-600"
          >
            Last
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
