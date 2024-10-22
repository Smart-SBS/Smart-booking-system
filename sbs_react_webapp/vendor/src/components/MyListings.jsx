import { useState, useMemo, useCallback, useEffect } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import LoadingFallback from "../utils/LoadingFallback";
import formatDate from '../utils/formatDate';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import StatusModal from './StatusModal';
import DeleteModal from './DeleteModal';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MyListings = () => {
    // Navigate function
    const navigate = useNavigate()

    // Access token
    const token = useSelector(state => state.auth.token);

    // API URL
    const APP_URL = import.meta.env.VITE_API_URL;
    const IMG_URL = import.meta.env.VITE_IMG_URL

    // State initialization
    const [data, setData] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [businessToDelete, setBusinessToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [recordToUpdate, setRecordToUpdate] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch vendor shop data
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${APP_URL}/ma-vendor-business`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                console.log(response);
                if (response.status === 200) {
                    setData(response.data.business);
                } else if (response.status === 204) {
                    setError(true);
                }
            } catch (error) {
                if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                    const errorMessages = Object.row.original.statuss(error.response.data.message).join(', ');
                    setError(errorMessages);
                    console.error(`Error fetching vendor shop data: ${errorMessages}`);
                } else {
                    setError(error.response?.data?.message || error.message);
                    console.error(`Error fetching vendor shop data: ${error.response?.data?.message || error.message}`);
                }
            } finally {
                setIsLoading(false);
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
                const response = await axios.put(`${APP_URL}/update-business-status/${recordToUpdate.id}`,
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
    }, [APP_URL, recordToUpdate, token]);

    // Handle close modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
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
                const response = await axios.delete(`${APP_URL}/ma-delete-business/${businessToDelete.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json;"
                    }
                });
                setData(prevData => prevData.filter(shop => shop.id !== businessToDelete.id));
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

    // Handle business updation
    const handleEdit = async (id, businessName) => {
        navigate(`/edit-business/${id}/${businessName}`)
    }

    // Table configuration
    const columns = useMemo(
        () => [
            {
                header: 'Businesses',
                accessorKey: 'business_name',
                cell: ({ row }) => (
                    <div className="flex items-center py-4">
                        <img src={row.original.business_logo ? `${IMG_URL}/logo/list/${row.original.business_logo}` : 'https://i.pinimg.com/564x/37/08/99/3708994bdca38cd8dbea509f233f3cf4.jpg'}
                            alt={row.original.business_name}
                            className="w-20 h-20 object-cover rounded-lg mr-4"
                            onError={(e) => { e.target.src = `https://i.pinimg.com/564x/37/08/99/3708994bdca38cd8dbea509f233f3cf4.jpg` }}
                        />
                        <div>
                            <h3 className="font-semibold text-lg">{row.original.business_name}</h3>
                        </div>
                    </div>
                ),
            },
            {
                header: 'Email',
                accessorKey: 'business_email',
            },
            {
                header: 'Contact',
                accessorKey: 'business_contact',
            },
            {
                header: 'Status',
                accessorKey: 'status',
                cell: ({ row }) => (
                    <button
                        onClick={() => handleStatusClick(row.original)}
                        className={`p-2 rounded `}
                        style={{
                            backgroundColor: row.original.status === '1' ? '#28a745' : '#dc3545',
                            borderColor: row.original.status === '1' ? '#28a745' : '#dc3545',
                            color: '#ffffff',
                            width: '70px',
                            height: '40px'
                        }}
                    >
                        {row.original.status === '1' ? 'Active' : 'Inactive'}
                    </button>
                ),
            },
            {
                header: 'Date Added',
                accessorKey: 'created_at',
                cell: ({ row }) => (
                    <div>{formatDate(new Date(row.original.created_at))}</div>
                )
            },
            {
                header: 'Actions',
                cell: ({ row }) => (
                    <div>
                        <button onClick={() => handleEdit(row.original.id, row.original.business_name)} className="text-blue-500 mr-4" aria-label="Edit"><FaEdit /></button>
                        <button onClick={() => handleDelete(row.original.business_name, row.original.id)} className="text-red-500" aria-label="Delete"><FaTrash /></button>
                    </div>
                ),
            },
        ],
        [IMG_URL, handleDelete, handleStatusClick]
    );

    // Table implementation
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 5,
            },
        },
    });


    const renderTableBody = () => {
        if (isLoading) {
            return (
                <tr>
                    <td colSpan={columns.length} className="text-center py-4">
                        Loading...
                    </td>
                </tr>
            );
        }

        if (error || data?.length === 0) {
            return (
                <tr>
                    <td colSpan={columns.length} className="text-center py-4">
                        No records found
                    </td>
                </tr>
            );
        }

        return table.getRowModel().rows.map(row => (
            <tr key={row.id} className="border-b">
                {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="py-2 px-4">
                        {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                        )}
                    </td>
                ))}
            </tr>
        ));
    };

    const renderMobileView = () => {
        if (isLoading) return <LoadingFallback />;

        if (error || data?.length === 0) {
            return <div className="text-center py-4">No records found</div>;
        }

        return table.getRowModel().rows.map(row => (
            <div key={row.id} className="bg-white shadow rounded-lg p-4 mb-4 space-y-1">
                <div className="flex items-center mb-2">
                    <img
                        src={row.original.business_logo ? `${IMG_URL}/logo/list/${row.original.business_logo}` : 'https://i.pinimg.com/564x/37/08/99/3708994bdca38cd8dbea509f233f3cf4.jpg'}
                        alt={row.original.business_name}
                        className="w-20 h-20 object-cover rounded-lg mr-4"
                        onError={(e) => { e.target.src = `https://i.pinimg.com/564x/37/08/99/3708994bdca38cd8dbea509f233f3cf4.jpg` }}
                    />
                    <h3 className="font-semibold text-lg">{row.original.business_name}</h3>
                </div>
                <p><strong>Email:</strong> {row.original.business_email}</p>
                <p><strong>Contact:</strong> {row.original.business_contact}</p>
                <p>
                    <strong>Status:</strong>
                    <span
                        onClick={() => handleStatusClick(row.original)}
                        className={`py-1 text-white px-[8px] m-[6px] rounded ${row.original.status === '1' ? 'bg-green-500' : 'bg-red-500'}`}
                        style={{ padding: '4px 8px', borderRadius: '4px' }}
                    >
                        {row.original.status === '1' ? 'Active' : 'Inactive'}
                    </span>
                </p>
                <p><strong>Date Added:</strong> {formatDate(new Date(row.original.created_at))}</p>
                <div className="mt-2">
                    <button
                        onClick={() => handleEdit(row.original.id, row.original.business_name)}
                        className="text-blue-500 mr-4"
                        aria-label="Edit"
                    >
                        <FaEdit />
                    </button>
                    <button
                        onClick={() => handleDelete(row.original.business_name, row.original.id)}
                        className="text-red-500"
                        aria-label="Delete"
                    >
                        <FaTrash />
                    </button>
                </div>
            </div>
        ));
    };

    return (
        <div className="container mx-auto p-4 text-black shadow-md bg-white">
            <Toaster />
            <div className="mb-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold">My Businesses</h2>
                <Link
                    to='/add-business'
                    className="px-4 py-2 bg-[#04AA6D] text-white rounded hover:bg-[#04aa6ddf] transition-colors flex items-center"
                >
                    <FaPlus className="mr-2" /> Add Business
                </Link>
            </div>
            <table className="min-w-full hidden md:table">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className="text-left py-2 px-4 bg-gray-100 font-semibold text-gray-600">
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {renderTableBody()}
                </tbody>
            </table>

            {businessToDelete && (
                <DeleteModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={handleConfirmDelete}
                    message={`Are you sure you want to delete business ${businessToDelete.businessName}?`}
                    isLoading={isDeleting}
                />
            )}

            <StatusModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirm}
                isLoading={isUpdating}
                message={`Are you sure you want to ${recordToUpdate?.status === '1' ? 'deactivate' : 'activate'} business ${recordToUpdate?.business_name}?`}
            />

            {/* Mobile view */}
            <div className="md:hidden">
                {renderMobileView()}
            </div>

            {data?.length > 10 && !isLoading && !error && (
                <>
                    {/* pagination */}
                    <div className="mt-4 flex items-center justify-between">
                        <button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="px-4 py-2 bg-[#fa2964] text-white rounded disabled:bg-gray-300"
                        >
                            Previous
                        </button>
                        <div className="flex space-x-2">
                            {[...Array(table.getPageCount())].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => table.setPageIndex(index)}
                                    className={`px-3 py-1 rounded ${table.getState().pagination.pageIndex === index
                                        ? 'bg-[#fa2964] text-white'
                                        : 'bg-gray-200'
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="px-4 py-2 bg-[#fa2964] text-white rounded disabled:bg-gray-300"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default MyListings;