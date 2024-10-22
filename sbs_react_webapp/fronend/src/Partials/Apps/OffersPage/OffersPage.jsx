/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState, useMemo, useEffect, useCallback } from 'react';
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table';
import { Link, useParams } from 'react-router-dom';
import ExportButtons from '../ExportButtons/ExportButtons';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import Modal from '../StatusModal/Modal'
import DeleteModal from '../DeleteModal/DeleteModal';
import OfferForm from './OfferForm';

const OffersPage = () => {
    // Access token
    const token = localStorage.getItem("jwtToken");

    // API URL
    const APP_URL = import.meta.env.VITE_API_URL

    // Get shop details from query string
    const { catalogName, catalogId, shopId, shopName } = useParams();

    // State initialization
    const [pageSize, setPageSize] = useState(10);
    const [data, setData] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [offerToDelete, setOfferToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [editingOffer, setEditingOffer] = useState(null);
    const [hasError, setHasError] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [recordToUpdate, setRecordToUpdate] = useState(null);
    const [refreshOffers, setRefreshOffers] = useState(0);

    // Fetch offer
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${APP_URL}/api/specialoffers/${catalogId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                if (response.status === 200 && response.data.SpecialOffers) {
                    setData(response.data.SpecialOffers);
                    setHasError(false);
                } else if (response.status === 204) {
                    setHasError(true)
                }
            } catch (error) {
                setHasError(true);
            }
        };

        fetchData();
    }, [APP_URL, token, refreshOffers, catalogId]);

    // Handle offer addition
    const handleAddOffer = () => {
        setEditingOffer(null);
        setIsFormModalOpen(true);
    };

    // Handle offer editing
    const handleEditModal = (offer) => {
        setEditingOffer(offer);
        setIsFormModalOpen(true);
    };

    // Handle offer delete callback
    const handleDelete = useCallback((offerName, offerId) => {
        setOfferToDelete({ offerName, offerId });
        setIsDeleteModalOpen(true);
    }, []);

    // Handle offer deletion
    const handleConfirmDelete = async () => {
        if (offerToDelete) {
            setIsDeleting(true);
            try {
                const response = await axios.delete(`${APP_URL}/api/deletespecialoffer/${offerToDelete.offerId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                setData(prevData => prevData.filter(offer => offer.id !== offerToDelete.offerId));
                toast.success(response.data.message);
            } catch (error) {
                const errorMessage = error.response?.data?.message;
                toast.error(`Error deleting offer: ${Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage || error.message}`);
            } finally {
                setIsDeleting(false);
                setIsDeleteModalOpen(false);
                setOfferToDelete(null);
            }
        }
    };

    // Handle status click callback
    const handleStatusClick = (area) => {
        setRecordToUpdate(area);
        setIsModalOpen(true);
    };

    // Handle status change functionality
    const handleConfirm = async () => {
        if (!recordToUpdate) return;

        try {
            const newStatus = recordToUpdate.status === '1' ? '0' : '1';
            const response = await axios.put(`${APP_URL}/api/updatespecialofferstatus/${recordToUpdate.id}`, { status: newStatus }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            if (response.status === 200) {
                setData(prevData => prevData.map(offer =>
                    offer.id === recordToUpdate.id ? { ...offer, status: newStatus } : offer
                ));
                toast.success(response.data.message || "Offer status updated successfully");
                setIsModalOpen(false);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred while updating offer status");
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
                Header: 'Offer Title',
                accessor: 'offer_title',
                Cell: ({ row }) => <div className="d-flex align-items-center">{row.original.offer_title}</div>
            },
            {
                Header: 'Offer Description',
                accessor: 'offer_description',
                Cell: ({ row }) => <div className="d-flex align-items-center">{row.original.offer_description}</div>
            },
            {
                Header: 'Offer Type',
                accessor: 'offer_type',
                Cell: ({ row }) => <div className="d-flex align-items-center">{row.original.offer_type}</div>
            },
            {
                Header: 'Offer Amount',
                accessor: 'offer_amount',
                Cell: ({ row }) => <div className="d-flex align-items-center">{row.original.offer_amount}</div>
            },
            {
                Header: 'Start Date',
                accessor: 'offer_validity_start_date',
                Cell: ({ row }) => <div className="d-flex align-items-center">{row.original.offer_validity_start_date}</div>
            },
            {
                Header: 'End Date',
                accessor: 'offer_validity_end_date',
                Cell: ({ row }) => <div className="d-flex align-items-center">{row.original.offer_validity_end_date}</div>
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
                Cell: ({ row }) => (
                    <div>
                        <button type="button" onClick={() => handleEditModal(row.original)} className="btn text-info px-2 me-1">
                            <i className="bi bi-pencil"></i>
                        </button>
                        <button type="button" onClick={() => handleDelete(row.original.offer_title, row.original.id)} className="btn text-danger px-2">
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
                )
            },
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
                    <h4 className="title-font mb-3"><strong>{catalogName}'s Special Offers</strong></h4>

                    <div className='d-flex justify-content-start align-items-center mb-4 gap-2'>
                        <button className='btn btn-primary' onClick={handleAddOffer}>Add Offer</button>
                        <Link to={`/admin/shop/catalogue/${shopName}/${shopId}`} className='btn btn-info text-white text-decoration-none'>Back</Link>
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
                        onClose={() => setIsModalOpen(false)}
                        onConfirm={handleConfirm}
                        message={`Are you sure you want to ${recordToUpdate?.status === '1' ? 'deactivate' : 'activate'} this offer ${recordToUpdate?.offer_title}?`}
                        status={recordToUpdate?.status}
                    />

                    {offerToDelete && (
                        <DeleteModal
                            isOpen={isDeleteModalOpen}
                            onClose={() => setIsDeleteModalOpen(false)}
                            onConfirm={handleConfirmDelete}
                            message={`Are you sure you want to delete offer ${offerToDelete.offerName}?`}
                            isLoading={isDeleting}
                        />
                    )}

                    {isFormModalOpen && (
                        <OfferForm
                            onSubmit={(newOffer) => {
                                setData(prevData => editingOffer ? prevData.map(offer => offer.id === newOffer.id ? newOffer : offer) : [...prevData, newOffer]);
                                setIsFormModalOpen(false);
                                setEditingOffer(null);
                            }}
                            onClose={() => {
                                setIsFormModalOpen(false);
                                setEditingOffer(null);
                            }}
                            initialData={editingOffer}
                            catalogId={catalogId}
                            onSubmitSuccess={() => setRefreshOffers(prev => prev + 1)}
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

export default OffersPage;
