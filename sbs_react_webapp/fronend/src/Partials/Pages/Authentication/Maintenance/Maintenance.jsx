import React from 'react'
import { Link } from 'react-router-dom'

const Maintenance = () => {
    return (
        <div className="px-xl-5 px-4 auth-body">
            <form>
                <ul className="row g-3 list-unstyled li_animate">
                    <li className="col-12">
                        <h3>Under Construction!</h3>
                        <p>Our website / Webapp is under Construction, but we are ready to go! Special surprise for subscribers only.</p>
                    </li>
                    <li className="col-12">
                        <label className="form-label">Get notified when we are done.</label>
                        <input type="email" className="form-control form-control-lg" placeholder="name@example.com" />
                    </li>
                    <li className="col-12 my-lg-4">
                        <Link className="btn btn-lg w-100 btn-primary text-uppercase mb-2" to="/two-step" title="">Notify Me</Link>
                    </li>
                    <li className="col-12">
                        <span className="text-muted"><Link to="/signin">Back to Sign in</Link></span>
                    </li>
                </ul>
            </form>
        </div>
    )
}

export default Maintenance