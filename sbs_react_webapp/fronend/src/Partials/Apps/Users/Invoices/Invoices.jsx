import React from 'react'
import CalenderTab from '../../../Widgets/CalenderTab/CalenderTab'
import InvoicesTable from './Components/InvoicesTable'

const Invoices = () => {
    return (
        <div className="px-4 py-3 page-body">
            <div className="row g-3">
                <div className="col-12">
                    <div className="card bg-card">
                        <div className="card-header">
                            <h5 className="mb-3">Recent Orders:</h5>
                            <button className="btn btn-primary" type="button">Create Orders</button>
                        </div>
                        <div className="card-body">
                            <div className="row g-2 mb-4">
                                <div className="col-lg-4 col-md-6 col-sm-12">
                                    <div className="card hr-arrow p-4" style={{ "--dynamic-color": "var(--theme-color1)" }}>
                                        <h6 className="mb-3">South Shyanne</h6>
                                        <ul className="small text-muted ps-3 lh-lg mb-0">
                                            <li>south.shyae@info.com</li>
                                            <li>Due Date: <span className="ms-2">12-7-2023</span></li>
                                            <li>ID: <span className="fw-bold ms-2 text-warning">#M0001</span></li>
                                            <li>Amount: <span className="badge rounded bg-secondary ms-2">$500</span></li>
                                        </ul>
                                        <a className="go-corner" href="#">
                                            <div className="go-arrow">→</div>
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-12">
                                    <div className="card hr-arrow p-4" style={{ "--dynamic-color": "var(--theme-color2)" }}>
                                        <h6 className="mb-3">Zoe Baker</h6>
                                        <ul className="small text-muted ps-3 lh-lg mb-0">
                                            <li>zoe.baker@info.com</li>
                                            <li>Due Date: <span className="ms-2">12-7-2023</span></li>
                                            <li>ID: <span className="fw-bold ms-2 text-warning">#M0002</span></li>
                                            <li>Amount: <span className="badge rounded bg-secondary ms-2">$1100</span></li>
                                        </ul>
                                        <a className="go-corner" href="#">
                                            <div className="go-arrow">→</div>
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-12 col-sm-12">
                                    <div className="card hr-arrow p-4" style={{ "--dynamic-color": "var(--theme-color3)" }}>
                                        <h6 className="mb-3">Colin Brown</h6>
                                        <ul className="small text-muted ps-3 lh-lg mb-0">
                                            <li>colinbrown@info.com</li>
                                            <li>Due Date: <span className="ms-2">12-7-2023</span></li>
                                            <li>ID: <span className="fw-bold ms-2 text-warning">#M0003</span></li>
                                            <li>Amount: <span className="badge rounded bg-secondary ms-2">$2000</span></li>
                                        </ul>
                                        <a className="go-corner" href="#">
                                            <div className="go-arrow">→</div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <CalenderTab />
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title fw-normal mb-0">Orders List</h5>
                        </div>
                        <div className="card-body">
                            <InvoicesTable />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Invoices