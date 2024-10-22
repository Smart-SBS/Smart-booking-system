import React, { useState } from 'react'

import CardAction from '../../../Widgets/CardAction/CardAction'
import General from './Components/General'
import Billing from './Components/Billing'
import Members from './Components/Members'
import Security from './Components/Security'
import Notifications from './Components/Notifications'

import profileImage from '../../../../assets/images/profile_av.png';

const AccountSetting = () => {
    const [activeTab, setActiveTab] = useState('setting-general');

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    return (
        <>
            <div className="ps-2 pt-2 pb-1 page-body">
                <div className="card bg-transparent border-0">
                    <div className="card-header bg-card pb-0 z-2">
                        <h6 className="card-title mb-0">Account settings</h6>
                        <div className="dropdown card-action">
                            <CardAction />
                        </div>
                        <div className="w-100 mt-4">
                            <ul className="row g-lg-4 g-2 list-unstyled li_animate mb-4 mb-lg-5">
                                <li className="col-xl-4 col-lg-5 col-md-5 col-12">
                                    <div className="d-flex align-items-center">
                                        <img className="avatar lg rounded-circle border border-3" src={profileImage} alt="avatar" />
                                        <div className="ms-3">
                                            <h4 className="mb-0 text-gradient title-font">Radhika!</h4>
                                            <span className="text-muted small">Radhika.SBS@gmail.com</span>
                                        </div>
                                    </div>
                                </li>
                                <li className="col-xl-8 col-lg-7 col-md-7 col-12">
                                    <ul className="list-unstyled d-none d-lg-flex align-items-start justify-content-md-end p-0 mb-0 ps-5 ps-md-0 ms-4 ms-md-0">
                                        <li className="px-lg-4 px-3 ps-0">
                                            <p className="text-uppercase text-muted small mb-1">Seats used</p>
                                            <div className="d-flex align-items-center"><span className="h4 mb-0">4 out of 6</span> <a className="btn btn-sm btn-outline-primary ms-2" href="#!">Upgrade</a></div>
                                        </li>
                                        <li className="px-lg-4 px-3 border-start">
                                            <p className="text-uppercase text-muted small mb-1">Default role</p>
                                            <div className="d-flex align-items-center"><span className="h4 mb-0">Staff</span><a className="btn btn-sm btn-dark ms-2" href="#!">Change</a></div>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <ul className="nav nav-tabs tab-card border-0 li_animate px-1 mb-0" role="tablist">
                                <li className="nav-item">
                                    <a className={`nav-link px-0 me-xl-4 me-3 fs-6 ${activeTab === 'setting-general' ? 'active' : ''}`} data-bs-toggle="tab" href="#" onClick={() => handleTabClick('setting-general')}>
                                        <i className="fa fa-gear"></i>
                                        <span className="ps-1">General</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className={`nav-link px-0 me-xl-4 me-3 fs-6 ${activeTab === 'setting-billing' ? 'active' : ''}`} data-bs-toggle="tab" href="#" onClick={() => handleTabClick('setting-billing')}>
                                        <i className="fa fa-credit-card"></i>
                                        <span className="ps-1">Billing</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className={`nav-link px-0 me-xl-4 me-3 fs-6 ${activeTab === 'setting-members' ? 'active' : ''}`} data-bs-toggle="tab" href="#" onClick={() => handleTabClick('setting-members')}>
                                        <i className="fa fa-users"></i>
                                        <span className="ps-1">Members</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className={`nav-link px-0 me-xl-4 me-3 fs-6 ${activeTab === 'setting-security' ? 'active' : ''}`} data-bs-toggle="tab" href="#" onClick={() => handleTabClick('setting-security')}>
                                        <i className="fa fa-shield"></i>
                                        <span className="ps-1">Security</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className={`nav-link px-0 me-xl-4 me-3 fs-6 ${activeTab === 'setting-notifications' ? 'active' : ''}`} data-bs-toggle="tab" href="#" onClick={() => handleTabClick('setting-notifications')}>
                                        <i className="fa fa-bell"></i>
                                        <span className="ps-1">Notifications</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="card-body z-1">
                        <div className="tab-content py-3">
                            <div id="setting-general" className={`tab-pane ${activeTab === 'setting-general' ? 'active' : ''}`}>
                                <General />
                            </div>
                            <div id="setting-billing" className={`tab-pane ${activeTab === 'setting-billing' ? 'active' : ''}`}>
                                <Billing />
                            </div>
                            <div id="setting-members" className={`tab-pane ${activeTab === 'setting-members' ? 'active' : ''}`}>
                                <Members />
                            </div>
                            <div id="setting-security" className={`tab-pane ${activeTab === 'setting-security' ? 'active' : ''}`}>
                                <Security />
                            </div>
                            <div id="setting-notifications" className={`tab-pane ${activeTab === 'setting-notifications' ? 'active' : ''}`}>
                                <Notifications />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccountSetting