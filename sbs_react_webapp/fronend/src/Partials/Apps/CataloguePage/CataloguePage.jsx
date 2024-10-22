/* eslint-disable react/prop-types */
import { useState, useMemo, useEffect, useCallback } from 'react';
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ExportButtons from '../ExportButtons/ExportButtons';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import Modal from '../StatusModal/Modal'
import DeleteModal from '../DeleteModal/DeleteModal';
import PopularModal from './PopularModal';

const CataloguePage = () => {
    // Navigation Function
    const navigate = useNavigate()

    // Access token
    const token = localStorage.getItem("jwtToken");

    // API URL
    const APP_URL = import.meta.env.VITE_API_URL

    // Get shop details from query string
    const { shopId, shopName } = useParams();

    // State initialization
    const [pageSize, setPageSize] = useState(10);
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [recordToUpdate, setRecordToUpdate] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [catalogueToDelete, setCatalogueToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isPopularModalOpen, setIsPopularModalOpen] = useState(false);
    const [catalogueToUpdatePopular, setCatalogueToUpdatePopular] = useState(null);
    const [isUpdatingPopular, setIsUpdatingPopular] = useState(false);

    // Fetch cataloges
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${APP_URL}/api/catalog/${shopId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                if (response.status === 200 && response.data.Catalog) {
                    setData(response.data.Catalog);
                    setHasError(false);
                } else if (response.status === 204) {
                    setHasError(true)
                }
            } catch (error) {
                setHasError(true);
            }
        };

        fetchData();
    }, [APP_URL, shopId, token]);

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
                const response = await axios.put(`${APP_URL}/api/catalogupdatestatus/${recordToUpdate.id}`,
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

    // Handle add catalogue navigation
    const handleAdd = () => {
        navigate(`/admin/shop/addCatalogue/${shopName}/${shopId}`);
    };

    // Handle edit catalogue navigation
    const handleEdit = (catalogName, id) => {
        navigate(`/admin/shop/editCatalogue/${shopName}/${shopId}/${catalogName}/${id}`);
    };

    // Handle catalogue gallery navigation
    const handleGallery = (catalogName, id) => {
        navigate(`/admin/shop/catalogueGallery/${shopName}/${shopId}/${catalogName}/${id}`)
    }

    // Handle offers page navigation
    const handleFaq = (catalogName, id) => {
        navigate(`/admin/shop/faq/${shopName}/${shopId}/${catalogName}/${id}`)
    }

    // Handle offers page navigation
    const handleOffers = (catalogName, id) => {
        navigate(`/admin/shop/offers/${shopName}/${shopId}/${catalogName}/${id}`)
    }

    // Handle review page navigation
    const handleReview = (catalogName, id) => {
        navigate(`/admin/shop/review/${shopName}/${shopId}/${catalogName}/${id}`)
    }

    // Handle faq delete callback
    const handleDelete = useCallback((id) => {
        setCatalogueToDelete(id);
        setIsDeleteModalOpen(true);
    }, []);

    // Handle catalogue deletion
    const handleConfirmDelete = async () => {
        if (catalogueToDelete) {
            setIsDeleting(true);
            try {
                const response = await axios.delete(`${APP_URL}/api/deletecatalog/${catalogueToDelete}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                setData(prevData => prevData.filter(catalogue => catalogue.id !== catalogueToDelete));
                toast.success(response.data.message || "Catalogue deleted successfully");
            } catch (error) {
                if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                    const errorMessages = Object.values(error.response.data.message).join(', ');
                    toast.error(`Error deleting catalogue: ${errorMessages}`);
                } else {
                    toast.error(`Error deleting catalogue: ${error.response?.data?.message || error.message}`);
                }
            } finally {
                setIsDeleting(false);
                setIsDeleteModalOpen(false);
                setCatalogueToDelete(null);
            }
        }
    };

    const handlePopularClick = useCallback((catalogue) => {
        setCatalogueToUpdatePopular(catalogue);
        setIsPopularModalOpen(true);
    }, []);

    const handleConfirmPopular = async () => {
        if (!catalogueToUpdatePopular) return;

        setIsUpdatingPopular(true);
        try {
            const newPopularStatus = catalogueToUpdatePopular.is_popular === '1' ? '0' : '1';
            const response = await axios.put(`${APP_URL}/api/update-catalog-is-popular/${catalogueToUpdatePopular.id}`,
                { is_popular: newPopularStatus },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            if (response.status === 200) {
                setData(prevData => prevData.map(catalogue =>
                    catalogue.id === catalogueToUpdatePopular.id ? { ...catalogue, is_popular: newPopularStatus } : catalogue
                ));
                toast.success(response.data.message || "Catalogue popular status updated successfully");
            } else {
                toast.error("Failed to update catalogue popular status");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred while updating catalogue popular status");
        } finally {
            setIsUpdatingPopular(false);
            setIsPopularModalOpen(false);
            setCatalogueToUpdatePopular(null);
        }
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
                Header: 'ITEM TITLE',
                accessor: 'item_title',
            },
            {
                Header: 'PRICE',
                accessor: 'price',
            },
            {
                Header: 'PLATFORM FEE',
                accessor: 'platform_fee',
            },
            {
                Header: 'PLATFORM FEE TYPE',
                accessor: 'platform_fee_type',
            },
            {
                Header: 'SALE PRICE',
                accessor: 'sale_price',
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
                Header: 'ACTIONS',
                Cell: ({ row }) => (
                    <div>
                        <button type="button" onClick={() => handleEdit(row.original.item_title, row.original.id)} className="btn text-info px-2 me-1">
                            <i className="bi bi-pencil"></i>
                        </button>
                        <button type="button" onClick={() => handleDelete(row.original.id)} className="btn text-danger px-2">
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
                )
            },
            {
                Header: 'EXTRAS',
                accessor: 'extras',
                Cell: ({ row }) => (
                    <div>
                        <button className='btn text-info' onClick={() => handleGallery(row.original.item_title, row.original.id)}><i className="bi bi-card-image me-2" data-toggle="tooltip" data-placement="bottom" title="Image Gallery"></i></button>
                        <button className='btn text-info' onClick={() => handleOffers(row.original.item_title, row.original.id)}><i className="bi bi-tag me-2" data-toggle="tooltip" data-placement="bottom" title="Offers"></i></button>
                        <button className='btn text-info' onClick={() => handleFaq(row.original.item_title, row.original.id)}><i className="bi bi-question-circle me-2" data-toggle="tooltip" data-placement="bottom" title="FAQs"></i></button>
                        <button className='btn text-info' onClick={() => handleReview(row.original.item_title, row.original.id)}><i className="bi bi-star me-2" data-toggle="tooltip" data-placement="bottom" title="Reviews"></i></button>
                    </div>
                )
            }
        ],
        [handleDelete]
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

    return (
        <div className="px-4 py-3 page-body">
            <Toaster />
            <div className="col-lg-12 col-md-12">
                <div className="card mb-3 p-3">
                    <div className='table-responsive'>
                        <h4 className="title-font mb-3"><strong>{shopName} Catalogue</strong></h4>

                        <div className='d-flex justify-content-start align-items-center mb-4 gap-2'>
                            <button className='btn btn-primary' onClick={handleAdd}>Add Catalogue</button>
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

                        {catalogueToDelete && (
                            <DeleteModal
                                isOpen={isDeleteModalOpen}
                                onClose={() => setIsDeleteModalOpen(false)}
                                onConfirm={handleConfirmDelete}
                                message={`Are you sure you want to delete this catalogue item?`}
                                isLoading={isDeleting}
                            />
                        )}

                        {catalogueToUpdatePopular && (
                            <PopularModal
                                isOpen={isPopularModalOpen}
                                onClose={() => setIsPopularModalOpen(false)}
                                onConfirm={handleConfirmPopular}
                                message={`Are you sure you want to mark this catalogue item as ${catalogueToUpdatePopular.is_popular === '1' ? 'regular' : 'popular'}?`}
                                isLoading={isUpdatingPopular}
                            />
                        )}

                        <Modal
                            isOpen={isModalOpen}
                            onClose={handleCloseModal}
                            onConfirm={handleConfirm}
                            isLoading={isUpdating}
                            message={`Are you sure you want to ${recordToUpdate?.status === '1' ? 'deactivate' : 'activate'} catalogue ${recordToUpdate?.item_title}?`}
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
                    </div>
                    <div className="d-flex justify-content-between align-items-center pt-4">
                        {!hasError && data.length > 0 && (
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

export default CataloguePage;