import { useState, useEffect, useMemo } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import axios from 'axios';
import LoadingFallback from "../utils/LoadingFallback";
import toast, { Toaster } from 'react-hot-toast';
import DeleteModal from './DeleteModal';
import StatusModal from './StatusModal';
import formatTimeTo12Hour from '../utils/formatTimeTo12Hour';
import { Link, useParams } from 'react-router-dom';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import slugToShopName from '../utils/slugToShopName';

const OpeningHours = () => {
    // Access token
    const token = useSelector(state => state.auth.token);

    // API URL
    const APP_URL = import.meta.env.VITE_API_URL;

    // Shop details from params
    const { shopId, shopName } = useParams()

    // State initialization
    const [data, setData] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [openingHoursToDelete, setOpeningHoursToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [recordToUpdate, setRecordToUpdate] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch opening and closing hours data
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${APP_URL}/ma-openhours/${shopId}`);
                if (response.status === 200) {
                    setData(response.data.OpenHours);
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
                const response = await axios.put(`${APP_URL}/updateopenhoursstatus/${recordToUpdate.id}`,
                    { status: newStatus },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
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

    // Handle delete callback
    const handleDelete = useCallback((id, day_name) => {
        setOpeningHoursToDelete({ id, day_name });
        setIsDeleteModalOpen(true);
    }, []);

    // Handle delete functionality
    const handleConfirmDelete = async () => {
        if (openingHoursToDelete) {
            setIsDeleting(true);
            try {
                const response = await axios.delete(`${APP_URL}/ma-delete-openhours/${openingHoursToDelete.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json;"
                    }
                });
                setData(prevData => prevData.filter(catalogue => catalogue.id !== openingHoursToDelete.id));
                toast.success(response.data.message);
            } catch (error) {
                if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                    // If the message is an object, extract all error messages
                    const errorMessages = Object.values(error.response.data.message).join(', ');
                    toast.error(`Error deleting catalogue: ${errorMessages}`);
                } else {
                    // If it's a string or any other case, use the original approach
                    toast.error(`Error deleting catalogue: ${error.response?.data?.message || error.message}`);
                }
            } finally {
                setIsDeleting(false);
                setIsDeleteModalOpen(false);
                setOpeningHoursToDelete(null);
            }
        }
    };

    // Table configuration
    const columns = useMemo(
        () => [
            {
                header: 'Sr No',
                accessor: 'serialNumber',
                cell: ({ row }) => <div>{row.index + 1}</div>
            },
            {
                header: 'Day',
                accessorKey: 'day_name',
            },
            {
                header: 'Start Hour',
                accessorKey: 'start_time',
                cell: ({ row }) => (
                    <div>
                        {row.original.start_time === "00:00:00"
                            ? <span className='text-red-500'>Closed</span>
                            : formatTimeTo12Hour(row.original.start_time)}
                    </div>
                )
            },
            {
                header: 'End Hour',
                accessorKey: 'end_time',
                cell: ({ row }) => (
                    <div>
                        {row.original.end_time === "00:00:00"
                            ? <span className='text-red-500'>Closed</span>
                            : formatTimeTo12Hour(row.original.end_time)}
                    </div>
                )
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
            // {
            //     header: 'Action',
            //     cell: ({ row }) => (
            //         <div className=' flex items-center'>
            //             <button onClick={() => handleDelete(row.original.id, row.original.day_name)} title='Delete' className="text-red-500" aria-label="Delete"><FaTrash /></button>
            //         </div>
            //     )
            // }
        ],
        [handleStatusClick]
    );

    // Table implementation
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 15,
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

        if (error || data.length === 0) {
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

        if (error || data.length === 0) {
            return <div className="text-center py-4">No records found</div>;
        }

        return table.getRowModel().rows.map(row => (
            <div key={row.id} className="bg-white shadow rounded-lg p-4 mb-4 space-y-2">
                <div className="flex items-center mb-4">
                    <h3 className="font-semibold text-lg">{row.original.day_name}</h3>
                </div>
                <p><strong>Start Hour:</strong> {row.original.start_time}</p>
                <p><strong>End Hour:</strong> {row.original.end_time}</p>
                <p>
                    <strong>Status:</strong>
                    <span
                        onClick={() => handleStatusClick(row.original)}
                        className={`py-1 text-white px-[8px] ml-1 rounded ${row.original.status === '1' ? 'bg-green-500' : 'bg-red-500'}`}
                        style={{ padding: '4px 8px', borderRadius: '4px' }}
                    >
                        {row.original.status === '1' ? 'Active' : 'Inactive'}
                    </span>
                </p>
                <div className="flex gap-4 justify-start items-center">
                    <button onClick={() => handleDelete(row.original.id, row.original.day_name)} className="text-red-500" aria-label="Delete">
                        <FaTrash />
                    </button>
                </div>
            </div>
        ));
    };

    return (
        <div className="container mx-auto p-4 text-black shadow-md bg-white">
            <Toaster />
            <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
                <h2 className="text-2xl font-bold mb-4 md:mb-0">Opening and Closing Hours for {slugToShopName(shopName)}</h2>
                <div className='flex md:flex-row items-start justify-start gap-2'>
                    {
                        data.length > 0 ?
                            <>
                                <Link
                                    to={`/edit-opening-hours/${shopName}/${shopId}`}
                                    className="px-4 py-2 bg-[#04AA6D] shadow text-white rounded hover:bg-[#04aa6ddf] transition-colors flex items-center"
                                >
                                    <FaEdit className="mr-2" /> Edit hours
                                </Link>
                                <Link
                                    to='/my-shops'
                                    className="px-4 py-2 bg-[#fa2964e6] border shadow text-white rounded hover:bg-pink-600 hover:text-white transition-colors"
                                >
                                    Back
                                </Link>
                            </>
                            :
                            <>
                                <Link
                                    to={`/add-opening-hours/${shopName}/${shopId}`}
                                    className="px-4 py-2 bg-[#04AA6D] shadow text-white rounded hover:bg-[#04aa6ddf] transition-colors flex items-center"
                                >
                                    <FaPlus className="mr-2" /> Add hours
                                </Link>
                                <Link
                                    to='/my-shops'
                                    className="px-4 py-2 bg-[#fa2964e6] border shadow text-white rounded hover:bg-pink-600 hover:text-white transition-colors"
                                >
                                    Back
                                </Link>
                            </>
                    }
                </div>
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

            {openingHoursToDelete && (
                <DeleteModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={handleConfirmDelete}
                    message={`Deleting last record of ${openingHoursToDelete.day_name} will require re-adding all days. If you want to re-add ${openingHoursToDelete.day_name}, you'll need to add it as a new record.`}
                    isLoading={isDeleting}
                />
            )}

            <StatusModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirm}
                isLoading={isUpdating}
                message={`Are you sure you want to ${recordToUpdate?.status === '1' ? 'deactivate' : 'activate'} day ${recordToUpdate?.day_name}?`}
            />

            {/* Mobile view */}
            <div className="md:hidden">
                {renderMobileView()}
            </div>
        </div>
    );
};

export default OpeningHours