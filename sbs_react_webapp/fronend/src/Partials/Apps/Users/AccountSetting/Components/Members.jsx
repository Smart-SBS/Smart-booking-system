import React from 'react'

import avatar1 from '../../../../../assets/images/xs/avatar1.jpg';
import avatar2 from '../../../../../assets/images/xs/avatar2.jpg';
import avatar3 from '../../../../../assets/images/xs/avatar3.jpg';
import CardEllipsis from '../../../../Widgets/CardEllipsis/CardEllipsis';

const Members = () => {
    return (
        <ul className="row g-3 list-unstyled li_animate">
            <li className="col-12">
                <div className="card">
                    <div className="d-flex justify-content-between p-3">
                        <h5 className="card-title fw-normal mb-0">Members</h5>
                        {/* <!--[ Dropdown ]--> */}
                        <div className="dropdown">
                            <button className="btn btn-sm btn-primary" type="button" data-bs-toggle="dropdown">Invite member</button>
                            <form className="dropdown-menu dropdown-menu-end border-0 rounded-4 shadow" style={{ width: "300px" }}>
                                <div className="card-header">
                                    <h6 className="card-title mb-0">Invite a member</h6>
                                    <span className="badge bg-primary">2 seats left</span>
                                </div>
                                <div className="card-body">
                                    <div className="row g-0 align-items-center mb-2">
                                        <div className="col-3">
                                            <label className="mb-0">Name</label>
                                        </div>
                                        <div className="col">
                                            <input className="form-control form-control-flush" type="text" placeholder="Full name" />
                                        </div>
                                    </div>
                                    {/* <!--[ row end ]--> */}
                                    <div className="row g-0 align-items-center mb-2">
                                        <div className="col-3">
                                            <label className="mb-0">Email</label>
                                        </div>
                                        <div className="col">
                                            <input className="form-control form-control-flush" type="text" placeholder="Email address" />
                                        </div>
                                    </div>
                                    {/* <!--[ row end ]--> */}
                                    <div className="row g-0 align-items-center">
                                        <div className="col-3">

                                        </div>
                                        <div className="col">
                                            <button className="btn btn-block btn-primary" type="button">Invite member</button>
                                        </div>
                                    </div>
                                    {/* <!--[ row end ]--> */}
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="list-group list-group-flush mb-0">
                        <div className="list-group-item py-3">
                            <div className="row align-items-center">
                                <div className="col-auto">
                                    <a href="#" className="avatar"><img src={avatar1} alt="..." className="avatar rounded-circle" /></a>
                                </div>
                                <div className="col-5 ms-2">
                                    <h6 className="mb-0"><a href="#">Pruthviraj Shinde</a></h6>
                                    <small className="text-muted">Pruthviraj.Shinde@company.com</small>
                                </div>
                                <div className="col-auto ms-auto mr-md-3">
                                    <select className="form-control custom-select" data-bs-toggle="select">
                                        <option value="1">Admin</option>
                                        <option value="2">Staff</option>
                                        <option value="3">Custom</option>
                                    </select>
                                </div>
                                <div className="col-auto">
                                    <CardEllipsis />
                                </div>
                            </div>
                            {/* <!--[ row end ]--> */}
                        </div>
                        <div className="list-group-item py-3">
                            <div className="row align-items-center">
                                <div className="col-auto">
                                    <a href="#" className="avatar"><img src={avatar2} alt="..." className="avatar rounded-circle" /></a>
                                </div>
                                <div className="col-5 ms-2">
                                    <h6 className="mb-0"><a href="#">Shital Chaudhary</a></h6>
                                    <small className="text-muted">Shital.Chaudhary@company.com</small>
                                </div>
                                <div className="col-auto ms-auto mr-md-3">
                                    <select className="form-control custom-select" data-bs-toggle="select">
                                        <option value="1">Admin</option>
                                        <option value="2">Staff</option>
                                        <option value="3">Custom</option>
                                    </select>
                                </div>
                                <div className="col-auto">
                                    <CardEllipsis />
                                </div>
                            </div>
                            {/* <!--[ row end ]--> */}
                        </div>
                        <div className="list-group-item py-3">
                            <div className="row align-items-center">
                                <div className="col-auto">
                                    <a href="#" className="avatar"><img src={avatar3} alt="..." className="avatar rounded-circle" /></a>
                                </div>
                                <div className="col-5 ms-2">
                                    <h6 className="mb-0"><a href="#">Arpita Salvi</a></h6>
                                    <small className="text-muted">Arpita.Salvi@company.com</small>
                                </div>
                                <div className="col-auto ms-auto mr-md-3">
                                    <select className="form-control custom-select" data-bs-toggle="select">
                                        <option value="1">Admin</option>
                                        <option value="2">Staff</option>
                                        <option value="3">Custom</option>
                                    </select>
                                </div>
                                <div className="col-auto">
                                    <CardEllipsis />
                                </div>
                            </div>
                            {/* <!--[ row end ]--> */}
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    )
}

export default Members