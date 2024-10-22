/* eslint-disable react/prop-types */
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
import { FaQuestion } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import DeleteModal from './DeleteModal';
import StatusModal from './StatusModal';
import { FaImages } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { MdOutlineLocalOffer } from 'react-icons/md';
import slugToShopName from '../utils/slugToShopName';

const Catalogues = () => {
    // Navigate function
    const navigate = useNavigate()

    // Access token
    const token = useSelector(state => state.auth.token);

    // API URL and Image URL
    const APP_URL = import.meta.env.VITE_API_URL;
    const IMG_URL = import.meta.env.VITE_IMG_URL

    // Shop details from params
    const { shopId, shopName } = useParams()

    // State initialization
    const [data, setData] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [catalogueToDelete, setCatalogueToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [recordToUpdate, setRecordToUpdate] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState(null);

    // Fetch vendor catalogue data
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${APP_URL}/ma-catalog-list/${shopId}`);
                if (response.status === 200) {
                    setData(response.data.Catalog);
                }
            } catch (error) {
                if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                    const errorMessages = Object.values(error.response.data.message).join(', ');
                    setError(errorMessages);
                    console.error(`Error fetching vendor catalogue data: ${errorMessages}`);
                } else {
                    setError(error.response?.data?.message || error.message);
                    console.error(`Error fetching vendor catalogue data: ${error.response?.data?.message || error.message}`);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [APP_URL, shopId]);

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
                const response = await axios.put(`${APP_URL}/catalogupdatestatus/${recordToUpdate.id}`,
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
    const handleDelete = useCallback((id, item_title) => {
        setCatalogueToDelete({ id, item_title });
        setIsDeleteModalOpen(true);
    }, []);

    // Handle delete functionality
    const handleConfirmDelete = async () => {
        if (catalogueToDelete) {
            setIsDeleting(true);
            try {
                const response = await axios.delete(`${APP_URL}/ma-delete-catalog/${catalogueToDelete.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json;"
                    }
                });
                setData(prevData => prevData.filter(catalogue => catalogue.id !== catalogueToDelete.id));
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
                setCatalogueToDelete(null);
            }
        }
    };

    // Handle business edit
    const handleEdit = async (id, catalogueName) => {
        navigate(`/edit-catalogue/${shopName}/${shopId}/${id}/${catalogueName}`)
    }

    // Table configuration
    const columns = useMemo(
        () => [
            {
                header: 'Sr No',
                accessor: 'serialNumber',
                cell: ({ row }) => <div>{row.index + 1}</div>
            },
            {
                header: 'Name',
                accessorKey: 'item_title',
                cell: ({ row }) => (
                    <div className="flex items-center py-4">
                        <img src={row.original.primary_catalog_image ? `${IMG_URL}/catalog-image/thumb/${row.original.primary_catalog_image}` : 'https://i.pinimg.com/564x/37/08/99/3708994bdca38cd8dbea509f233f3cf4.jpg'}
                            alt={row.original.item_title}
                            className="w-20 h-20 object-cover rounded-lg mr-4"
                            onError={(e) => { e.target.src = `https://i.pinimg.com/564x/37/08/99/3708994bdca38cd8dbea509f233f3cf4.jpg` }}
                        />
                        <div>
                            <h3 className="font-semibold text-lg">{row.original.item_title}</h3>
                        </div>
                    </div>
                ),
            },
            {
                header: 'Description',
                accessorKey: 'item_description',
                cell: ({ row }) => (
                    <div className="py-4">
                        <TruncatedText text={row.original.item_description} maxLength={100} />
                    </div>
                )
            },
            {
                header: 'Price',
                accessorKey: 'price',
            },
            {
                header: 'Sales Price',
                accessorKey: 'sale_price',
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
                header: 'Actions',
                cell: ({ row }) => (
                    <div className=' flex'>
                        <button onClick={() => handleEdit(row.original.id, row.original.item_title)} title='Edit' className="text-blue-500 mr-4" aria-label="Edit"><FaEdit /></button>
                        <button onClick={() => handleDelete(row.original.id, row.original.item_title)} title='Delete' className="text-red-500" aria-label="Delete"><FaTrash /></button>
                    </div>
                ),
            },
            {
                header: 'Extras',
                cell: ({ row }) => (
                    <div className='flex'>
                        <Link to={`/catalogue-gallery/${shopId}/${shopName}/${row.original.id}/${row.original.slug}`} title='Gallery' className="text-blue-500 mr-4" aria-label="Gallery">
                            <FaImages />
                        </Link>
                        <Link to={`/catalogue-offers/${shopId}/${shopName}/${row.original.id}/${row.original.slug}`} title='Offers' className="text-blue-500 mr-4" aria-label="Offers">
                            <MdOutlineLocalOffer size={17} />
                        </Link>
                        <Link to={`/catalogue-reviews/${shopId}/${shopName}/${row.original.id}/${row.original.slug}`} title='Reviews' className="text-blue-500 mr-4" aria-label="Reviews">
                            <FaRegStar />
                        </Link>
                        <Link to={`/catalogue-faq/${shopId}/${shopName}/${row.original.id}/${row.original.slug}`} title='FAQ' className="text-blue-500 mr-4" aria-label="FAQ">
                            <FaQuestion />
                        </Link>
                    </div>
                ),
            }
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [IMG_URL, handleDelete, handleStatusClick, shopId, shopName]
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
        if (isLoading) {
            return <LoadingFallback />;
        }

        if (error || data.length === 0) {
            return <div className="text-center py-4">No records found</div>;
        }

        return table.getRowModel().rows.map(row => (
            <div key={row.id} className="bg-white shadow rounded-lg p-4 mb-4 space-y-2">
                <div className="flex items-center mb-4">
                    <img
                        src={row.original.primary_catalog_image ? `${IMG_URL}/catalog-image/thumb/${row.original.primary_catalog_image}` : 'https://i.pinimg.com/564x/37/08/99/3708994bdca38cd8dbea509f233f3cf4.jpg'}
                        alt={row.original.item_title}
                        className="w-20 h-20 object-cover rounded-lg mr-4"
                        onError={(e) => { e.target.src = 'https://i.pinimg.com/564x/37/08/99/3708994bdca38cd8dbea509f233f3cf4.jpg'; }}
                    />
                    <div>
                        <h3 className="font-semibold text-lg">{row.original.item_title}</h3>
                        <TruncatedText text={row.original.item_description} maxLength={100} />
                    </div>
                </div>
                <p><strong>Price:</strong> {row.original.price}</p>
                <p><strong>Sales Price:</strong> {row.original.sale_price}</p>
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
                    <Link to={`/catalogue-gallery/${shopId}/${shopName}/${row.original.id}/${row.original.item_title}`} className="text-blue-500" aria-label="Gallery">
                        <FaImages />
                    </Link>
                    <Link to={`/catalogue-reviews/${shopId}/${shopName}/${row.original.id}/${row.original.item_title}`} className="text-blue-500" aria-label="Reviews">
                        <FaRegStar />
                    </Link>
                    <Link to={`/catalogue-faq/${shopId}/${shopName}/${row.original.id}/${row.original.item_title}`} className="text-blue-500" aria-label="FAQ">
                        <FaQuestion />
                    </Link>
                    <button onClick={() => handleEdit(row.original.id, row.original.item_title)} className="text-blue-500" aria-label="Edit">
                        <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(row.original.id, row.original.item_title)} className="text-red-500" aria-label="Delete">
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
                <h2 className="text-2xl font-bold mb-4 md:mb-0">Catalogues for {slugToShopName(shopName)}</h2>
                <div className='flex md:flex-row items-start justify-start gap-2'>
                    <Link
                        to={`/add-catalogue/${shopName}/${shopId}`}
                        className="px-4 py-2 bg-[#04AA6D] shadow text-white rounded hover:bg-[#04aa6ddf] transition-colors flex items-center"
                    >
                        <FaPlus className="mr-2" /> Add catalogue
                    </Link>
                    <Link
                        to='/my-shops'
                        className="px-4 py-2 bg-[#fa2964e6] border shadow text-white rounded hover:bg-pink-600 hover:text-white transition-colors"
                    >
                        Back
                    </Link>
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

            {catalogueToDelete && (
                <DeleteModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={handleConfirmDelete}
                    message={`Are you sure you want to delete catalogue ${catalogueToDelete.item_title}?`}
                    isLoading={isDeleting}
                />
            )}

            <StatusModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirm}
                isLoading={isUpdating}
                message={`Are you sure you want to ${recordToUpdate?.status === '1' ? 'deactivate' : 'activate'} catalogue ${recordToUpdate?.item_title}?`}
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
                            className="px-4 py-2 bg-[#fa2964e6] text-white rounded disabled:bg-gray-300"
                        >
                            Previous
                        </button>
                        <div className="flex space-x-2">
                            {[...Array(table.getPageCount())].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => table.setPageIndex(index)}
                                    className={`px-3 py-1 rounded ${table.getState().pagination.pageIndex === index
                                        ? 'bg-[#fa2964e6] text-white'
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
                            className="px-4 py-2 bg-[#fa2964e6] text-white rounded disabled:bg-gray-300"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

const TruncatedText = ({ text, maxLength = 100 }) => {
    const truncatedText = text.length > maxLength ? text.substr(0, maxLength) + '...' : text;

    return (
        <div className="group relative">
            <div className="max-w-xs overflow-hidden">
                {truncatedText}
            </div>
            {text.length > maxLength && (
                <div className="absolute z-10 invisible group-hover:visible bg-gray-800 text-white p-2 rounded shadow-lg mt-2 text-sm w-72">
                    {text}
                </div>
            )}
        </div>
    );
};

export default Catalogues;
