import { useState, useEffect, useMemo, useCallback } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table';
import LoadingFallback from "../utils/LoadingFallback";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import PaymentStatusModal from './PaymentStatusModal';

const MyOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [recordToUpdate, setRecordToUpdate] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const { token, userType, userId } = useSelector(state => state.auth);
    const API_URL = import.meta.env.VITE_API_URL;
    const IMG_URL = import.meta.env.VITE_IMG_URL

    useEffect(() => {
        const fetchOrders = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${API_URL}/ma-order/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    setOrders(response.data.Orders);
                }
            } catch (err) {
                setError(err.message);
                toast.error(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [API_URL, userId, token]);

    // Handle status click callback
    const handlePaymentStatusClick = useCallback((record) => {
        setRecordToUpdate(record);
        setIsModalOpen(true);
    }, []);

    // Handle status change functionality
    const handleConfirm = useCallback(async () => {
        if (recordToUpdate) {
            setIsUpdating(true);
            try {
                const newStatus = recordToUpdate.payment_status === 'Paid' ? 'Unpaid' : 'Paid';
                const response = await axios.put(`${API_URL}/ma-update-payment-status/${recordToUpdate.payment_id}`,
                    { payment_status: newStatus },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setOrders(prevData =>
                    prevData.map(item =>
                        item.payment_id === recordToUpdate.payment_id ? { ...item, payment_status: newStatus } : item
                    )
                );

                toast.success(response.data.message);
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to update status");
            } finally {
                setIsUpdating(false);
            }
        }
        setIsModalOpen(false);
    }, [recordToUpdate, API_URL, token]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const columns = useMemo(
        () => {
            const baseColumns = [
                {
                    header: 'Order Details',
                    accessorKey: 'item_title',
                    cell: ({ row }) => (
                        <div className="flex items-center py-4">
                            <img src={`${IMG_URL}/catalog-image/thumb/${row.original.primary_catalog_image}`}
                                alt={row.original.item_title}
                                className="w-20 h-20 object-cover rounded-lg mr-4"
                                onError={(e) => { e.target.src = `https://via.placeholder.com/150` }}
                            />
                            <div>
                                <h3 className="font-semibold text-lg">{row.original.item_title}</h3>
                                <p>{row.original.order_number}</p>
                            </div>
                        </div>
                    ),
                },
                {
                    header: 'Price',
                    accessorKey: 'final_price',
                    cell: ({ row }) => (
                        <div>₹{parseFloat(row.original.final_price).toFixed(2)}</div>
                    ),
                },
                {
                    header: 'Payment method',
                    accessorKey: 'payment_method',
                    cell: ({ row }) => (
                        <div>{row.original.payment_method}</div>
                    ),
                },
                {
                    header: 'Date',
                    accessorKey: 'date',
                    cell: ({ row }) => (
                        <div>{`${row.original.visit_date} at ${row.original.visit_time}`}</div>
                    ),
                },
            ];

            if (userType === 'vendor') {
                baseColumns.push(
                    {
                        header: 'User',
                        accessorKey: 'user',
                        cell: ({ row }) => (
                            <div>{row.original.firstname} {row.original.lastname}</div>
                        ),
                    },
                    {
                        header: 'Payment Status',
                        accessorKey: 'payment_status',
                        cell: ({ row }) => (
                            <button
                                onClick={() => handlePaymentStatusClick(row.original)}
                                className={`p-2 rounded`}
                                style={{
                                    backgroundColor: row.original.payment_status === 'Paid' ? '#28a745' : '#f58442',
                                    borderColor: row.original.payment_status === 'Paid' ? '#28a745' : '#f58442',
                                    color: '#ffffff',
                                    width: '80px',
                                    height: '40px'
                                }}
                            >
                                {row.original.payment_status === 'Paid' ? 'Paid' : 'Unpaid'}
                            </button>
                        ),
                    }
                );
            }

            return baseColumns;
        },
        [IMG_URL, handlePaymentStatusClick, userType]
    );

    // Handle close modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const table = useReactTable({
        data: orders,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 5,
            },
        },
    });

    // const handleViewDetails = (order) => {
    //     // Implement view details functionality
    //     console.log("View details for order:", order);
    // };

    const renderTableBody = () => {
        if (isLoading) {
            return (
                <tr>
                    <td colSpan={columns.length} className="text-center py-4">
                        <LoadingFallback />
                    </td>
                </tr>
            );
        }

        if (error || orders.length === 0) {
            return (
                <tr>
                    <td colSpan={columns.length} className="text-center py-4">
                        No orders found
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

        if (error || orders.length === 0) {
            return <div className="text-center py-4">No orders found</div>;
        }

        return orders.map(order => (
            <div key={order.id} className="bg-white shadow rounded-lg p-4 mb-4 space-y-1">
                <div className="flex items-center mb-2">
                    <img src={`${IMG_URL}/catalog-image/thumb/${order.primary_catalog_image}`}
                        alt={order.item_title}
                        className="w-20 h-20 object-cover rounded-lg mr-4"
                        onError={(e) => { e.target.src = `https://via.placeholder.com/150` }}
                    />
                    <div>
                        <h3 className="font-semibold text-lg">{order.item_title}</h3>
                        <p>{order.firstname} {order.lastname}</p>
                    </div>
                </div>
                <p><strong>Price:</strong> ₹{parseFloat(order.sale_price).toFixed(2)}</p>
                <p><strong>Date:</strong> {formatDate(order.updated_at)}</p>
                {/* <div className="mt-2">
                    <button
                        onClick={() => handleViewDetails(order)}
                        className="text-blue-500"
                        aria-label="View Details"
                    >
                        <FaEye /> View Details
                    </button>
                </div> */}
            </div>
        ));
    };

    return (
        <div className="container mx-auto p-4 text-black shadow-md bg-white">
            <Toaster />
            <div className="mb-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold">My Orders</h2>
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

            <PaymentStatusModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirm}
                isLoading={isUpdating}
                message={`Are you sure you want to update the payment status of the order ${recordToUpdate?.item_title}?`}
            />

            {/* Mobile view */}
            <div className="md:hidden">
                {renderMobileView()}
            </div>

            {orders.length > 5 && !isLoading && !error && (
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
            )}
        </div>
    );
};

export default MyOrdersPage;