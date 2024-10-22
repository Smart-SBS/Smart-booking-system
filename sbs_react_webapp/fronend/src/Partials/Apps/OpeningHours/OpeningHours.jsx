/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState, useMemo, useEffect, useCallback } from 'react';
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table';
import { Link, useParams } from 'react-router-dom';
import ExportButtons from '../ExportButtons/ExportButtons';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import formatTimeTo12Hour from '../formatTimeTo12Hour';
import Modal from '../StatusModal/Modal'
import LoadingFallback from '../LoadingFallback/LoadingFallback';

const OpeningHours = () => {
    // Access token
    const token = localStorage.getItem("jwtToken");

    // API URL and Image URL
    const API_URL = import.meta.env.VITE_API_URL

    // Shop details from params
    const { shopId, shopName } = useParams()

    // State initialization
    const [pageSize, setPageSize] = useState(10);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [recordToUpdate, setRecordToUpdate] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState(null);

    // Fetch opening and closing hours data
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${API_URL}/api/openhours/${shopId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                if (response.status === 200) {
                    setData(response.data.OpenHours);
                } else if (response.status === 204) {
                    setError(true);
                }
            } catch (error) {
                if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                    const errorMessages = Object.values(error.response.data.message).join(', ');
                    setError(errorMessages);
                    console.error(`Error fetching vendor OpenHours data: ${errorMessages}`);
                } else {
                    setError(error.response?.data?.message || error.message);
                    console.error(`Error fetching vendor OpenHours data: ${error.response?.data?.message || error.message}`);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [API_URL, shopId, token]);

    // Handle status click callback
    const handleStatusClick = useCallback((record) => {
        setRecordToUpdate(record);
        setIsModalOpen(true);
    }, []);

    // Handle status change functionality
    const handleConfirm = useCallback(async () => {
        if (recordToUpdate) {
            setIsUpdating(true);
            try {
                const newStatus = recordToUpdate.status === '1' ? '0' : '1';
                const response = await axios.put(`${API_URL}/api/updateopenhoursstatus/${recordToUpdate.id}`,
                    { status: newStatus },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    }
                );
                setData(prevData =>
                    prevData.map(item =>
                        item.id === recordToUpdate.id ? { ...item, status: newStatus } : item
                    )
                );

                toast.success(response.data.message || "Status updated successfully");
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to update status");
            } finally {
                setIsUpdating(false);
            }
        }
        setIsModalOpen(false);
    }, [recordToUpdate, API_URL, token]);

    // Handle close modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Table configuration
    const columns = useMemo(
        () => [
            {
                Header: 'SR NO',
                accessor: 'serialNumber',
                Cell: ({ row }) => <div>{row.index + 1}</div>
            },
            {
                Header: 'Day',
                accessor: 'day_name',
            },
            {
                Header: 'Start Hour',
                accessor: 'start_time',
                Cell: ({ row }) => (
                    <div>
                        {row.original.start_time === "00:00:00"
                            ? <span className='text-danger'>Closed</span>
                            : formatTimeTo12Hour(row.original.start_time)}
                    </div>
                )
            },
            {
                Header: 'End Hour',
                accessor: 'end_time',
                Cell: ({ row }) => (
                    <div>
                        {row.original.end_time === "00:00:00"
                            ? <span className='text-danger'>Closed</span>
                            : formatTimeTo12Hour(row.original.end_time)}
                    </div>
                )
            },
            {
                Header: 'STATUS',
                accessor: 'status',
                Cell: ({ value, row }) => (
                    <button
                        onClick={() => handleStatusClick(row.original)}
                        className={`btn btn-sm ${value === '1' ? 'btn-success' : 'btn-danger'}`}
                        style={{
                            backgroundColor: value === '1' ? '#28a745' : '#dc3545',
                            borderColor: value === '1' ? '#28a745' : '#dc3545',
                            color: '#ffffff',
                            width: '70px',
                            height: '35px'
                        }}
                    >
                        {value === '1' ? 'Active' : 'Inactive'}
                    </button>
                ),
            },
        ],
        [handleStatusClick]
    );

    // Use the useTable hook to build the table
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        gotoPage,
        nextPage,
        previousPage,
        setGlobalFilter,
        setPageSize: setTablePageSize,
        state: { pageIndex, globalFilter },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize },
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    // Handle search function
    const handleGlobalFilterChange = e => {
        setGlobalFilter(e.target.value || undefined);
    };

    // Handle page size change function
    const handlePageSizeChange = e => {
        const newPageSize = Number(e.target.value);
        setPageSize(newPageSize);
        setTablePageSize(newPageSize);
    };

    // Handle page numbers for pagination
    const getPageNumbers = () => {
        const totalPages = pageOptions.length;
        const currentPage = pageIndex + 1;
        const pageNumbers = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 5; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pageNumbers.push(1);
                pageNumbers.push('...');
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    pageNumbers.push(i);
                }
            } else {
                pageNumbers.push(1);
                pageNumbers.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            }
        }

        return pageNumbers;
    };

    if (isLoading) return <LoadingFallback />;

    return (
        <div className="px-4 py-3 page-body">
            <Toaster />
            <div className="col-lg-12 col-md-12">
                <div className="card mb-3 p-3">
                    <div className='table-responsive'>
                        <h4 className="title-font mb-3"><strong>{shopName}'s Opening Hours</strong></h4>

                        <div className='d-flex justify-content-start align-items-center mb-4 gap-2'>
                            <Link
                                to={`/admin/shop/${data.length > 0 ? 'editOpeningHours' : 'addOpeningHours'}/${shopName}/${shopId}`}
                                className='btn btn-primary'>
                                {data.length > 0 ? 'Edit Hours' : 'Add Hours'}
                            </Link>
                            <Link to='/admin/shops' className='btn btn-info text-white text-decoration-none'>Back</Link>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <ExportButtons data={data} />
                            <div className="d-flex align-items-center">
                                <div className="me-2">
                                    <input
                                        value={globalFilter || ''}
                                        onChange={handleGlobalFilterChange}
                                        className="form-control"
                                        placeholder="Search..."
                                    />
                                </div>
                                <div className="d-flex align-items-center">
                                    Show
                                    <select
                                        value={pageSize}
                                        onChange={handlePageSizeChange}
                                        className="form-select mx-2"
                                        style={{ width: 'auto' }}
                                    >
                                        {[10, 20, 30, 40, 50].map(size => (
                                            <option key={size} value={size}>
                                                {size}
                                            </option>
                                        ))}
                                    </select>
                                    entries
                                </div>
                            </div>
                        </div>

                        <Modal
                            isOpen={isModalOpen}
                            onClose={handleCloseModal}
                            onConfirm={handleConfirm}
                            isLoading={isUpdating}
                            message={`Are you sure you want to ${recordToUpdate?.status === '1' ? 'deactivate' : 'activate'} business ${recordToUpdate?.business_name}?`}
                        />

                        <table {...getTableProps()} className="myDataTable table table-hover align-middle mb-0" style={{ width: "100%" }}>
                            <thead style={{ verticalAlign: "top" }}>
                                {headerGroups.map(headerGroup => {
                                    const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
                                    return (
                                        <tr key={key} {...restHeaderGroupProps}>
                                            {headerGroup.headers.map(column => {
                                                const { key, ...restHeaderProps } = column.getHeaderProps(column.getSortByToggleProps());
                                                return (
                                                    <th key={key} {...restHeaderProps}>
                                                        {column.render('Header')}
                                                        <span>
                                                            {column.isSorted
                                                                ? column.isSortedDesc
                                                                    ? ' 🔽'
                                                                    : ' 🔼'
                                                                : ''}
                                                        </span>
                                                    </th>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {error ? (
                                    <tr>
                                        <td colSpan={columns.length} className="text-center">
                                            No records found
                                        </td>
                                    </tr>
                                ) : (
                                    page.map(row => {
                                        prepareRow(row);
                                        const { key, ...restRowProps } = row.getRowProps();
                                        return (
                                            <tr key={key} {...restRowProps}>
                                                {row.cells.map(cell => {
                                                    const { key, ...restCellProps } = cell.getCellProps();
                                                    return (
                                                        <td key={key} {...restCellProps}>
                                                            {cell.render('Cell')}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="d-flex justify-content-between align-items-center pt-4">
                        {!error && data.length > 0 && (
                            <>
                                <div>
                                    Showing {page.length === 0 ? 0 : pageIndex * pageSize + 1} to{' '}
                                    {pageIndex * pageSize + page.length} of {data.length} entries
                                </div>
                                <nav aria-label="Page navigation bg-transparent">
                                    <ul className="pagination">
                                        <li className={`page-item previous ${!canPreviousPage ? 'disabled' : ''}`}>
                                            <button onClick={() => previousPage()} disabled={!canPreviousPage} className="page-link">Previous</button>
                                        </li>
                                        {getPageNumbers().map((number, index) => (
                                            <li key={index} className={`page-item ${pageIndex + 1 === number ? 'active' : ''} ${number === '...' ? 'disabled' : ''}`}>
                                                {number === '...' ?
                                                    <span className="page-link">...</span> :
                                                    <button onClick={() => gotoPage(number - 1)} className="page-link">{number}</button>
                                                }
                                            </li>
                                        ))}
                                        <li className={`page-item next ${!canNextPage ? 'disabled' : ''}`}>
                                            <button onClick={() => nextPage()} disabled={!canNextPage} className="page-link">Next</button>
                                        </li>
                                    </ul>
                                </nav>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OpeningHours