import React from 'react'

const Security = () => {
    return (
        <ul className="row g-3 list-unstyled li_animate">
            <li className="col-12">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title fw-normal">Change your password</h5>
                        <p className="text-muted">We will email you a confirmation when changing your password, so please expect that email after submitting.</p>
                        <button className="btn btn-warning">Forgot your password?</button>
                    </div>
                    <div className="card-footer">
                        <form className="row g-3 justify-content-between">
                            <div className="col-lg-4 col-md-12">
                                <div className="mb-3">
                                    <label className="form-label">Current password</label>
                                    <input type="password" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">New password</label>
                                    <input type="password" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Confirm password</label>
                                    <input type="password" className="form-control" />
                                </div>
                                <button type="button" className="btn btn-primary">Update Password</button>
                                <button type="button" className="btn btn-link">Cancel</button>
                            </div>
                            <div className="col-lg-7 col-md-12">
                                <div className="bg-body border dashed p-3">
                                    <h6 className="mb-2">Password Requirements</h6>
                                    <p className="text-muted mb-2">To create a new password, you have to meet all of the following requirements:</p>
                                    {/* <!--[ List group ]--> */}
                                    <ul className="small text-muted lh-lg mb-0">
                                        <li>Minimum 8 character</li>
                                        <li>At least one special character</li>
                                        <li>At least one number</li>
                                        <li>Can’t be the same as a previous password</li>
                                    </ul>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </li>
            <li className="col-12">
                <div className="card">
                    <div className="card-body">
                        <h5>Device History</h5>
                        <p className="text-muted">If you see a device here that you believe wasn’t you, please contact our account fraud department immediately.</p>
                        <button className="btn btn-dark">Log out all devices</button>
                    </div>
                    <div className="card-footer p-0">
                        <div className="list-group list-group-custom list-group-flush mb-0">
                            <div className="list-group-item">
                                <div className="row align-items-center">
                                    <div className="col-auto">
                                        <div className="avatar lg text-center"><i className="fa fa-mobile fa-3x"></i></div>
                                    </div>
                                    <div className="col ml-n2">
                                        <h6 className="mb-1">iPhone 11</h6>
                                        <small className="text-muted">Brownsville, VT · <span>Jun 11 at 10:05am</span></small>
                                    </div>
                                    <div className="col-auto">
                                        <button className="btn btn-sm btn-white">Sign out</button>
                                    </div>
                                </div>
                            </div>
                            <div className="list-group-item">
                                <div className="row align-items-center">
                                    <div className="col-auto">
                                        <div className="avatar lg text-center"><i className="fa fa-desktop fa-2x"></i></div>
                                    </div>
                                    <div className="col ml-n2">
                                        <h6 className="mb-1">iMac OSX · <span className="font-weight-normal">Safari 10.2</span></h6>
                                        <small className="text-muted">Ct, Corona, CA · <span>September 14 at 2:30pm</span></small>
                                    </div>
                                    <div className="col-auto">
                                        <button className="btn btn-sm btn-white">Sign out</button>
                                    </div>
                                </div>
                            </div>
                            <div className="list-group-item">
                                <div className="row align-items-center">
                                    <div className="col-auto">
                                        <div className="avatar lg text-center"><i className="fa fa-laptop fa-3x"></i></div>
                                    </div>
                                    <div className="col ml-n2">
                                        <h6 className="mb-1">HP Laptop Win10</h6>
                                        <small className="text-muted">Ct, Corona, CA · <span>September 16 at 11:16am</span></small>
                                    </div>
                                    <div className="col-auto">
                                        <button className="btn btn-sm btn-white">Sign out</button>
                                    </div>
                                </div>
                            </div>
                            <div className="list-group-item">
                                <div className="row align-items-center">
                                    <div className="col-auto">
                                        <div className="avatar lg text-center"><i className="fa fa-desktop fa-2x"></i></div>
                                    </div>
                                    <div className="col ml-n2">
                                        <h6 className="mb-1">iMac OSX · <span className="font-weight-normal">Edge browser</span></h6>
                                        <small className="text-muted">Huntington Station, NY · <span>October 26 at 5:16pm</span></small>
                                    </div>
                                    <div className="col-auto">
                                        <button className="btn btn-sm btn-white">Sign out</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    )
}

export default Security