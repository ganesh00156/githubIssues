import React from "react";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const maxButtons = 5;
  let startButton = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let endButton = Math.min(startButton + maxButtons - 1, totalPages);
  startButton = Math.max(1, endButton - maxButtons + 1);

  return (
    <div className="flex justify-center mt-4">
      <button
        className="bg-transparent hover:bg-blue-400 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"<<"}
      </button>
      {Array.from(
        { length: endButton - startButton + 1 },
        (_, index) => startButton + index
      ).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          disabled={currentPage === page}
          className={`mx-1 ${
            currentPage === page
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-transparent hover:bg-blue-400 hover:text-white text-blue-700"
          } font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded`}
        >
          {page}
        </button>
      ))}

      <button
        className="bg-transparent hover:bg-blue-400 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {">>"}
      </button>
    </div>
  );
};

export default Pagination;
