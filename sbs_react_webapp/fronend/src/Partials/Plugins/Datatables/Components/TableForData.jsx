import React, { useState } from 'react'
// import { useTable, useFilters, useGlobalFilter, usePagination, useSortBy } from 'react-table';

import { TableData } from './MyTableData';
import DataTable from '../../../../Common/DataTable/DataTable';

const TableForData = () => {
  const [pageSize, setPageSize] = useState(10); // Default page size
  const [globalFilter, setGlobalFilter] = useState('');
  const sizeOptions = [10, 25, 50, 100]; // Available size options

  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setPageSize(newSize);
  };

  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Position',
      accessor: 'position',
    },
    {
      Header: 'Office',
      accessor: 'office',
    },
    {
      Header: 'Age',
      accessor: 'age',
    },
    {
      Header: 'Start date',
      accessor: 'startdate',
    },
    {
      Header: 'Salary',
      accessor: 'salary',
    },
  ];

  const dataT = TableData.map((data) => {
    return {
      name: data.name,
      position: data.position,
      office: data.office,
      age: data.age,
      startdate: data.startdate,
      salary: data.salary,
    };
  });

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="d-flex align-items-center">
          Show{' '}
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="form-select form-select-sm ms-2"
          >
            {sizeOptions.map((size, index) => (
              <option key={index} value={size}>
                {size}
              </option>
            ))}
          </select>
          &nbsp;entries
        </div>
        <div className="d-flex align-items-center">
          <span className="me-2">Search:</span>
          <input
            value={globalFilter || ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="form-control form-control-sm"
          />
        </div>
      </div>

      <DataTable columns={columns} data={dataT} />

      <div className="d-flex justify-content-between align-items-center">
        <div>
          Showing 1 to{' '} 10 of {dataT.length} entries
        </div>
        <div className="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate">
          <ul className="pagination">
            <li className="paginate_button page-item previous disabled" id="DataTables_Table_0_previous">
              <a href="#" aria-controls="DataTables_Table_0" data-dt-idx="0" tabIndex="0" className="page-link">Previous</a>
            </li>
            <li className="paginate_button page-item active">
              <a href="#" aria-controls="DataTables_Table_0" data-dt-idx="1" tabIndex="0" className="page-link">1</a>
            </li>
            <li className="paginate_button page-item next disabled" id="DataTables_Table_0_next">
              <a href="#" aria-controls="DataTables_Table_0" data-dt-idx="2" tabIndex="0" className="page-link">Next</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default TableForData