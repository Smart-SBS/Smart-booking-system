/* eslint-disable react/prop-types */
import { useState, useMemo, useEffect, useCallback } from 'react';
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table';
import { Link, useNavigate } from 'react-router-dom';
import ExportButtons from '../../Apps/ExportButtons/ExportButtons';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Modal from '../../Apps/StatusModal/Modal';
import DeleteModal from "../../Apps/DeleteModal/DeleteModal"

const Tables = () => {
    // Navigation function
    const navigate = useNavigate();

    // Access token
    const token = localStorage.getItem("jwtToken");

    // API URL
    const APP_URL = import.meta.env.VITE_API_URL
    const Img_url = import.meta.env.VITE_IMG_URL

    // State initialization
    const [pageSize, setPageSize] = useState(10);
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [recordToUpdate, setRecordToUpdate] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [businessToDelete, setBusinessToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [hasError, setHasError] = useState(false);

    //fetch business list
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${APP_URL}/api/business`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                if (response.status === 200 && response.data.business) {
                    setData(response.data.business);
                    setHasError(false);
                } else if (response.status === 204) {
                    setHasError(true)
                }
            } catch (error) {
                setHasError(true);
            }
        };

        fetchData();
    }, [APP_URL, token]);

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
                const response = await axios.put(`${APP_URL}/api/update-business-status/${recordToUpdate.id}`,
                    { status: newStatus },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json;"
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
    }, [recordToUpdate, APP_URL, token]);

    // Handle close modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Handle edit page navigation
    const handleEdit = (businessName, id) => {
        navigate(`/admin/editBusiness/${businessName}/${id}`);
    };

    // Handle delete callback
    const handleDelete = useCallback((businessName, id) => {
        setBusinessToDelete({ businessName, id });
        setIsDeleteModalOpen(true);
    }, []);

    // Handle delete functionality
    const handleConfirmDelete = async () => {
        if (businessToDelete) {
            setIsDeleting(true);
            try {
                const response = await axios.delete(`${APP_URL}/api/delete-business/${businessToDelete.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json;"
                    }
                });
                setData(prevData => prevData.filter(business => business.id !== businessToDelete.id));
                toast.success(response.data.message);
            } catch (error) {
                toast.error(error.response?.data?.message || "An error occurred while deleting the business");
            } finally {
                setIsDeleting(false);
                setIsDeleteModalOpen(false);
                setBusinessToDelete(null);
            }
        }
    };

    // Table configuration
    const columns = useMemo(() => [
        {
            Header: 'SR. NO.',
            id: 'serialNumber',
            Cell: ({ row }) => {
                return <div>{row.index + 1}</div>;
            }
        },
        {
            Header: 'BUSINESS',
            accessor: 'business_name',
            Cell: ({ row }) => (
                <div className='d-flex align-items-center'>
                    <img
                        src={row.original.logo ? `${Img_url}/logo/list/${row.original.logo}` : `${Img_url}/default/list/business-logo.webp`}
                        alt={row.original.business_name || "Business logo"}
                        className="me-2 avatar rounded-circle lg"
                        onError={(e) => { e.target.src = `${Img_url}/default/list/business-logo.webp`; }}
                    />
                    <div className='d-flex flex-column'>
                        {row.original.business_name}
                    </div>
                </div>
            )
        },
        {
            Header: 'CONTACT',
            accessor: row => `${row.business_contact} ${row.business_email}`,
            Cell: ({ row }) => (
                < div >
                    <div>{row.original.business_contact}</div>
                    <div>{row.original.business_email}</div>
                </ div>
            )
        },
        {
            Header: 'TYPE',
            accessor: 'business_type'
        },
        {
            Header: 'OWNER',
            accessor: row => `${row.firstname} ${row.lastname}`,
            Cell: ({ row }) => (
                < div >
                    {row.original.firstname} {row.original.lastname}
                </ div>
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
        {
            Header: 'ACTIONS',
            Cell: ({ row }) => (
                <div>
                    <button type="button" onClick={() => handleEdit(row.original.business_name, row.original.id)} className="btn text-info px-2 me-1">
                        <i className="bi bi-pencil"></i>
                    </button>
                    <button type="button" onClick={() => handleDelete(row.original.business_name, row.original.id)} className="btn text-danger px-2">
                        <i className="fa fa-trash"></i>
                    </button>
                </div>
            )
        }
    ], [Img_url, handleDelete, handleStatusClick]);

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

    return (
        <div className="px-4 py-3 page-body">
            <Toaster />
            <div className="col-lg-12 col-md-12">
                <div className="card mb-3 p-3">
                    <h3 className="title-font mb-3">Business List</h3>

                    <div className="mb-3">
                        <Link className='btn btn-primary' to="/admin/addBusiness">Add New Business</Link>
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

                    {businessToDelete && (
                        <DeleteModal
                            isOpen={isDeleteModalOpen}
                            onClose={() => setIsDeleteModalOpen(false)}
                            onConfirm={handleConfirmDelete}
                            message={`Are you sure you want to delete business ${businessToDelete.businessName}?`}
                            isLoading={isDeleting}
                        />
                    )}

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
                            {hasError ? (
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

                    <div className="d-flex justify-content-between align-items-center pt-4">
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tables;