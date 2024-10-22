import { useRef } from 'react';

const Invoice = () => {
    const invoiceRef = useRef();

    const handlePrint = () => {
        const printContents = invoiceRef.current.innerHTML;
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
    };

    return (
        <div className="bg-gray-100 p-4 text-black">
            {/* Print Button */}
            <div className="flex justify-center mb-4">
                <button className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700" onClick={handlePrint}>
                    Print this Invoice
                </button>
            </div>

            <div ref={invoiceRef} className="bg-white p-8 max-w-full mx-auto shadow-md">
                {/* Header Section */}
                <div className="flex justify-between items-start mb-12">
                    <div className="flex items-center">
                        <img src="/logo.svg" alt="ListFind Logo" className="h-12" />
                    </div>
                    <div className="text-right">
                        <p className="font-semibold">Invoice #550</p>
                        <p className="text-gray-600">Due to: 4 Jan, 2020</p>
                    </div>
                </div>

                {/* Invoice Details Section */}
                <div className="flex justify-between mb-12">
                    <div>
                        <h2 className="font-semibold mb-2">Invoice To</h2>
                        <p>Carls Jhons</p>
                        <p>Acme Inc</p>
                        <p>Est St. 77 - Central Park, NYC</p>
                        <p>6781 45P</p>
                    </div>
                    <div className="text-right">
                        <h2 className="font-semibold mb-2">Payment Details</h2>
                        <p>VAT: 1425782</p>
                        <p>VAT ID: 10253642</p>
                        <p>Payment Type: Root</p>
                        <p>Name: John Doe</p>
                    </div>
                </div>

                {/* Invoice Table Section */}
                <table className="w-full mb-12">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="text-left py-2 font-semibold">DESCRIPTION</th>
                            <th className="text-right py-2 font-semibold">PRICE</th>
                            <th className="text-right py-2 font-semibold">VAT (10%)</th>
                            <th className="text-right py-2 font-semibold">TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="py-4">Standard Plan</td>
                            <td className="text-right">$40</td>
                            <td className="text-right">$7.55</td>
                            <td className="text-right">$47.55</td>
                        </tr>
                    </tbody>
                </table>

                {/* Total Section */}
                <div className="bg-gray-800 text-white p-4">
                    <div className="flex justify-end">
                        <div className="w-64">
                            <div className="flex justify-between mb-2">
                                <span>Sub - Total</span>
                                <span>$47.55</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Discount</span>
                                <span>10%</span>
                            </div>
                            <div className="flex justify-between font-semibold">
                                <span>Grand Total</span>
                                <span>$42.79</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Invoice;