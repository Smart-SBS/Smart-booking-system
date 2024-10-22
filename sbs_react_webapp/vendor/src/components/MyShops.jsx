import { useState, useEffect, useMemo } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table';
import { FaPlus, FaTrash, FaEdit, FaRegClock } from 'react-icons/fa';
import formatDate from '../utils/formatDate';
import axios from 'axios';
import LoadingFallback from "../utils/LoadingFallback";
import toast, { Toaster } from 'react-hot-toast';
import DeleteModal from './DeleteModal';
import { FaImages } from 'react-icons/fa';
import { MdOutlineLocalOffer } from "react-icons/md";
import { GrCatalogOption } from "react-icons/gr";
import { Link, useNavigate } from 'react-router-dom';
import StatusModal from './StatusModal';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

const MyShops = () => {
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
    const [shopToDelete, setShopToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [recordToUpdate, setRecordToUpdate] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState(null);

    // Fetch vendor shop data
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${APP_URL}/ma-vendor-shops`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                if (response.status === 200) {
                    setData(response.data.shops);
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
                const response = await axios.put(`${APP_URL}/updateshopstatus/${recordToUpdate.shop_id}`,
                    { status: newStatus },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setData(prevData =>
                    prevData.map(item =>
                        item.shop_id === recordToUpdate.shop_id ? { ...item, status: newStatus } : item
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
    const handleDelete = useCallback((shop_id, shop_name) => {
        setShopToDelete({ shop_id, shop_name });
        setIsDeleteModalOpen(true);
    }, []);

    // Handle delete functionality
    const handleConfirmDelete = async () => {
        if (shopToDelete) {
            setIsDeleting(true);
            try {
                const response = await axios.delete(`${APP_URL}/ma-delete-shop/${shopToDelete.shop_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json;"
                    }
                });
                setData(prevData => prevData.filter(shop => shop.shop_id !== shopToDelete.shop_id));
                toast.success(response.data.message);
            } catch (error) {
                if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                    // If the message is an object, extract all error messages
                    const errorMessages = Object.row.original.statuss(error.response.data.message).join(', ');
                    toast.error(`Error deleting shop: ${errorMessages}`);
                } else {
                    // If it's a string or any other case, use the original approach
                    toast.error(`Error deleting shop: ${error.response?.data?.message || error.message}`);
                }
            } finally {
                setIsDeleting(false);
                setIsDeleteModalOpen(false);
                setShopToDelete(null);
            }
        }
    };

    // Handle shop edit
    const handleEdit = async (id, shopName) => {
        navigate(`/edit-shop/${id}/${shopName}`)
    }

    // Table configuration
    const columns = useMemo(
        () => [
            {
                header: 'Shops',
                accessorKey: 'shop_name',
                cell: ({ row }) => (
                    <div className="flex items-center py-4">
                        <img src={row.original.primary_shop_image ? `${IMG_URL}/gallery/thumb/${row.original.primary_shop_image}` : 'https://i.pinimg.com/564x/37/08/99/3708994bdca38cd8dbea509f233f3cf4.jpg'}
                            alt={row.original.shop_name}
                            className="w-20 h-20 object-cover rounded-lg mr-4"
                            onError={(e) => { e.target.src = `https://i.pinimg.com/564x/37/08/99/3708994bdca38cd8dbea509f233f3cf4.jpg` }}
                        />
                        <div>
                            <h3 className="font-semibold text-lg">{row.original.shop_name}</h3>
                        </div>
                    </div>
                ),
            },
            {
                header: 'Contact',
                accessorKey: 'contact',
                cell: ({ row }) => (
                    <div className='flex-col items-center'>
                        <div>{row.original.shop_contact}</div>
                        <div>{row.original.shop_email}</div>
                    </div>
                )
            },
            {
                header: 'Business',
                accessorKey: 'business_name',
            },
            {
                header: 'Location',
                accessorKey: 'shop_location',
                cell: ({ row }) => (
                    <div className='flex items-center'>
                        {row.original.area_name}, {row.original.city_name}, {row.original.states_name}
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
                    <div className=' flex'>
                        <button onClick={() => handleEdit(row.original.shop_id, row.original.slug)} title='Edit' className="text-blue-500 mr-4" aria-label="Edit"><FaEdit /></button>
                        <button onClick={() => handleDelete(row.original.shop_id, row.original.shop_name)} title='Delete' className="text-red-500" aria-label="Delete"><FaTrash /></button>
                    </div>
                ),
            },
            {
                header: 'Extras',
                cell: ({ row }) => (
                    <div className='flex'>
                        <Link to={`/shop-gallery/${row.original.shop_id}/${row.original.slug}`} title='Gallery' className="text-blue-500 mr-4" aria-label="Gallery">
                            <FaImages />
                        </Link>
                        <Link to={`/catalogues/${row.original.slug}/${row.original.shop_id}`} title='Catalogs' className="text-blue-500 mr-4" aria-label="Catalogs">
                            <GrCatalogOption />
                        </Link>
                        <Link to={`/opening-hours/${row.original.slug}/${row.original.shop_id}`} title='Opening Hours' className="text-blue-500 mr-4" aria-label="Opening Hours">
                            <FaRegClock />
                        </Link>
                    </div>
                ),
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <div key={row.id} className="bg-white shadow rounded-lg p-4 mb-4 space-y-1">
                <div className="flex items-center mb-4">
                    <img
                        src={row.original.primary_shop_image ? `${IMG_URL}/gallery/thumb/${row.original.primary_shop_image}` : 'https://i.pinimg.com/564x/37/08/99/3708994bdca38cd8dbea509f233f3cf4.jpg'}
                        alt={row.original.shop_name}
                        className="w-20 h-20 object-cover rounded-lg mr-4"
                        onError={(e) => { e.target.src = `https://i.pinimg.com/564x/37/08/99/3708994bdca38cd8dbea509f233f3cf4.jpg` }}
                    />
                    <div>
                        <h3 className="font-semibold text-lg">{row.original.shop_name}</h3>
                        <p className="text-sm text-gray-600">
                            {row.original.area_name}, {row.original.city_name}, {row.original.states_name}
                        </p>
                    </div>
                </div>
                <p><strong>Contact:</strong> {row.original.shop_contact}</p>
                <p><strong>Email:</strong> {row.original.shop_email}</p>
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
                <div className="mt-4 flex gap-4">
                    <Link to={`/shop-gallery/${row.original.shop_id}/${row.original.shop_name}`} className="text-blue-500" aria-label="Gallery" title="Gallery">
                        <FaImages />
                    </Link>
                    <Link to={`/shop-offers/${row.original.shop_name}/${row.original.shop_id}`} className="text-blue-500" aria-label="Offers" title="Offers">
                        <MdOutlineLocalOffer size={17} />
                    </Link>
                    <Link to={`/catalogues/${row.original.shop_name}/${row.original.shop_id}`} className="text-blue-500" aria-label="Catalogues" title="Catalogues">
                        <GrCatalogOption />
                    </Link>
                    <Link to={`/opening-hours/${row.original.shop_name}/${row.original.shop_id}`} className="text-blue-500" aria-label="Catalogues" title="Catalogues">
                        <FaRegClock />
                    </Link>
                    <button onClick={() => handleEdit(row.original.shop_id, row.original.shop_name)} className="text-blue-500" aria-label="Edit" title="Edit">
                        <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(row.original.shop_id, row.original.shop_name)} className="text-red-500" aria-label="Delete" title="Delete">
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
                <h2 className="text-2xl font-bold">My Shops</h2>
                <Link
                    to='/add-shop'
                    className="px-4 py-2 bg-[#04AA6D] text-white rounded hover:bg-[#04aa6ddf] transition-colors flex items-center"
                >
                    <FaPlus className="mr-2" /> Add Shop
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

            {shopToDelete && (
                <DeleteModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={handleConfirmDelete}
                    message={`Are you sure you want to delete shop ${shopToDelete.shop_name}?`}
                    isLoading={isDeleting}
                />
            )}

            <StatusModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirm}
                isLoading={isUpdating}
                message={`Are you sure you want to ${recordToUpdate?.status === '1' ? 'deactivate' : 'activate'} shop ${recordToUpdate?.shop_name}?`}
            />

            {/* Mobile view */}
            <div className="md:hidden">
                {renderMobileView()}
            </div>

            {data.length > 10 && !isLoading && !error && (
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

export default MyShops;