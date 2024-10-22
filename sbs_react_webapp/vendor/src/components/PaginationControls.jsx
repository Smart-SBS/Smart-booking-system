/* eslint-disable react/prop-types */

const PaginationControls = ({ currentPage, totalPages, paginate }) => (
    <div className="flex justify-center mt-6">
        <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`mx-1 px-3 py-1 border rounded ${currentPage === 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-white text-[#fa2964e6]'
                }`}
        >
            Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
                key={number}
                onClick={() => paginate(number)}
                className={`mx-1 px-3 py-1 border rounded ${currentPage === number
                    ? 'bg-[#fa2964e6] text-white'
                    : 'bg-white text-[#fa2964e6]'
                    }`}
            >
                {number}
            </button>
        ))}

        <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`mx-1 px-3 py-1 border rounded ${currentPage === totalPages
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-white text-[#fa2964e6]'
                }`}
        >
            Next
        </button>
    </div>
);

export default PaginationControls;