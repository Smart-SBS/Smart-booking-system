/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';

const Modal = ({ message, onClose }) => (
    <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
    }}>
        <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'center'
        }}>
            <div style={{ fontSize: '48px', color: '#4CAF50' }}>!</div>
            <h2>Notification</h2>
            <p>{message}</p>
            <div>
                <button
                    onClick={onClose}
                    style={{
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        margin: '10px',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    OK
                </button>
            </div>
        </div>
    </div>
);

const ExportButtons = ({ data }) => {
    const [modalMessage, setModalMessage] = useState('');
    const users = data || [];
    const headers = users.length > 0 ? Object.keys(users[0]) : [];

    const showModal = (message) => {
        setModalMessage(message);
    };

    const closeModal = () => {
        setModalMessage('');
    };

    const copyToClipboard = () => {
        const tsv = [
            headers.join('\t'),
            ...users.map(user =>
                headers.map(header => user[header]).join('\t')
            )
        ].join('\n');
        navigator.clipboard.writeText(tsv)
            .then(() => showModal('Table data copied to clipboard'))
            .catch(err => {
                showModal('Failed to copy table data');
            });
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(users);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "export.xlsx");
    };

    const exportToCSV = () => {
        const csvContent = "data:text/csv;charset=utf-8,"
            + [headers.join(','), ...users.map(user => headers.map(header => user[header]).join(','))].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "export.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [headers],
            body: users.map(user => headers.map(header => user[header])),
        });
        doc.save("export.pdf");
    };

    const print = () => {
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Print</title>');
        printWindow.document.write('<style>table { border-collapse: collapse; width: 100%; } th, td { border: 1px solid black; padding: 8px; text-align: left; }</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write('<h1>Exported Data</h1>');
        printWindow.document.write('<table>');
        printWindow.document.write(`<thead><tr>${headers.map(header => `<th>${header}</th>`).join('')}</tr></thead>`);
        printWindow.document.write('<tbody>');
        users.forEach(user => {
            printWindow.document.write(`<tr>${headers.map(header => `<td>${user[header]}</td>`).join('')}</tr>`);
        });
        printWindow.document.write('</tbody></table>');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <>
            <div className="d-flex gap-2">
                <button onClick={copyToClipboard} className="btn btn-secondary btn-sm">
                    COPY
                </button>
                <button onClick={exportToExcel} className="btn btn-secondary btn-sm">
                    EXCEL
                </button>
                <button onClick={exportToCSV} className="btn btn-secondary btn-sm">
                    CSV
                </button>
                <button onClick={exportToPDF} className="btn btn-secondary btn-sm">
                    PDF
                </button>
                <button onClick={print} className="btn btn-secondary btn-sm">
                    PRINT
                </button>
            </div>
            {modalMessage && <Modal message={modalMessage} onClose={closeModal} />}
        </>
    );
};

ExportButtons.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ExportButtons;