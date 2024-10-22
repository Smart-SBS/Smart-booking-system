/* eslint-disable react/prop-types */
import { useState, useMemo, useEffect, useCallback } from 'react';
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table';
import { Link, useNavigate } from 'react-router-dom';
import ExportButtons from '../../ExportButtons/ExportButtons';
import Modal from '../../StatusModal/Modal';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import UserActivation from '../../UserActivation/UserActivation';
import DeleteModal from "../../DeleteModal/DeleteModal";

const ClientsList = () => {
    // Navigate function
    const navigate = useNavigate();

    // Access token
    const token = localStorage.getItem("jwtToken");

    // API URLs
    const APP_URL = import.meta.env.VITE_API_URL || '/api';
    const Img_url = import.meta.env.VITE_IMG_URL;

    // State initialization
    const [pageSize, setPageSize] = useState(10);
    const [clientsData, setClientsData] = useState([]);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [isUserActivationModalOpen, setIsUserActivationModalOpen] = useState(false);
    const [recordToUpdate, setRecordToUpdate] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Handle edit page navigation
    const handleEdit = useCallback(async (firstname, id) => {
        navigate(`/admin/user/edit-user/${firstname}/${id}`);
    }, [navigate]);

    // Fetch user data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${APP_URL}/api/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json;"
                    }
                });
                const result = response.data;
                setClientsData(result.users || []);
            } catch (error) {
                if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                    // If the message is an object, extract all error messages
                    const errorMessages = Object.values(error.response.data.message).join(', ');
                    toast.error(`Error fetching user data: ${errorMessages}`);
                    setClientsData([]);
                } else {
                    // If it's a string or any other case, use the original approach
                    toast.error(`Error fetching user data: ${error.response?.data?.message || error.message}`);
                    setClientsData([]);
                }
            }
        };

        fetchData();
    }, [APP_URL, token]);

    // Handle delete callback
    const handleDelete = useCallback((firstname, id) => {
        setUserToDelete({ firstname, id });
        setIsDeleteModalOpen(true);
    }, []);

    // Handle delete functionality
    const handleConfirmDelete = async () => {
        if (userToDelete) {
            setIsDeleting(true);
            try {
                const response = await axios.delete(`${APP_URL}/api/delete-user/${userToDelete.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json;"
                    }
                });
                setClientsData(prevData => prevData.filter(user => user.id !== userToDelete.id));
                toast.success(response.data.message);
            } catch (error) {
                if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                    // If the message is an object, extract all error messages
                    const errorMessages = Object.values(error.response.data.message).join(', ');
                    toast.error(`Error deleting user: ${errorMessages}`);
                } else {
                    // If it's a string or any other case, use the original approach
                    toast.error(`Error deleting user: ${error.response?.data?.message || error.message}`);
                }
            } finally {
                setIsDeleting(false);
                setIsDeleteModalOpen(false);
                setUserToDelete(null);
            }
        }
    };

    // Handle status click callback
    const handleStatusClick = useCallback((record) => {
        setRecordToUpdate(record);
        setIsStatusModalOpen(true);
    }, []);

    // Handle status change functionality
    const handleConfirmStatus = async (id) => {
        try {
            const response = await axios.put(`${APP_URL}/api/update-user-status/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            if (response.status === 200) {
                setClientsData(prevData => prevData.map(user =>
                    user.id === id ? { ...user, status: user.status === '1' ? '0' : '1' } : user
                ));
                toast.success(response.data.message);
            } else {
                setClientsData([])
            }
            setIsStatusModalOpen(false);
        } catch (error) {
            if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                // If the message is an object, extract all error messages
                const errorMessages = Object.values(error.response.data.message).join(', ');
                toast.error(`Error updating user status: ${errorMessages}`);
            } else {
                // If it's a string or any other case, use the original approach
                toast.error(`Error updating user status: ${error.response?.data?.message || error.message}`);
            }
        }
    };

    // Handle user activation callback
    const handleUserActivationClick = useCallback((record) => {
        setRecordToUpdate(record);
        setIsUserActivationModalOpen(true);
    }, []);

    // Handle user activation functionality
    const handleUserActivationConfirm = async () => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams()
            params.append('email', recordToUpdate.email)
            const response = await axios.post(`${APP_URL}/api/SendActivationToken`, params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });
            toast.success(response.data.message);
        } catch (error) {
            const errorMessage = error.response?.data?.message;
            const errorMessages = typeof errorMessage === 'object'
                ? Object.values(errorMessage).join(', ')
                : errorMessage || error.message;
            toast.error(`Error sending activation mail: ${errorMessages}`);
        } finally {
            setIsLoading(false);
            setIsUserActivationModalOpen(false);
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
            Header: 'NAME',
            id: 'fullName',
            accessor: row => `${row.firstname} ${row.lastname}`,
            Cell: ({ row }) => (
                <div className='d-flex align-items-center'>
                    <img
                        src={row.original.profile ? `${Img_url}/profile/list/${row.original.profile}` : `${Img_url}/default/list/user.webp`}
                        alt={row.original.firstname || "User profile"}
                        className="me-2 avatar rounded-circle lg"
                        onError={(e) => { e.target.src = `${Img_url}/default/list/user.webp`; }}
                    />
                    <div className='d-flex flex-column'>
                        {row.original.firstname} {row.original.lastname}
                    </div>
                </div>
            )
        },
        { Header: 'EMAIL', accessor: 'email' },
        { Header: 'CONTACT', accessor: 'contact_no' },
        {
            Header: 'ROLE',
            accessor: 'role',
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
                        color: '#fff',
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
            accessor: "activated",
            Cell: ({ row, value }) => (
                <div>
                    <button type="button" onClick={() => handleEdit(row.original.firstname, row.original.id)} className="btn text-info px-2 me-1">
                        <i className="bi bi-pencil"></i>
                    </button>
                    <button type="button" onClick={() => handleDelete(row.original.firstname, row.original.id)} className="btn text-danger px-2">
                        <i className="fa fa-trash"></i>
                    </button>
                    {value === '0' ?
                        <button className='btn btn-sm'
                            onClick={() => handleUserActivationClick(row.original)}
                        >
                            <i className="bi bi-shield-lock"></i>
                        </button> : ''
                    }
                </div>
            ),
        },
    ], [Img_url, handleStatusClick, handleEdit, handleDelete, handleUserActivationClick]);

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
            data: clientsData,
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
                    <h4 className="title-font mb-3"><strong>Users List</strong></h4>

                    <div className="mb-3">
                        <Link className='btn btn-primary' to="/admin/user/add-user">Add New User</Link>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <ExportButtons data={clientsData} />
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

                    {recordToUpdate && (
                        <Modal
                            isOpen={isStatusModalOpen}
                            onClose={() => setIsStatusModalOpen(false)}
                            onConfirm={() => handleConfirmStatus(recordToUpdate.id)}
                            message={`Are you sure you want to ${recordToUpdate?.status === '1' ? 'deactivate' : 'activate'} user ${recordToUpdate.firstname}?`}
                            status={recordToUpdate?.status}
                        />
                    )}

                    {recordToUpdate && (
                        <UserActivation
                            isOpen={isUserActivationModalOpen}
                            onClose={() => setIsUserActivationModalOpen(false)}
                            onConfirm={handleUserActivationConfirm}
                            message={`Are you sure you want to resend the activation link to ${recordToUpdate.email}?`}
                            isLoading={isLoading}
                        />
                    )}

                    {userToDelete && (
                        <DeleteModal
                            isOpen={isDeleteModalOpen}
                            onClose={() => setIsDeleteModalOpen(false)}
                            onConfirm={handleConfirmDelete}
                            message={`Are you sure you want to delete user ${userToDelete.firstname}?`}
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
                            {page.map(row => {
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
                            })}
                        </tbody>
                    </table>

                    <div className="d-flex justify-content-between align-items-center pt-4">
                        <div>
                            Showing {page.length === 0 ? 0 : pageIndex * pageSize + 1} to{' '}
                            {pageIndex * pageSize + page.length} of {clientsData.length} entries
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
};

export default ClientsList;
