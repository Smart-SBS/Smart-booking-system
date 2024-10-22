/* eslint-disable react/prop-types */
import { useState, useMemo, useEffect, useCallback } from 'react';
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table';
import { Link, useNavigate } from 'react-router-dom';
import ExportButtons from '../ExportButtons/ExportButtons';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import Modal from '../StatusModal/Modal';
import DeleteModal from '../DeleteModal/DeleteModal'

const ShopList = () => {
    // Navigation function
    const navigate = useNavigate();

    // Access token
    const token = localStorage.getItem("jwtToken");

    // API URL
    const APP_URL = import.meta.env.VITE_API_URL
    const Img_url = import.meta.env.VITE_IMG_URL;

    // State initialization
    const [shopData, setShopData] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [shopToDelete, setShopToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [recordToUpdate, setRecordToUpdate] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Fetch shop data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${APP_URL}/api/shops`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                if (response.status === 200 && response.data.shops) {
                    setShopData(response.data.shops);
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

    // Handle Status callback
    const handleStatusClick = useCallback((record) => {
        setRecordToUpdate(record);
        setIsModalOpen(true);
    }, []);

    // Handle status change
    const handleConfirm = useCallback(async () => {
        if (recordToUpdate) {
            setIsUpdating(true);
            try {
                const newStatus = recordToUpdate.status === '1' ? '0' : '1';
                const response = await axios.put(`${APP_URL}/api/updateshopstatus/${recordToUpdate.id}`,
                    { status: newStatus },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json;"
                        }
                    }
                );

                setShopData(prevData =>
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

    // Handle edit page navigation
    const handleEdit = (shopName, id) => {
        navigate(`/admin/editShop/${shopName}/${id}`);
    };

    // Handle gallery page navigation
    const handleGallery = (shopName, id) => {
        navigate(`/admin/shop/gallery/${shopName}/${id}`)
    }

    // Handle catalogue page navigation
    const handleCatalogue = (shopName, id) => {
        navigate(`/admin/shop/catalogue/${shopName}/${id}`)
    }

    // Handle opening hours page navigation
    const handleOpeningHours = (shopName, id) => {
        navigate(`/admin/shop/opening-hours/${shopName}/${id}`)
    }

    // Handle delete callback
    const handleDelete = useCallback((shopName, id) => {
        setShopToDelete({ shopName, id });
        setIsDeleteModalOpen(true);
    }, []);

    // Handle delete functionality
    const handleConfirmDelete = async () => {
        if (shopToDelete) {
            setIsDeleting(true);
            try {
                const response = await axios.delete(`${APP_URL}/api/deleteshop/${shopToDelete.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json;"
                    }
                });
                setShopData(prevData => prevData.filter(shop => shop.id !== shopToDelete.id));
                toast.success(response.data.message);
            } catch (error) {
                if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                    // If the message is an object, extract all error messages
                    const errorMessages = Object.values(error.response.data.message).join(', ');
                    toast.error(`Error deleting shop: ${errorMessages}`);
                } else {
                    // If it's a string or any other case, use the original approach
                    toast.error(`Error deleting shop: ${error.response?.data?.message || error.message}`);
                }
                console.log(error);

            } finally {
                setIsDeleting(false);
                setIsDeleteModalOpen(false);
                setShopToDelete(null);
            }
        }
    };

    // Handle modal close
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Table configuration
    const columns = useMemo(() => [
        {
            Header: 'SHOP NAME',
            accessor: 'shop_name',
            Cell: ({ row }) => (
                <div className='d-flex align-items-center'>
                    <div className='d-flex flex-column'>
                        <span>{row.original.shop_name}</span>
                    </div>
                </div>
            )
        },
        {
            Header: 'BUSINESS NAME',
            accessor: 'business_name',
            Cell: ({ row }) => (
                <div className='d-flex align-items-center'>
                    <img
                        src={row.original.logo ? `${Img_url}/logo/list/${row.original.logo}` : `${Img_url}/default/list/business-logo.webp`}
                        alt={row.original.userName || "BUSINESS"}
                        className="me-2 avatar rounded-circle lg"
                        onError={(e) => { e.target.src = `${Img_url}/default/list/business-logo.webp`; }}
                    />
                    <div className='d-flex flex-column'>
                        <span>{row.original.business_name}</span>
                        <span>{row.original.userName}</span>
                    </div>
                </div>
            )
        },
        {
            Header: 'CONTACT',
            accessor: row => `${row.shop_contact} ${row.shop_email}`,
            Cell: ({ row }) => (
                <div>
                    <div>{row.original.shop_contact}</div>
                    <div>{row.original.shop_email}</div>
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
        {
            Header: 'ACTIONS',
            accessor: 'actions',
            Cell: ({ row }) => (
                <div>
                    <button type="button" onClick={() => handleEdit(row.original.shop_name, row.original.id)} className="btn text-info px-2 me-1">
                        <i className="bi bi-pencil"></i>
                    </button>
                    <button type="button" onClick={() => handleDelete(row.original.shop_name, row.original.id)} className="btn text-danger px-2">
                        <i className="fa fa-trash"></i>
                    </button>
                </div>
            ),
        },
        {
            Header: 'EXTRAS',
            accessor: 'extras',
            Cell: ({ row }) => (
                <div className='flex-col'>
                    <div>
                        <button className='btn text-info' onClick={() => handleGallery(row.original.shop_name, row.original.id)}><i className="bi bi-card-image me-2" data-toggle="tooltip" data-placement="bottom" title="Image Gallery"></i></button>
                        <button className='btn text-info' onClick={() => handleCatalogue(row.original.shop_name, row.original.id)}><i className="bi bi-journal me-2" data-toggle="tooltip" data-placement="bottom" title="Catalogue"></i></button>
                        <button className='btn text-info' onClick={() => handleOpeningHours(row.original.shop_name, row.original.id)}><i className="bi bi-clock" data-toggle="tooltip" data-placement="bottom" title="Opening Hours"></i></button>
                    </div>
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
            data: shopData,
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
                    <h4 className="title-font mb-3"><strong>Shops List</strong></h4>

                    <div className="mb-3">
                        <Link className='btn btn-primary' to="/admin/addShop">Add New Shop</Link>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <ExportButtons data={shopData} />
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
                        message={`Are you sure you want to ${recordToUpdate?.status === '1' ? 'deactivate' : 'activate'} this shop?`}
                    />

                    {shopToDelete && (
                        <DeleteModal
                            isOpen={isDeleteModalOpen}
                            onClose={() => setIsDeleteModalOpen(false)}
                            onConfirm={handleConfirmDelete}
                            message={`Are you sure you want to delete shop ${shopToDelete.shopName}?`}
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
                            {pageIndex * pageSize + page.length} of {shopData.length} entries
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

export default ShopList;
