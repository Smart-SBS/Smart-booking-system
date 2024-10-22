import { useState, useEffect, useMemo, useCallback, Fragment } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import DeleteModal from './DeleteModal';
import LoadingFallback from "../utils/LoadingFallback";
import { Link, useParams } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';
import slugToShopName from '../utils/slugToShopName';

const FaqPage = () => {
    // Access token
    const token = useSelector(state => state.auth.token);

    // API URL
    const APP_URL = import.meta.env.VITE_API_URL;

    // Catalogue name, id, shop id and shop name from the params
    const { catalogueName, catalogueId, shopId, shopName } = useParams();

    const [data, setData] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [faqToDelete, setFaqToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [refresh, setRefresh] = useState(false)
    const [newFaq, setNewFaq] = useState({ question: '', answer: '' });
    const [editFaq, setEditFaq] = useState({ question: '', answer: '' });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${APP_URL}/ma-vendor-faqs/${catalogueId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.status === 200) {
                    setData(response.data.Faqs);
                }
            } catch (error) {
                if (error.response?.data?.message && typeof error.response.data.message === 'object') {
                    const errorMessages = Object.row.original.statuss(error.response.data.message).join(', ');
                    setError(errorMessages);
                    console.error(`Error fetching faq data: ${errorMessages}`);
                } else {
                    setError(error.response?.data?.message || error.message);
                    console.error(`Error fetching faq data: ${error.response?.data?.message || error.message}`);
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [APP_URL, catalogueId, refresh, token]);

    const handleDelete = useCallback((id, question) => {
        setFaqToDelete({ id, question });
        setIsDeleteModalOpen(true);
    }, []);

    const handleConfirmDelete = async () => {
        if (faqToDelete) {
            setIsDeleting(true);
            try {
                const response = await axios.delete(`${APP_URL}/ma-delete-faq/${faqToDelete.id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.status === 200) {
                    toast.success(response.data.message);
                    setRefresh(prev => !prev)
                }
            } catch (error) {
                toast.error(`Error deleting FAQ: ${error.response?.data?.message || error.message}`);
            } finally {
                setIsDeleting(false);
                setIsDeleteModalOpen(false);
                setFaqToDelete(null);
            }
        }
    };

    const handleAddFaq = async (e) => {
        const formData = new FormData();
        formData.append('question', newFaq.question);
        formData.append('answer', newFaq.answer)
        formData.append('catalog_id', catalogueId)
        e.preventDefault();
        try {
            const response = await axios.post(`${APP_URL}/ma-add-faq`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                toast.success(response.data.message);
                setShowAddModal(false);
                setRefresh(prev => !prev)
                setNewFaq({ question: '', answer: '' });
            }
        } catch (error) {
            toast.error(`Error adding FAQ: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleEditFaq = async (e) => {
        const formData = new FormData();
        formData.append('question', editFaq.question);
        formData.append('answer', editFaq.answer)
        formData.append('catalog_id', catalogueId)
        e.preventDefault();
        try {
            const response = await axios.post(`${APP_URL}/ma-edit-faq/${editFaq.id}`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                toast.success(response.data.message);
                setShowEditModal(false);
                setRefresh(prev => !prev)
            }
        } catch (error) {
            toast.error(`Error updating FAQ: ${error.response?.data?.message || error.message}`);
        }
    };

    const columns = useMemo(() => [
        {
            header: 'Sr No',
            cell: ({ row }) => <div>{row.index + 1}</div>
        },
        {
            header: 'Question',
            accessorKey: 'question',
        },
        {
            header: 'Answer',
            accessorKey: 'answer',
        },
        {
            header: 'Actions',
            cell: ({ row }) => (
                <div className='flex'>
                    <button onClick={() => {
                        setEditFaq({ id: row.original.id, question: row.original.question, answer: row.original.answer });
                        setShowEditModal(true);
                    }} title='Edit' className="text-blue-500 mr-4" aria-label="Edit"><FaEdit /></button>
                    <button onClick={() => handleDelete(row.original.id, row.original.question)} title='Delete' className="text-red-500" aria-label="Delete"><FaTrash /></button>
                </div>
            ),
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
    ], [handleDelete, refresh]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: 5 } },
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
                <div className="flex items-center mb-2">
                    {row.original.question}
                </div>
                <p><strong>Answer:</strong> {row.original.answer}</p>
                <div className="mt-3 flex gap-4 justify-start items-center">
                    <button onClick={() => {
                        setEditFaq({ id: row.original.id, question: row.original.question, answer: row.original.answer });
                        setShowEditModal(true);
                    }} title='Edit' className="text-blue-500 mr-4" aria-label="Edit"><FaEdit /></button>
                    <button onClick={() => handleDelete(row.original.id, row.original.question)} title='Delete' className="text-red-500" aria-label="Delete"><FaTrash /></button>
                </div>
            </div>
        ));
    };

    return (
        <div className="container mx-auto p-4 text-black shadow-md bg-white">
            <Toaster />
            <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
                <h2 className="text-2xl font-bold mb-4 md:mb-0">FAQ Page for {slugToShopName(catalogueName)}</h2>
                <div className='flex md:flex-row items-start justify-start gap-2'>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="px-4 py-2 bg-[#04AA6D] shadow text-white rounded hover:bg-[#04aa6ddf] transition-colors flex items-center"
                    >
                        <FaPlus className="mr-2" /> Add FAQ
                    </button>
                    <Link
                        to={`/catalogues/${shopName}/${shopId}`}
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
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {renderTableBody()}
                </tbody>
            </table>

            {/* Add FAQ Modal */}
            <Transition appear show={showAddModal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setShowAddModal(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div className="flex justify-between items-center mb-4">
                                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                            Add a FAQ
                                        </Dialog.Title>
                                        <button
                                            type="button"
                                            className="text-gray-400 hover:text-gray-500"
                                            onClick={() => setShowAddModal(false)}
                                        >
                                            <span className="sr-only">Close</span>
                                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    <form onSubmit={handleAddFaq} className="mt-4">
                                        <div className="mb-4">
                                            <label htmlFor="question" className="block text-sm font-medium text-gray-700">Question</label>
                                            <input
                                                type="text"
                                                id="question"
                                                name="question"
                                                value={newFaq.question}
                                                onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                                                className="mt-1 block px-3 py-2 w-full rounded-md border-gray-300 shadow-sm focus:border-[#fa2964e6] focus:ring-[#fa2964e6] sm:text-sm"
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="answer" className="block text-sm font-medium text-gray-700">Answer</label>
                                            <textarea
                                                id="answer"
                                                name="answer"
                                                rows="3"
                                                value={newFaq.answer}
                                                onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                                                className="mt-1 block px-3 py-2 w-full rounded-md border-gray-300 shadow-sm focus:border-[#fa2964e6] focus:ring-[#fa2964e6] sm:text-sm"
                                                required
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-[#fa2964e6] px-4 py-2 text-sm font-medium text-white hover:bg-pink-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fa2964e6] focus-visible:ring-offset-2"
                                        >
                                            Add FAQ
                                        </button>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            {/* Edit FAQ Modal */}
            <Transition appear show={showEditModal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setShowEditModal(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div className="flex justify-between items-center mb-4">
                                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                            Edit FAQ
                                        </Dialog.Title>
                                        <button
                                            type="button"
                                            className="text-gray-400 hover:text-gray-500"
                                            onClick={() => setShowEditModal(false)}
                                        >
                                            <span className="sr-only">Close</span>
                                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    <form onSubmit={handleEditFaq} className="mt-4">
                                        <div className="mb-4">
                                            <label htmlFor="edit_question" className="block text-sm font-medium text-gray-700">Question</label>
                                            <input
                                                type="text"
                                                id="edit_question"
                                                name="question"
                                                value={editFaq.question}
                                                onChange={(e) => setEditFaq({ ...editFaq, question: e.target.value })}
                                                className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-[#fa2964e6] focus:ring-[#fa2964e6] sm:text-sm"
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="edit_answer" className="block text-sm font-medium text-gray-700">Answer</label>
                                            <textarea
                                                id="edit_answer"
                                                name="answer"
                                                rows="3"
                                                value={editFaq.answer}
                                                onChange={(e) => setEditFaq({ ...editFaq, answer: e.target.value })}
                                                className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-[#fa2964e6] focus:ring-[#fa2964e6] sm:text-sm"
                                                required
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-[#fa2964e6] px-4 py-2 text-sm font-medium text-white hover:bg-pink-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fa2964e6] focus-visible:ring-offset-2"
                                        >
                                            Update FAQ
                                        </button>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            {faqToDelete && (
                <DeleteModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={handleConfirmDelete}
                    message={`Are you sure you want to delete faq ${faqToDelete.question}?`}
                    isLoading={isDeleting}
                />
            )}

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

export default FaqPage;