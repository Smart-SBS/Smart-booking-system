import React from 'react'

const General = () => {
    return (
        <ul className="row g-3 list-unstyled li_animate">
            <li className="col-12 mb-4">
                <h5 className="mb-1">Account Setting</h5>
                <p className="text-muted">Update your account details</p>
                {/* <!--[ setting: Account Setting input]--> */}
                <form className="row g-3">
                    <div className="col-lg-4 col-md-6 col-sm-6 col-6">
                        <div className="form-floating">
                            <input type="text" className="form-control" placeholder="Enter your name" />
                            <label>Enter your name</label>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-6 col-6">
                        <div className="form-floating">
                            <input type="number" className="form-control" placeholder="Enter phone" />
                            <label>Enter phone</label>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="form-floating">
                            <input type="email" className="form-control" placeholder="Enter your email" />
                            <label>Enter your email</label>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="form-floating">
                            <input type="url" className="form-control" placeholder="Facebook profile link" />
                            <label>Facebook profile link</label>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="form-floating">
                            <input type="url" className="form-control" placeholder="Instagram profile link" />
                            <label>Instagram profile link</label>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="form-floating">
                            <input type="url" className="form-control" placeholder="Linkedin profile link" />
                            <label>Linkedin profile link</label>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <label className='me-1'>Select Avatar</label>
                            <input type="file" className="form-control-file" />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-floating">
                            <textarea className="form-control" placeholder="Enter Bio" style={{ height: "100px" }}></textarea>
                            <label>Enter Bio</label>
                        </div>
                    </div>
                    <div className="col-12">
                        <button type="button" className="btn btn-primary me-1">Update Details</button>
                        <button type="button" className="btn btn-secondary">Cancel</button>
                    </div>
                </form>
                {/* <!--[ .row end ]--> */}
            </li>
            <li className="col-12">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title fw-light mb-4">Delete your account</h4>
                        <p className="lead text-muted">Please note, deleting your account is a permanent action and will no be recoverable once completed.</p>
                        <button className="btn btn-danger">Delete</button>
                    </div>
                </div>
            </li>
        </ul>
    )
}

export default General