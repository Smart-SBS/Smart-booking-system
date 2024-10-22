import React, { useState } from 'react'
// import { useTable, useFilters, useGlobalFilter, usePagination, useSortBy } from 'react-table';

import { TableData } from './MyWalletData';
import DataTable from '../../../../Common/DataTable/DataTable';

const WalletTable = () => {
  const [pageSize, setPageSize] = useState(10); // Default page size
  const [globalFilter, setGlobalFilter] = useState('');
  const sizeOptions = [10, 25, 50, 100]; // Available size options

  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setPageSize(newSize);
  };

  const columns = [
    {
      Header: 'Product Description',
      accessor: 'productDescription',
    },
    {
      Header: 'Status',
      accessor: 'status',
    },
    {
      Header: 'Price',
      accessor: 'price',
    },
    {
      Header: 'Order No.',
      accessor: 'orderNo',
    },
    {
      Header: 'Order Total',
      accessor: 'orderTotal',
    },
    {
      Header: 'Action',
      accessor: 'action',
    },
  ];

  const dataT = TableData.map((data) => {
    return {
      productDescription: data.description,
      status: <span className="text-primary">{data.status}</span>,
      price: data.price,
      orderNo: (
        <>
          {data.order_no}
          <div className="small text-muted">{data.time}</div>
        </>
      ),
      orderTotal: data.order_total,
      action: (
        <>
          <button type="button" className="btn btn-link btn-sm text-muted" data-bs-toggle="tooltip" data-bs-placement="top" title="Send Email">
            <i className="fa fa-envelope"></i>
          </button>
          <button type="button" className="btn btn-link btn-sm text-muted" data-bs-toggle="tooltip" data-bs-placement="top" title="Download invoice">
            <i className="fa fa-download"></i>
          </button>
        </>
      ),
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

export default WalletTable