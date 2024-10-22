import React from 'react'
import { Link } from 'react-router-dom'

const FullScreenModal = () => {
    const handleClickLink = () => {
        // Programmatically trigger a click on the close button
        const closeButton = document.getElementById('modalCloseButton');
        if (closeButton) {
            closeButton.click();
        }
    };
    return (
        <div className="modal fade" id="FullscreenMenu" tabIndex="-1" aria-labelledby="FullscreenMenu" aria-hidden="true" data-bs-theme="dark">
            <div className="modal-dialog modal-fullscreen">
                <div className="modal-content border-4 border border-primary">
                    <div className="modal-header border-0">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="modalCloseButton"></button>
                    </div>
                    <div className="modal-body custom_scroll">
                        <div className="container-xxl">
                            <h5 className="text-light fw-light">Application</h5>
                            <ul className="row g-2 list-unstyled li_animate row-cols-lg-5 row-cols-md-3 row-cols-sm-3 row-cols-2 row-deck mb-lg-5 mb-4">
                                <li className="col">
                                    <Link as='a' className="card hr-arrow p-4" to="/app/inbox" title="Inbox" style={{ "--dynamic-color": "var(--theme-color1)" }} onClick={handleClickLink}>
                                        <svg className="mb-3" width="20" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.7" d="M4.97978 1C4.90484 1.00011 4.83088 1.01706 4.76338 1.0496C4.69587 1.08214 4.63654 1.12944 4.58978 1.188L1.53978 5H5.99978C6.13239 5 6.25957 5.05268 6.35334 5.14645C6.4471 5.24021 6.49978 5.36739 6.49978 5.5C6.49978 5.89782 6.65782 6.27936 6.93912 6.56066C7.22043 6.84196 7.60196 7 7.99978 7C8.39761 7 8.77914 6.84196 9.06044 6.56066C9.34175 6.27936 9.49978 5.89782 9.49978 5.5C9.49978 5.36739 9.55246 5.24021 9.64623 5.14645C9.74 5.05268 9.86717 5 9.99978 5H14.4598L11.4098 1.188C11.363 1.12944 11.3037 1.08214 11.2362 1.0496C11.1687 1.01706 11.0947 1.00011 11.0198 1H4.97978ZM3.80978 0.563C3.95017 0.387503 4.1282 0.245795 4.33071 0.148346C4.53322 0.050898 4.75504 0.000200429 4.97978 0L11.0198 0C11.2445 0.000200429 11.4663 0.050898 11.6689 0.148346C11.8714 0.245795 12.0494 0.387503 12.1898 0.563L15.8898 5.188C15.9315 5.24011 15.9624 5.30004 15.9806 5.36428C15.9988 5.42851 16.004 5.49574 15.9958 5.562L15.6058 8.686C15.5604 9.04889 15.3841 9.38271 15.1099 9.62469C14.8357 9.86667 14.4825 10.0001 14.1168 10H1.88278C1.51707 10.0001 1.16391 9.86667 0.889698 9.62469C0.61549 9.38271 0.43913 9.04889 0.393782 8.686L0.00378209 5.562C-0.00441416 5.49574 0.000742512 5.42851 0.0189479 5.36428C0.0371533 5.30004 0.0680387 5.24011 0.109782 5.188L3.80978 0.563Z" />
                                            <path opacity="0.2" d="M0.294097 11.0446C0.229438 11.0739 0.171762 11.1167 0.124907 11.17V11.169C0.0780298 11.2222 0.0429981 11.2847 0.0221368 11.3525C0.00127556 11.4202 -0.00493837 11.4917 0.00390735 11.562L0.393907 14.686C0.439256 15.0489 0.615615 15.3827 0.889823 15.6247C1.16403 15.8667 1.5172 16.0001 1.88291 16H14.1169C14.4826 16.0001 14.8358 15.8667 15.11 15.6247C15.3842 15.3827 15.5606 15.0489 15.6059 14.686L15.9959 11.562C16.0047 11.4917 15.9984 11.4203 15.9775 11.3525C15.9566 11.2848 15.9216 11.2223 15.8746 11.1691C15.8277 11.116 15.7701 11.0734 15.7055 11.0443C15.6409 11.0151 15.5708 11 15.4999 11H9.99991C9.8673 11 9.74012 11.0527 9.64635 11.1464C9.55259 11.2402 9.49991 11.3674 9.49991 11.5C9.49991 11.8978 9.34187 12.2794 9.06057 12.5607C8.77926 12.842 8.39773 13 7.99991 13C7.60208 13 7.22055 12.842 6.93925 12.5607C6.65794 12.2794 6.49991 11.8978 6.49991 11.5C6.49991 11.3674 6.44723 11.2402 6.35346 11.1464C6.25969 11.0527 6.13252 11 5.99991 11H0.499907C0.428915 11.0001 0.358755 11.0153 0.294097 11.0446Z" />
                                        </svg>
                                        <h6 className="title mb-1">Inbox <span className="badge rounded-pill bg-warning">11</span></h6>
                                        <p className="small text-muted mb-0 d-none d-xl-inline-flex">Description text here...</p>
                                        <div className="go-corner">
                                            <div className="go-arrow">→</div>
                                        </div>
                                    </Link>
                                </li>
                                <li className="col">
                                    <Link as='a' className="card hr-arrow p-4" to="/app/chat" title="Chat App" style={{ "--dynamic-color": "var(--theme-color2)" }} onClick={handleClickLink}>
                                        <svg className="mb-3" width="20" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                            <path opacity="0.9" d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                                        </svg>
                                        <h6 className="title mb-1">Chat App</h6>
                                        <p className="small text-muted mb-0 d-none d-xl-inline-flex">Description text here...</p>
                                        <div className="go-corner">
                                            <div className="go-arrow">→</div>
                                        </div>
                                    </Link>
                                </li>
                                <li className="col">
                                    <Link className="card hr-arrow p-4" to="/app/calendar" title="My Calendar" style={{ "--dynamic-color": "var(--theme-color3)" }} onClick={handleClickLink}>
                                        <svg className="mb-3" width="20" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.8" d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                                            <path opacity="0.4" d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
                                        </svg>
                                        <h6 className="title mb-1">My Calendar</h6>
                                        <p className="small text-muted mb-0 d-none d-xl-inline-flex">Description text here...</p>
                                        <div className="go-corner">
                                            <div className="go-arrow">→</div>
                                        </div>
                                    </Link>
                                </li>
                                <li className="col">
                                    <Link className="card hr-arrow p-4" to="/app/my-contact" title="Contact's" style={{ "--dynamic-color": "var(--theme-color5)" }} onClick={handleClickLink}>
                                        <svg className="mb-3" width="20" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.8" d="M6 8C6.79565 8 7.55871 7.68393 8.12132 7.12132C8.68393 6.55871 9 5.79565 9 5C9 4.20435 8.68393 3.44129 8.12132 2.87868C7.55871 2.31607 6.79565 2 6 2C5.20435 2 4.44129 2.31607 3.87868 2.87868C3.31607 3.44129 3 4.20435 3 5C3 5.79565 3.31607 6.55871 3.87868 7.12132C4.44129 7.68393 5.20435 8 6 8ZM1 14C1 14 0 14 0 13C0 12 1 9 6 9C11 9 12 12 12 13C12 14 11 14 11 14H1Z" />
                                            <path opacity="0.4" d="M11.1464 3.14645C11.0527 3.24021 11 3.36739 11 3.5C11 3.63261 11.0527 3.75979 11.1464 3.85355C11.2402 3.94732 11.3674 4 11.5 4H15.5C15.6326 4 15.7598 3.94732 15.8536 3.85355C15.9473 3.75979 16 3.63261 16 3.5C16 3.36739 15.9473 3.24021 15.8536 3.14645C15.7598 3.05268 15.6326 3 15.5 3H11.5C11.3674 3 11.2402 3.05268 11.1464 3.14645Z" />
                                            <path opacity="0.4" d="M11.1464 6.14645C11.2402 6.05268 11.3674 6 11.5 6H15.5C15.6326 6 15.7598 6.05268 15.8536 6.14645C15.9473 6.24021 16 6.36739 16 6.5C16 6.63261 15.9473 6.75979 15.8536 6.85355C15.7598 6.94732 15.6326 7 15.5 7H11.5C11.3674 7 11.2402 6.94732 11.1464 6.85355C11.0527 6.75979 11 6.63261 11 6.5C11 6.36739 11.0527 6.24021 11.1464 6.14645Z" />
                                            <path opacity="0.4" d="M13.1464 9.14645C13.2402 9.05268 13.3674 9 13.5 9H15.5C15.6326 9 15.7598 9.05268 15.8536 9.14645C15.9473 9.24021 16 9.36739 16 9.5C16 9.63261 15.9473 9.75979 15.8536 9.85355C15.7598 9.94732 15.6326 10 15.5 10H13.5C13.3674 10 13.2402 9.94732 13.1464 9.85355C13.0527 9.75979 13 9.63261 13 9.5C13 9.36739 13.0527 9.24021 13.1464 9.14645Z" />
                                            <path opacity="0.4" d="M13.1464 12.1464C13.2402 12.0527 13.3674 12 13.5 12H15.5C15.6326 12 15.7598 12.0527 15.8536 12.1464C15.9473 12.2402 16 12.3674 16 12.5C16 12.6326 15.9473 12.7598 15.8536 12.8536C15.7598 12.9473 15.6326 13 15.5 13H13.5C13.3674 13 13.2402 12.9473 13.1464 12.8536C13.0527 12.7598 13 12.6326 13 12.5C13 12.3674 13.0527 12.2402 13.1464 12.1464Z" />
                                        </svg>
                                        <h6 className="title mb-1">Contact's</h6>
                                        <p className="small text-muted mb-0 d-none d-xl-inline-flex">Description text here...</p>
                                        <div className="go-corner">
                                            <div className="go-arrow">→</div>
                                        </div>
                                    </Link>
                                </li>
                                <li className="col">
                                    <Link className="card hr-arrow p-4" to="/app/filemanager" title="File Manager" style={{ "--dynamic-color": "var(--theme-color6)" }} onClick={handleClickLink}>
                                        <svg className="mb-3" width="20" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.2" d="M6.5 0C6.10218 0 5.72064 0.158035 5.43934 0.43934C5.15804 0.720644 5 1.10218 5 1.5V2.5C5 2.89782 5.15804 3.27936 5.43934 3.56066C5.72064 3.84196 6.10218 4 6.5 4H9.5C9.89782 4 10.2794 3.84196 10.5607 3.56066C10.842 3.27936 11 2.89782 11 2.5V1.5C11 1.10218 10.842 0.720644 10.5607 0.43934C10.2794 0.158035 9.89782 0 9.5 0L6.5 0ZM9.5 1C9.63261 1 9.75979 1.05268 9.85355 1.14645C9.94732 1.24021 10 1.36739 10 1.5V2.5C10 2.63261 9.94732 2.75979 9.85355 2.85355C9.75979 2.94732 9.63261 3 9.5 3H6.5C6.36739 3 6.24021 2.94732 6.14645 2.85355C6.05268 2.75979 6 2.63261 6 2.5V1.5C6 1.36739 6.05268 1.24021 6.14645 1.14645C6.24021 1.05268 6.36739 1 6.5 1H9.5Z"></path>
                                            <path opacity="0.2" d="M4 1.5H3C2.46957 1.5 1.96086 1.71071 1.58579 2.08579C1.21071 2.46086 1 2.96957 1 3.5V14C1 14.5304 1.21071 15.0391 1.58579 15.4142C1.96086 15.7893 2.46957 16 3 16H13C13.5304 16 14.0391 15.7893 14.4142 15.4142C14.7893 15.0391 15 14.5304 15 14V3.5C15 2.96957 14.7893 2.46086 14.4142 2.08579C14.0391 1.71071 13.5304 1.5 13 1.5H12V2.5C12 2.8283 11.9353 3.15339 11.8097 3.45671C11.6841 3.76002 11.4999 4.03562 11.2678 4.26777C11.0356 4.49991 10.76 4.68406 10.4567 4.8097C10.1534 4.93534 9.8283 5 9.5 5H6.5C5.83696 5 5.20107 4.73661 4.73223 4.26777C4.26339 3.79893 4 3.16304 4 2.5V1.5Z"></path>
                                            <path d="M5.5 7C5.36739 7 5.24021 7.05268 5.14645 7.14645C5.05268 7.24021 5 7.36739 5 7.5C5 7.63261 5.05268 7.75979 5.14645 7.85355C5.24021 7.94732 5.36739 8 5.5 8H10.5C10.6326 8 10.7598 7.94732 10.8536 7.85355C10.9473 7.75979 11 7.63261 11 7.5C11 7.36739 10.9473 7.24021 10.8536 7.14645C10.7598 7.05268 10.6326 7 10.5 7H5.5ZM5 9.5C5 9.36739 5.05268 9.24021 5.14645 9.14645C5.24021 9.05268 5.36739 9 5.5 9H10.5C10.6326 9 10.7598 9.05268 10.8536 9.14645C10.9473 9.24021 11 9.36739 11 9.5C11 9.63261 10.9473 9.75979 10.8536 9.85355C10.7598 9.94732 10.6326 10 10.5 10H5.5C5.36739 10 5.24021 9.94732 5.14645 9.85355C5.05268 9.75979 5 9.63261 5 9.5ZM5 11.5C5 11.3674 5.05268 11.2402 5.14645 11.1464C5.24021 11.0527 5.36739 11 5.5 11H7.5C7.63261 11 7.75979 11.0527 7.85355 11.1464C7.94732 11.2402 8 11.3674 8 11.5C8 11.6326 7.94732 11.7598 7.85355 11.8536C7.75979 11.9473 7.63261 12 7.5 12H5.5C5.36739 12 5.24021 11.9473 5.14645 11.8536C5.05268 11.7598 5 11.6326 5 11.5Z"></path>
                                        </svg>
                                        <h6 className="title mb-1">File Manager</h6>
                                        <p className="small text-muted mb-0 d-none d-xl-inline-flex">Description text here...</p>
                                        <div className="go-corner">
                                            <div className="go-arrow">→</div>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                            <div className="row g-5">
                                <div className="col-lg-3 col-md-6 col-sm-6">
                                    <h6 className="mb-1 text-light fw-light">Project</h6>
                                    <p className="text-muted small">Lorem ipsum dolor sit amet dis sociosqu sapien.</p>
                                    <ul className="list-unstyled li_animate link-hover">
                                        <li><Link onClick={handleClickLink} to="/app/new-project" aria-label="New Project">New Project</Link></li>
                                        <li><Link onClick={handleClickLink} to="/app/project-list" aria-label="Project List">Project List</Link></li>
                                        <li><Link onClick={handleClickLink} to="/app/project-grid" aria-label="Project Grid">Project Grid</Link></li>
                                        <li><Link onClick={handleClickLink} to="/app/project-details" aria-label="Project Details">Project Details</Link></li>
                                        <li><Link onClick={handleClickLink} to="/app/clients-list" aria-label="Clients">Clients</Link></li>
                                    </ul>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-6">
                                    <h6 className="mb-1 text-light fw-light">Crafted Page</h6>
                                    <p className="text-muted small">Lorem ipsum dolor sit amet dis sociosqu sapien.</p>
                                    <ul className="list-unstyled li_animate link-hover">
                                        <li><Link onClick={handleClickLink} to="/app/my-profile">My Profile</Link></li>
                                        <li><Link onClick={handleClickLink} to="/app/user-activity">User Activity</Link></li>
                                        <li><Link onClick={handleClickLink} to="/pages/gallery">Imgae gallery</Link></li>
                                        <li><Link onClick={handleClickLink} to="/pages/pricing">Pricing table</Link></li>
                                        <li><Link onClick={handleClickLink} to="/pages/search">Search page</Link></li>
                                    </ul>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-6">
                                    <h6 className="mb-1 text-light fw-light">Authentication Page</h6>
                                    <p className="text-muted small">Lorem phasellus sociosqu nec turpis montes.</p>
                                    <ul className="list-unstyled li_animate link-hover">
                                        <li><Link onClick={handleClickLink} to="/signin">Sign in</Link></li>
                                        <li><Link onClick={handleClickLink} to="/signup">Sign up</Link></li>
                                        <li><Link onClick={handleClickLink} to="/password-reset">Password reset</Link></li>
                                        <li><Link onClick={handleClickLink} to="/two-step">2-Step Authentication</Link></li>
                                        <li><Link onClick={handleClickLink} to="/lockscreen">Lockscreen</Link></li>
                                        <li><Link onClick={handleClickLink} to="/maintenance">Maintenance</Link></li>
                                        <li><Link onClick={handleClickLink} to="/404">404</Link></li>
                                    </ul>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-6">
                                    <h6 className="mb-1 text-light fw-light">Widgets</h6>
                                    <p className="text-muted small">Lorem phasellus sociosqu nec turpis montes.</p>
                                    <ul className="list-unstyled li_animate link-hover">
                                        <li><Link onClick={handleClickLink} to="/docs/widgets-basic-card" aria-label="Widgets Basic card">Basic card</Link></li>
                                        <li><Link onClick={handleClickLink} to="/docs/widgets-card-tiles" aria-label="Widgets tiles">Card tiles</Link></li>
                                        <li><Link onClick={handleClickLink} to="/docs/widgets-card-tab" aria-label="Widgets Tabbed">Tabbed card</Link></li>
                                        <li><Link onClick={handleClickLink} to="/pages/table" aria-label="Widgets Tables">Tables</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer border-0 justify-content-center">
                        <div className="container-xxl">
                            <div className="row g-3">
                                <div className="col-auto">
                                    <div className="card">
                                        <div className="card-body d-flex align-items-center p-2">
                                            <div className="avatar rounded-circle no-thumbnail"><i className="fa fa-skype"></i></div>
                                            <div className="ms-3">
                                                <small className="text-muted">Skype ID</small>
                                                <p className="mb-0 small">bvite.theme</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <div className="card">
                                        <div className="card-body d-flex align-items-center p-2">
                                            <div className="avatar rounded-circle no-thumbnail"><i className="fa fa-envelope"></i></div>
                                            <div className="ms-3">
                                                <small className="text-muted">Email us</small>
                                                <p className="mb-0 small">bvite.theme@info.com</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <div className="card">
                                        <div className="card-body d-flex align-items-center p-2">
                                            <div className="avatar rounded-circle no-thumbnail"><i className="fa fa-phone"></i></div>
                                            <div className="ms-3">
                                                <small className="text-muted">United States</small>
                                                <p className="mb-0 small">+1 111-222-1234</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FullScreenModal