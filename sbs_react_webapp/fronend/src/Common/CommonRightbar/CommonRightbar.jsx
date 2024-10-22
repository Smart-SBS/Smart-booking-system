import { useState, useEffect } from 'react';
import axios from 'axios';
import { Nav } from 'react-bootstrap'
import Tasks from './Components/Tasks';
import Emails from './Components/Emails';
import { Link } from 'react-router-dom';

const CommonRightbar = () => {
    // Access token
    const token = localStorage.getItem("jwtToken");

    // API URL
    const APP_URL = import.meta.env.VITE_API_URL || '/api';
    const Img_url = import.meta.env.VITE_IMG_URL;

    // State initialization
    const [activeTab, setActiveTab] = useState('pills_today');
    const [newUsers, setNewUsers] = useState([]);

    const handleTabSelect = (tabId) => {
        setActiveTab(tabId);
    };

    useEffect(() => {
        const fetchNewUsers = async () => {
            if (token) {
                try {
                    const response = await axios.get(`${APP_URL}/api/users`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json;"
                        }
                    });
                    setNewUsers(response.data.users);
                } catch (error) {
                    setNewUsers([])
                }
            } else {
                setNewUsers([])
            }

        };

        fetchNewUsers();
    }, [APP_URL, token]);

    return (
        <aside className="ps-4 pe-3 py-3 rightbar" id='rightbar' data-bs-theme="none">
            <div className="navbar navbar-expand-xxl px-3 px-xl-0 py-0">
                <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex="-1" id="offcanvas_rightbar" aria-labelledby="offcanvas_rightbar">
                    <div className="offcanvas-header" style={{ "background": "var(--body-color)" }}>
                        <h5 className="offcanvas-title">Rightbar quick access</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body flex-column custom_scroll" style={{ "background": "var(--body-color)" }}>
                        <Nav className="nav nav-tabs tab-card justify-content-between px-0" role="tablist">
                            <Nav.Item className="nav-item" role="presentation"><Nav.Link className={`nav-link pt-0 ${activeTab === 'pills_today' ? 'active' : ''}`} onClick={() => handleTabSelect('pills_today')} role="tab">Today</Nav.Link></Nav.Item>
                            <Nav.Item className="nav-item" role="presentation"><Nav.Link className={`nav-link pt-0 ${activeTab === 'pills_wallet' ? 'active' : ''}`} onClick={() => handleTabSelect('pills_wallet')} role="tab">Wallet</Nav.Link></Nav.Item>
                            <Nav.Item className="nav-item" role="presentation"> <Nav.Link className={`nav-link pt-0 ${activeTab === 'pills_tasks' ? 'active' : ''}`} onClick={() => handleTabSelect('pills_tasks')} role="tab">Tasks</Nav.Link></Nav.Item>
                            <Nav.Item className="nav-item" role="presentation"><Nav.Link className={`nav-link pt-0 ${activeTab === 'pills_emails' ? 'active' : ''}`} onClick={() => handleTabSelect('pills_emails')} role="tab">Emails</Nav.Link></Nav.Item>
                        </Nav>
                        <div className="tab-content mt-3">
                            {/* <!--[ Start:: tab pane today ]--> */}
                            <div className={`tab-pane fade ${activeTab === 'pills_today' ? 'show active' : ''}`} id="pills_today" role="tabpanel">
                                <ul className="row g-2 list-unstyled li_animate mb-4">
                                    <li className="col-12">
                                        <div className="card border-0">
                                            <div className="card-header">
                                                <h6 className="card-title mb-0">New User</h6>
                                            </div>
                                            <div className="card-body avatar-list avatar-list-stacked ps-4">
                                                {newUsers.slice(0, 9).map((user, index) => (
                                                    <img
                                                        key={index}
                                                        className="avatar rounded-circle me-1"
                                                        src={user.profile ? `${Img_url}/profile/list/${user.profile}` : `${Img_url}/default/list/user.webp`}
                                                        data-bs-toggle="tooltip"
                                                        aria-label="Avatar"
                                                        data-bs-title="Avatar"
                                                        alt="avatar"
                                                        title={user.firstname + " " + user.lastname}
                                                        onError={(e) => { e.target.src = `${Img_url}/default/list/user.webp`; }}
                                                    />
                                                ))}
                                                {newUsers.length > 9 && (
                                                    <Link
                                                        to="/admin/users"
                                                        className="text-primary"
                                                        style={{
                                                            position: "absolute",
                                                            fontSize: "28px",
                                                            backgroundColor: "#fff",
                                                            borderRadius: "50%",
                                                            top: '57px'
                                                        }}
                                                        data-bs-toggle="tooltip"
                                                        aria-label="View all users"
                                                        title='View all users'
                                                        data-bs-title="View all users"
                                                    >
                                                        <i className="bi bi-plus"></i>
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <ul className="row g-4 list-unstyled li_animate mb-0">
                                    <li className="col-12">
                                        <h6 className="card-title mb-0">Trending on SBS</h6>
                                    </li>
                                    <li className="col-12 d-flex align-items-start">
                                        <div className="fs-3 text-muted lh-sm"><span className="d-inline-flex" style={{ "minWidth": "2.5rem" }}>01</span></div>
                                        <div className="text-truncate ms-2 ps-3 border-start dashed border-0">
                                            <span className="d-flex align-items-center mb-3">
                                                Radhika Sharma
                                            </span>
                                            <h6 className="text-truncate"><a href="/app/blog-detail.html" title="blog title" className="text-body">Unleashing the Power of ChatGPT</a></h6>
                                            <div className="d-flex align-items-center text-muted small">
                                                <span className="pe-3">Feb 20</span>
                                                <span>16 min read</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="col-12 d-flex align-items-start">
                                        <div className="fs-3 text-muted lh-sm"><span className="d-inline-flex" style={{ "minWidth": "2.5rem" }}>02</span></div>
                                        <div className="text-truncate ms-2 ps-3 border-start dashed border-0">
                                            <span className="d-flex align-items-center mb-3">
                                                Atharv Dange
                                            </span>
                                            <h6 className="text-truncate"><a href="/app/blog-detail.html" title="blog title" className="text-body">Designing for the Web</a></h6>
                                            <div className="d-flex align-items-center text-muted small">
                                                <span className="pe-3">Feb 20</span>
                                                <span>15 min read</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="col-12 d-flex align-items-start">
                                        <div className="fs-3 text-muted lh-sm"><span className="d-inline-flex" style={{ "minWidth": "2.5rem" }}>03</span></div>
                                        <div className="text-truncate ms-2 ps-3 border-start dashed border-0">
                                            <span className="d-flex align-items-center mb-3">
                                                Aarti Rathod
                                            </span>
                                            <h6 className="text-truncate"><a href="/app/blog-detail.html" title="blog title" className="text-body">Building Dynamic User Interfaces with Vue.js</a></h6>
                                            <div className="d-flex align-items-center text-muted small">
                                                <span className="pe-3">Feb 20</span>
                                                <span>10 min read</span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            {/* <!--[ Start:: tab pane Wallet ]--> */}
                            <div className={`tab-pane fade ${activeTab === 'pills_wallet' ? 'show active' : ''}`} id="pills_wallet" role="tabpanel">
                                <ul className="row g-1 list-unstyled li_animate">
                                    <li className="col-12">
                                        <div className="card border-0">
                                            <div className="card-header">
                                                <h6 className="mb-0">Total Balance</h6>
                                            </div>
                                            <div className="card-body">
                                                <h2 className="text-accent">$7,550.00</h2>
                                                <p className="text-muted">Wallet ID: Q0001212987</p>
                                                <div className="my-4">
                                                    <label className="d-flex justify-content-between">Bank<span>$248,000.00</span></label>
                                                    <div className="progress mt-1" style={{ "height": "1px" }}>
                                                        <div className="progress-bar bg-primary" role="progressbar" aria-valuenow="87" aria-valuemin="0" aria-valuemax="100" style={{ "width": "87%" }}></div>
                                                    </div>
                                                </div>
                                                <div className="mb-4">
                                                    <label className="d-flex justify-content-between">Cryptocurrency<span>$12,000.00</span></label>
                                                    <div className="progress mt-1" style={{ "height": "1px" }}>
                                                        <div className="progress-bar bg-primary" role="progressbar" aria-valuenow="56" aria-valuemin="0" aria-valuemax="100" style={{ "width": "56%" }}></div>
                                                    </div>
                                                </div>
                                                <div className="mb-4">
                                                    <label className="d-flex justify-content-between">Investment<span>$20,00.00</span></label>
                                                    <div className="progress mt-1" style={{ "height": "1px" }}>
                                                        <div className="progress-bar bg-primary" role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100" style={{ "width": "65%" }}></div>
                                                    </div>
                                                </div>
                                                <button className="btn px-3 btn-dark me-1">Deposit</button>
                                                <button className="btn px-3 btn-primary">Withdraw</button>
                                            </div>
                                            <div className="card-footer py-3">
                                                <span className="text-success">3.05%</span>
                                                <span className="text-muted"> March 31,2023</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="col-12 text-uppercase text-muted mt-4">
                                        <div className="d-flex justify-content-between small">
                                            <span>Quick access</span>
                                            <a href="#" aria-label="view all">View All</a>
                                        </div>
                                    </li>
                                    <li className="col-4">
                                        <a href="#" className="card border-0 text-center small text-decoration-none" aria-label="Cards">
                                            <div className="card-body px-2">
                                                <svg className="svg-stroke mb-2" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                    <path d="M3 5m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z"></path>
                                                    <path d="M3 10l18 0"></path>
                                                    <path d="M7 15l.01 0"></path>
                                                    <path d="M11 15l2 0"></path>
                                                </svg>
                                                <p className="mb-0">Cards</p>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="col-4">
                                        <a href="#" className="card border-0 text-center small text-decoration-none" aria-label="Transfer">
                                            <div className="card-body px-2">
                                                <svg className="svg-stroke mb-2" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                    <path d="M3 6a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                                                    <path d="M21 11v-3a2 2 0 0 0 -2 -2h-6l3 3m0 -6l-3 3"></path>
                                                    <path d="M3 13v3a2 2 0 0 0 2 2h6l-3 -3m0 6l3 -3"></path>
                                                    <path d="M15 18a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                                                </svg>
                                                <p className="mb-0">Transfer</p>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="col-4">
                                        <a href="#" className="card border-0 text-center small text-decoration-none" aria-label="Withdraw">
                                            <div className="card-body px-2">
                                                <svg className="svg-stroke mb-2" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                    <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12"></path>
                                                    <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4"></path>
                                                </svg>
                                                <p className="mb-0">Withdraw</p>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="col-4">
                                        <a href="#" className="card border-0 text-center small text-decoration-none" aria-label="Bill payments">
                                            <div className="card-body px-2">
                                                <svg className="svg-stroke mb-2" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                    <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16l-3 -2l-2 2l-2 -2l-2 2l-2 -2l-3 2"></path>
                                                    <path d="M14 8h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5m2 0v1.5m0 -9v1.5"></path>
                                                </svg>
                                                <p className="mb-0">Bill payments</p>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="col-4">
                                        <a href="#" className="card border-0 text-center small text-decoration-none" aria-label="Add Payee">
                                            <div className="card-body px-2">
                                                <svg className="svg-stroke mb-2" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                    <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                                                    <path d="M16 19h6"></path>
                                                    <path d="M19 16v6"></path>
                                                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4"></path>
                                                </svg>
                                                <p className="mb-0">Add Payee</p>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="col-4">
                                        <a href="#" className="card border-0 text-center small text-decoration-none" aria-label="Scan & Pay">
                                            <div className="card-body px-2">
                                                <svg className="svg-stroke mb-2" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                    <path d="M4 7v-1a2 2 0 0 1 2 -2h2"></path>
                                                    <path d="M4 17v1a2 2 0 0 0 2 2h2"></path>
                                                    <path d="M16 4h2a2 2 0 0 1 2 2v1"></path>
                                                    <path d="M16 20h2a2 2 0 0 0 2 -2v-1"></path>
                                                    <path d="M5 12l14 0"></path>
                                                </svg>
                                                <p className="mb-0">Scan & Pay</p>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            {/* <!--[ Start:: tab pane Tasks ]--> */}
                            <div className={`tab-pane fade ${activeTab === 'pills_tasks' ? 'show active' : ''}`} id="pills_tasks" role="tabpanel">
                                <Tasks />
                            </div>
                            {/* <!--[ Start:: tab pane Emails ]--> */}
                            <div className={`tab-pane fade ${activeTab === 'pills_emails' ? 'show active' : ''}`} id="pills_emails" role="tabpanel">
                                <Emails />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default CommonRightbar
