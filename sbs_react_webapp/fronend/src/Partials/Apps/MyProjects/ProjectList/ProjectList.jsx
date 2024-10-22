import React, { useState } from 'react';
// import { useTable, useFilters, useGlobalFilter, usePagination, useSortBy } from 'react-table';
import { TableList } from './Components/ProjectListData';

import DataTable from '../../../../Common/DataTable/DataTable';

const ProjectList = () => {
  const [pageSize, setPageSize] = useState(10); // Default page size
  const [globalFilter, setGlobalFilter] = useState('');
  const sizeOptions = [10, 25, 50, 100]; // Available size options

  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setPageSize(newSize);
  };
    const columns = [
        {
          Header: 'Project Name',
          accessor: 'projectName',
        },
        {
          Header: 'Assign',
          accessor: 'assign',
        },
        {
          Header: 'Start Date',
          accessor: 'startDate',
        },
        {
          Header: 'Deadline',
          accessor: 'deadline',
        },
        {
          Header: 'Task',
          accessor: 'task',
        },
        {
          Header: 'Progress',
          accessor: 'progress',
        },
        {
          Header: 'Status',
          accessor: 'status',
        },
        {
          Header: 'Action',
          accessor: 'action',
        },
      ];

    let dataT = TableList.map((data, index) => {
      return {
        projectName: (<a key={index} href="/app/project-details">{data.project_name}</a>),
        assign: (
          <>
            <div className="avatar-list avatar-list-stacked d-flex ps-2">
            {data.assign.map((img, index) => {
              return (
              <img key={index} className="avatar sm rounded-circle" src={img} data-bs-toggle="tooltip" title="Avatar" alt={`Avatar ${index}`} />
              )})}
            </div>
          </>
        ),
        startDate: data.start_date,
        deadline: data.deadline,
        task: data.task,
        progress: (
          <>
            <small className="text-muted">{data.valuenow} / {data.valuemax}</small>
            <div className="progress" style={{height: "2px"}}>
                <div className="progress-bar bg-primary" role="progressbar" style={{width: `${data.valuenow}%`}} aria-valuenow={data.valuenow} aria-valuemin="0" aria-valuemax={data.valuemax}></div>
            </div>
          </>
        ),
        status: (<span className={`badge ${data.status_c}`}>{data.status}</span>),
        // action: (
        //   <>
        //     {/* {{> widgets/card-ellipsis }} */}
        //   </>
        // ),
      };
    });

    // const tableInstance = useTable(
    //   {
    //     columns,
    //     data: dataT,
    //     initialState: { pageIndex: 0, pageSize: 10 }, // Initial pagination settings
    //   },
    //   useFilters, // Enables filtering
    //   useGlobalFilter, // Enables global search
    //   useSortBy, // Enables sorting
    //   usePagination // Enables pagination
    // );
  
    // const {
    //   state,
    //   // setGlobalFilter,
    //   // setPageSize,
    // } = tableInstance;
  
    // const { pageIndex } = state;

  return (
      <div className="px-4 py-3 page-body">
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
      </div>
    )
}

export default ProjectList