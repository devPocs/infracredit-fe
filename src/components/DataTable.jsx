import { useState } from "react";
import PropTypes from "prop-types";

const DataTable = ({ data, onRowDoubleClick, rowsPerPage = 10 }) => {
  const columns =
    data.length > 0
      ? Object.keys(data[0]).map((key) => ({
          header: key.charAt(0).toUpperCase() + key.slice(1),
          accessor: key,
        }))
      : [];

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const currentData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="w-full rounded-md bg-white p-2 shadow-lg sm:p-4">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-grey">
              <thead>
                <tr>
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      className="whitespace-nowrap bg-navy px-2 py-2 text-left text-xs font-medium text-white sm:px-4 sm:text-sm lg:text-base"
                    >
                      {column.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentData.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    onDoubleClick={() => onRowDoubleClick(row)}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    {columns.map((column, colIndex) => (
                      <td
                        key={colIndex}
                        className="whitespace-nowrap px-2 py-2 text-xs text-gray-700 sm:px-4 sm:text-sm lg:text-base"
                      >
                        {row[column.accessor]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center justify-between gap-2 sm:flex-row">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="w-full rounded bg-gray-200 px-3 py-1.5 text-xs text-gray-800 disabled:opacity-50 sm:w-auto sm:px-4 sm:py-2 sm:text-sm"
        >
          Previous
        </button>
        <span className="text-xs text-gray-700 sm:text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="w-full rounded bg-gray-200 px-3 py-1.5 text-xs text-gray-800 disabled:opacity-50 sm:w-auto sm:px-4 sm:py-2 sm:text-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
};

DataTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRowDoubleClick: PropTypes.func,
  rowsPerPage: PropTypes.number,
};

export default DataTable;
