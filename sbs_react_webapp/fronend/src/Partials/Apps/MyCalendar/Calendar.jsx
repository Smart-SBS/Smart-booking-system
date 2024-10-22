import React from 'react'

import CardAction from '../../Widgets/CardAction/CardAction';
import CalendarData from './Components/CalendarData';
import Meeting from './Components/Meeting';

import profileImage from '../../../assets/images/profile_av.png';

const Calendar = () => {
  return (
        <div className="ps-2 pt-2 pb-1 page-body">
            <div className="card bg-transparent border-0">
                <div className="card-header bg-card pb-0">
                    <h6 className="card-title mb-0">My calendar</h6>
                    <div className="dropdown card-action">
                      <CardAction/>
                    </div>
                    <div className="w-100 mt-4">
                        <ul className="row g-lg-4 g-2 list-unstyled li_animate">
                            <li className="col-md-6 col-12">
                                <div className="d-flex align-items-center">
                                    <img className="avatar lg rounded-circle border border-3" src={profileImage} alt="avatar"/>
                                    <div className="ms-3">
                                        <h4 className="mb-0 text-gradient title-font">Michelle!</h4>
                                        <span className="text-muted small">michelle.bvite@gmail.com</span>
                                    </div>
                                </div>
                            </li>
                            <li className="col-md-6 col-12">
                                <ul className="list-unstyled d-none d-md-flex align-items-start justify-content-md-end p-0 mb-0 ps-5 ps-md-0 ms-4 ms-md-0">
                                    <li className="px-lg-4 px-3 ps-0">
                                        <p className="text-muted mb-0">Meeting</p>
                                        <h5 className="mb-0">07</h5>
                                    </li>
                                    <li className="px-lg-4 px-3 border-start">
                                        <p className="text-muted mb-0">Zoom call</p>
                                        <h5 className="mb-0">13</h5>
                                    </li>
                                    <li className="ps-lg-4 ps-3 border-start">
                                        <p className="text-muted mb-0">Event's</p>
                                        <h5 className="mb-0">04</h5>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <ul className="nav nav-tabs tab-card border-0 li_animate px-1 mb-0" role="tablist">
                            <li className="nav-item"><a className="nav-link px-0 me-xl-4 me-3 fs-6 active" data-bs-toggle="tab" href="#Calendar-month"><i className="fa fa-calendar"></i><span className="ps-1">Calendar</span></a></li>
                            <li className="nav-item"><a className="nav-link px-0 me-xl-4 me-3 fs-6" data-bs-toggle="tab" href="#Calendar-meeting"><i className="fa fa-slideshare"></i><span className="ps-1">Meeting</span></a></li>
                            <li className="nav-item dropdown ms-auto">
                                <a className="btn btn-primary fs-6" href="#" role="button" data-bs-toggle="dropdown"><i className="fa fa-plus-circle me-1"></i>Create</a>
                                <ul className="li_animate dropdown-menu dropdown-menu-end shadow rounded-4 p-2">
                                    <li><a className="dropdown-item rounded-pill" href="#">New Dashboard</a></li>
                                    <li><a className="dropdown-item rounded-pill" href="#">Generate Report</a></li>
                                    <li><a className="dropdown-item rounded-pill" href="#">Create Invoice</a></li>
                                    <li><a className="dropdown-item rounded-pill" href="#">Create Project</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card-body">
                    <div className="tab-content">
                        <div className="tab-pane fade show active" id="Calendar-month" role="tabpanel" tabIndex="0">
                          <CalendarData/>
                        </div>
                        <div className="tab-pane fade" id="Calendar-meeting" role="tabpanel" tabIndex="0">
                          <Meeting/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calendar