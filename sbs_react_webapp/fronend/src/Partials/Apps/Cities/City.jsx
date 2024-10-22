/* eslint-disable react/prop-types */
import { useState, useMemo, useEffect, useCallback } from 'react';
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table';
import { Link, useNavigate } from 'react-router-dom';
import ExportButtons from '../ExportButtons/ExportButtons';
import Modal from '../StatusModal/Modal';
import PopularModal from '../PopularModal/PopularModal';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import DeleteModal from '../DeleteModal/DeleteModal'

const City = () => {
    // Navigation function
    const navigate = useNavigate();

    // Access token
    const token = localStorage.getItem("jwtToken");

    // API URL
    const APP_URL = import.meta.env.VITE_API_URL
    const Img_url = import.meta.env.VITE_IMG_URL

    // State initialization
    const [pageSize, setPageSize] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [recordToUpdate, setRecordToUpdate] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [cityToDelete, setCityToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [CityList, setCityList] = useState([]);
    const [isPopularModalOpen, setIsPopularModalOpen] = useState(false);
    const [recordToUpdatePopular, setRecordToUpdatePopular] = useState(null);
    const [hasError, setHasError] = useState(false);

    // Fetch cities
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${APP_URL}/api/cities`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                if (response.status === 200 && response.data.Cities) {
                    setCityList(response.data.Cities);
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

    // Handle edit
    const handleEdit = (cityName, id) => {
        navigate(`/admin/editCity/${cityName}/${id}`);
    };

    // Handle delete callback
    const handleDelete = useCallback((cityName, id) => {
        setCityToDelete({ cityName, id });
        setIsDeleteModalOpen(true);
    }, []);

    // Handle delete functionality
    const handleConfirmDelete = async () => {
        if (cityToDelete) {
            setIsDeleting(true);
            try {
                const response = await axios.delete(`${APP_URL}/api/delete-city/${cityToDelete.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json;"
                    }
                });
                setCityList(prevData => prevData.filter(city => city.id !== cityToDelete.id));
                toast.success(response.data.message);
            } catch (error) {
                toast.error(error.response?.data?.message || "An error occurred while deleting the city");
            } finally {
                setIsDeleting(false);
                setIsDeleteModalOpen(false);
                setCityToDelete(null);
            }
        }
    };

    // Handle status click callback
    const handleStatusClick = useCallback((city) => {
        setRecordToUpdate(city);
        setIsModalOpen(true);
    }, []);

    // Handle status change functionality
    const handleConfirm = async () => {
        if (!recordToUpdate) return;

        try {
            const newStatus = recordToUpdate.status === '1' ? '0' : '1';
            const response = await axios.put(`${APP_URL}/api/update-city-status/${recordToUpdate.id}`, { status: newStatus }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            if (response.status === 200) {
                setCityList(prevData => prevData.map(city =>
                    city.id === recordToUpdate.id ? { ...city, status: newStatus } : city
                ));
                toast.success(response.data.message || "City status updated successfully");
            } else {
                toast.error("Failed to update city status");
            }
            setIsModalOpen(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred while updating city status");
        }
    };

    const handlePopularClick = useCallback((city) => {
        setRecordToUpdatePopular(city);
        setIsPopularModalOpen(true);
    }, []);

    const handleConfirmPopular = async () => {
        if (!recordToUpdatePopular) return;

        try {
            const newPopularStatus = recordToUpdatePopular.is_popular === '1' ? '0' : '1';
            const response = await axios.put(`${APP_URL}/api/update-city-is-popular/${recordToUpdatePopular.id}`, { is_popular: newPopularStatus }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            if (response.status === 200) {
                setCityList(prevData => prevData.map(city =>
                    city.id === recordToUpdatePopular.id ? { ...city, is_popular: newPopularStatus } : city
                ));
                toast.success(response.data.message || "City popular status updated successfully");
            } else {
                toast.error("Failed to update city popular status");
            }
            setIsPopularModalOpen(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred while updating city popular status");
        }
    };

    // Table configuration
    const columns = useMemo(() => [
        {
            Header: 'SR. NO.',
            id: 'serialNumber',
            Cell: ({ row }) => {
                return <span>{row.index + 1}</span>;
            }
        },
        {
            Header: 'City',
            accessor: 'city_name',
            Cell: ({ row }) => (
                <div className="d-flex align-items-center">
                    <img
                        src={row.original.city_image ? `${Img_url}/city-images/list/${row.original.city_image}` : `${Img_url}/default/list/city.webp`}
                        alt={row.original.city_name || "City Image"}
                        className="me-2 avatar rounded-circle lg"
                        onError={(e) => { e.target.src = `${Img_url}/default/list/city.webp`; }}
                    />
                    <div className='d-flex flex-column'>
                        {row.original.city_name}
                    </div>
                </div>
            )
        },
        {
            Header: 'State',
            accessor: 'states_name',
        },
        {
            Header: 'POPULAR',
            accessor: 'is_popular',
            Cell: ({ value, row }) => (
                <button
                    onClick={() => handlePopularClick(row.original)}
                    className={`btn btn-sm ${value === '1' ? 'btn-warning' : 'btn-secondary'}`}
                    style={{
                        backgroundColor: value === '1' ? '#4287f5' : '#f58442',
                        borderColor: value === '1' ? '#4287f5' : '#f58442',
                        color: '#fff',
                        width: '70px',
                        height: '35px'
                    }}
                >
                    {value === '1' ? 'Popular' : 'Regular'}
                </button>
            ),
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
            Header: 'Actions',
            Cell: ({ row }) => (
                <div>
                    <button type="button" onClick={() => handleEdit(row.original.city_name, row.original.id)} className="btn text-info px-2 me-1">
                        <i className="bi bi-pencil"></i>
                    </button>
                    <button type="button" onClick={() => handleDelete(row.original.city_name, row.original.id)} className="btn text-danger px-2">
                        <i className="fa fa-trash"></i>
                    </button>
                </div>
            ),
        },
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
            data: CityList,
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
                    <h3 className="title-font mb-3">City List</h3>

                    <div className="mb-3">
                        <Link className='btn btn-primary' to="/admin/addCity">Add New City</Link>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <ExportButtons data={CityList} />
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
                                    {[10, 20, 30, 40, 50].map(pageSize => (
                                        <option key={pageSize} value={pageSize}>
                                            {pageSize}
                                        </option>
                                    ))}
                                </select>
                                entries
                            </div>
                        </div>
                    </div>

                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onConfirm={handleConfirm}
                        message={`Are you sure you want to ${recordToUpdate?.status === '1' ? 'deactivate' : 'activate'} this city?`}
                        status={recordToUpdate?.status}
                    />

                    <PopularModal
                        isOpen={isPopularModalOpen}
                        onClose={() => setIsPopularModalOpen(false)}
                        onConfirm={handleConfirmPopular}
                        message={`Are you sure you want to mark this city as ${recordToUpdatePopular?.is_popular === '1' ? 'regular' : 'popular'}?`}
                        isLoading={false}
                    />

                    {cityToDelete && (
                        <DeleteModal
                            isOpen={isDeleteModalOpen}
                            onClose={() => setIsDeleteModalOpen(false)}
                            onConfirm={handleConfirmDelete}
                            message={`Are you sure you want to delete city ${cityToDelete.cityName}?`}
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
                            {pageIndex * pageSize + page.length} of {CityList.length} entries
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

export default City;