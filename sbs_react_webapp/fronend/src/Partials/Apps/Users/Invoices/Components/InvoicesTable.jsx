import React from 'react'
import { InvoiceData } from './InvoicesData';
import DataTable from '../../../../../Common/DataTable/DataTable';

const InvoicesTable = () => {
  const columns = [
    {
      Header: '#',
      accessor: 'no',
    },
    {
      Header: 'Client Name',
      accessor: 'clientname',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Amount',
      accessor: 'amount',
    },
    {
      Header: 'Status',
      accessor: 'status',
    },
    {
      Header: 'Action',
      accessor: 'action',
    },
  ];

  const data = InvoiceData.map((data) => {
    return {
      no: data.no,
      clientname: (
        <div className="d-flex align-items-center">
          <img className="avatar sm rounded-circle me-2" src={data.img} data-bs-toggle="tooltip" data-placement="top" title="Avatar Name" alt="Avatar" />
          <a href="#" title="">{data.client_name}</a>
        </div>),
      email: data.email,
      amount: data.amount,
      status: (<span className={`badge ${data.badge_color}`}>{data.status}</span>),
      action: (
        <>
          <button type="button" className="btn btn-sm btn-default" title="Send Invoice"><i className="fa fa-envelope"></i></button>
          <button type="button" className="btn btn-sm btn-default" title="Print"><i className="fa fa-print"></i></button>
          <button type="button" className="btn btn-sm btn-default" title="Delete"><i className="fa fa-trash"></i></button>
        </>
      ),
    };
  });

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default InvoicesTable