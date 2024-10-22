import React from 'react'
import CardEllipsis from '../../../Widgets/CardEllipsis/CardEllipsis';

import avatar1 from '../../../../assets/images/xs/avatar1.jpg';
import avatar2 from '../../../../assets/images/xs/avatar2.jpg';
import avatar3 from '../../../../assets/images/xs/avatar3.jpg';
import avatar4 from '../../../../assets/images/xs/avatar4.jpg';
import avatar5 from '../../../../assets/images/xs/avatar5.jpg';
import avatar6 from '../../../../assets/images/xs/avatar6.jpg';
import avatar7 from '../../../../assets/images/xs/avatar7.jpg';
import avatar8 from '../../../../assets/images/xs/avatar8.jpg';
import avatar9 from '../../../../assets/images/xs/avatar9.jpg';

const Meeting = () => {
  return (
        <ul className="row g-4 list-unstyled li_animate justify-content-between">
            <li className="col-xxl-8 col-xl-8 col-lg-8">
                <div className="date">
                    <div className="date-header d-flex align-items-center mb-1">
                        <span className="display-4 fw-bold">12</span>
                        <div className="ms-2">
                            <h6 className="mb-0">Tuesday - Today</h6>
                            <span className="text-muted small">January 2023</span>
                        </div>
                    </div>
                    <ul className="list-unstyled ms-sm-5 ps-sm-4" id="DateTuesday">
                        <li className="d-flex align-items-center border dashed p-3 rounded-4 mb-2">
                            <span className="my-handle pe-3">::</span>
                            <div className="d-flex align-items-center flex-grow-1">
                                <div className="avatar rounded-circle no-thumbnail"><i className="fa fa-bell"></i></div>
                                <div className="ms-3">
                                    <span className="text-muted small">10:45 - 11:30 AM</span>
                                    <h6 className="mb-0">Team Meeting with Designer</h6>
                                </div>
                            </div>
                            <div className="d-none d-sm-flex px-4">
                                <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Avatar"><img className="avatar sm rounded-circle" src={avatar3} alt="avatar"/></a>
                                <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Avatar"><img className="avatar sm rounded-circle" src={avatar1} alt="avatar"/></a>
                                <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Avatar"><img className="avatar sm rounded-circle" src={avatar7} alt="avatar"/></a>
                                <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Avatar"><img className="avatar sm rounded-circle" src={avatar9} alt="avatar"/></a>
                            </div>
                            <CardEllipsis/>
                        </li>
                        <li className="d-flex align-items-center border dashed p-3 rounded-4 mb-2">
                            <span className="my-handle pe-3">::</span>
                            <div className="d-flex align-items-center flex-grow-1">
                                <div className="avatar rounded-circle no-thumbnail"><i className="fa fa-star"></i></div>
                                <div className="ms-3">
                                    <span className="text-muted small">11:15 - 11:30 PM</span>
                                    <h6 className="mb-0">Clients Call Update</h6>
                                </div>
                            </div>
                            <div className="d-none d-sm-flex px-4">
                                <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Avatar"><img className="avatar sm rounded-circle" src={avatar6} alt="avatar"/></a>
                                <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Avatar"><img className="avatar sm rounded-circle" src={avatar8} alt="avatar"/></a>
                            </div>
                            <CardEllipsis/>
                        </li>
                        <li className="d-flex align-items-center border dashed p-3 rounded-4 mb-2">
                            <span className="my-handle pe-3">::</span>
                            <div className="d-flex align-items-center flex-grow-1">
                                <div className="avatar rounded-circle no-thumbnail"><i className="fa fa-star"></i></div>
                                <div className="ms-3">
                                    <span className="text-muted small">2:00 - 2:30 PM</span>
                                    <h6 className="mb-0">Weekly review</h6>
                                </div>
                            </div>
                            <div className="d-none d-sm-flex px-4">
                                <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Avatar"><img className="avatar sm rounded-circle" src={avatar3} alt="avatar"/></a>
                                <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Avatar"><img className="avatar sm rounded-circle" src={avatar1} alt="avatar"/></a>
                                <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Avatar"><img className="avatar sm rounded-circle" src={avatar7} alt="avatar"/></a>
                                <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Avatar"><img className="avatar sm rounded-circle" src={avatar9} alt="avatar"/></a>
                            </div>
                            <CardEllipsis/>
                        </li>
                    </ul>
                </div>
                <div className="date mt-5 text-muted">
                    <div className="date-header d-flex align-items-center mb-1">
                        <span className="display-4 fw-bold">13</span>
                        <div className="ms-2">
                            <h6 className="mb-0">Wednesday</h6>
                            <span className="text-muted small">January 2023</span>
                        </div>
                    </div>
                </div>
                <div className="date mt-5">
                    <div className="date-header d-flex align-items-center mb-1">
                        <span className="display-4 fw-bold">14</span>
                        <div className="ms-2">
                            <h6 className="mb-0">Thursday</h6>
                            <span className="text-muted small">January 2023</span>
                        </div>
                    </div>
                    <ul className="list-unstyled ms-sm-5 ps-sm-4" id="DateWednesday">
                        <li className="d-flex align-items-center border dashed p-3 rounded-4 mb-2">
                            <span className="my-handle pe-3">::</span>
                            <div className="d-flex align-items-center flex-grow-1">
                                <div className="avatar rounded-circle no-thumbnail"><i className="fa fa-bell"></i></div>
                                <div className="ms-3">
                                    <span className="text-muted small">10:45 - 11:30 AM</span>
                                    <h6 className="mb-0">Team Meeting with Clients</h6>
                                </div>
                            </div>
                            <div className="d-none d-sm-flex px-4">
                                <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Avatar"><img className="avatar sm rounded-circle" src={avatar2} alt="avatar"/></a>
                                <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Avatar"><img className="avatar sm rounded-circle" src={avatar4} alt="avatar"/></a>
                                <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Avatar"><img className="avatar sm rounded-circle" src={avatar5} alt="avatar"/></a>
                            </div>
                            <CardEllipsis/>
                        </li>
                        <li className="d-flex align-items-center border dashed p-3 rounded-4 mb-2">
                            <span className="my-handle pe-3">::</span>
                            <div className="d-flex align-items-center flex-grow-1">
                                <div className="avatar rounded-circle no-thumbnail"><i className="fa fa-star"></i></div>
                                <div className="ms-3">
                                    <span className="text-muted small">2:00 - 2:30 PM</span>
                                    <h6 className="mb-0">Weekly review</h6>
                                </div>
                            </div>
                            <div className="d-none d-sm-flex px-4">
                                <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Avatar"><img className="avatar sm rounded-circle" src={avatar2} alt="avatar"/></a>
                                <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Avatar"><img className="avatar sm rounded-circle" src={avatar5} alt="avatar"/></a>
                                <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Avatar"><img className="avatar sm rounded-circle" src={avatar6} alt="avatar"/></a>
                                <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Avatar"><img className="avatar sm rounded-circle" src={avatar7} alt="avatar"/></a>
                                <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Avatar"><img className="avatar sm rounded-circle" src={avatar8} alt="avatar"/></a>
                                <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Avatar"><img className="avatar sm rounded-circle" src={avatar9} alt="avatar"/></a>
                            </div>
                            <CardEllipsis/>
                        </li>
                    </ul>
                </div>
            </li>
            <li className="col-xxl-3 col-xl-4 col-lg-4">
                <div className="card">
                    <div className="card-body">
                        <h6 className="text-uppercase text-muted mb-4">Next meeting</h6>
                        <h4 className="mb-0">Weekly review</h4>
                        <p className="text-muted small">Tuesday, January 12, 3:00 - 4:40 PM</p>
                        <button type="button" className="btn px-lg-3 py-lg-2 btn-primary">Join Now</button>
                    </div>
                </div>
            </li>
        </ul>
    )
}

export default Meeting