/* eslint-disable react/prop-types */
import { useState, useMemo, useEffect, useCallback } from 'react';
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table';
import { Link, useParams } from 'react-router-dom';
import ExportButtons from '../ExportButtons/ExportButtons';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import DeleteModal from '../DeleteModal/DeleteModal';
import FaqForm from './FaqForm';

const FaqPage = () => {
    // Access token
    const token = localStorage.getItem("jwtToken");

    // API URL
    const APP_URL = import.meta.env.VITE_API_URL || '/api';

    // Get shop details from query string
    const { catalogName, catalogId, shopId, shopName } = useParams();

    // State initialization
    const [pageSize, setPageSize] = useState(10);
    const [data, setData] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [faqToDelete, setFaqToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [editingFaq, setEditingFaq] = useState(null);
    const [hasError, setHasError] = useState(false);
    const [isModalClosed, setIsModalClosed] = useState(true)

    // Fetch faqs
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${APP_URL}/api/faqs/${catalogId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                const result = response.data;
                if (result.status === 200 && result.Faqs) {
                    setData(result.Faqs);
                    setHasError(false);
                } else if (response.status === 204) {
                    setHasError(true);
                }
            } catch (error) {
                setHasError(true);
            }
        };

        fetchData();
    }, [APP_URL, catalogId, token, isModalClosed]);

    // Handle faq addition
    const handleAddFaq = () => {
        setEditingFaq(null);
        setIsFormModalOpen(true);
        setIsModalClosed(false);
    };

    // Handle faq editing
    const handleEditModal = (faq) => {
        setEditingFaq(faq);
        setIsFormModalOpen(true);
        setIsModalClosed(false);
    };

    // Handle faq delete callback
    const handleDelete = useCallback((question, questionId) => {
        setFaqToDelete({ question, questionId });
        setIsDeleteModalOpen(true);
    }, []);

    // Handle faq deletion
    const handleConfirmDelete = async () => {
        if (faqToDelete) {
            setIsDeleting(true);
            try {
                const response = await axios.delete(`${APP_URL}/api/delete-faq/${faqToDelete.questionId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                setData(prevData => prevData.filter(faq => faq.id !== faqToDelete.questionId));
                toast.success(response.data.message);
            } catch (error) {
                const errorMessage = error.response?.data?.message;
                toast.error(`Error deleting faq: ${Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage || error.message}`);
            } finally {
                setIsDeleting(false);
                setIsDeleteModalOpen(false);
                setFaqToDelete(null);
            }
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
                Header: 'QUESTION',
                accessor: 'question',
                Cell: ({ value }) => <div className="d-flex align-items-center">{value}</div>
            },
            {
                Header: 'ANSWER',
                accessor: 'answer',
                Cell: ({ value }) => <div className="d-flex align-items-center">{value}</div>
            },
            {
                Header: 'ACTIONS',
                Cell: ({ row }) => (
                    <div>
                        <button type="button" onClick={() => handleEditModal(row.original)} className="btn text-info px-2 me-1">
                            <i className="bi bi-pencil"></i>
                        </button>
                        <button type="button" onClick={() => handleDelete(row.original.question, row.original.id)} className="btn text-danger px-2">
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
                    <h4 className="title-font mb-3"><strong>{catalogName} Frequently Asked Questions</strong></h4>

                    <div className='d-flex justify-content-start align-items-center mb-4 gap-2'>
                        <button className='btn btn-primary' onClick={handleAddFaq}>Add FAQ</button>
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
                    {faqToDelete && (
                        <DeleteModal
                            isOpen={isDeleteModalOpen}
                            onClose={() => setIsDeleteModalOpen(false)}
                            onConfirm={handleConfirmDelete}
                            message={`Are you sure you want to delete FAQ ${faqToDelete.question}?`}
                            isLoading={isDeleting}
                        />
                    )}

                    {isFormModalOpen && (
                        <FaqForm
                            onSubmit={(newFaq) => {
                                setData(prevData => editingFaq ? prevData.map(faq => faq.id === newFaq.id ? newFaq : faq) : [...prevData, newFaq]);
                                setIsFormModalOpen(false);
                                setEditingFaq(null);
                                setIsModalClosed(true);
                            }}
                            onClose={() => {
                                setIsFormModalOpen(false);
                                setEditingFaq(null);
                                setIsModalClosed(true);
                            }}
                            initialData={editingFaq}
                            catalogId={catalogId}
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

export default FaqPage;
