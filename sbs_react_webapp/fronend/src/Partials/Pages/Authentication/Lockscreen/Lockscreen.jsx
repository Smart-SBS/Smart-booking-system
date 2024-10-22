import React from 'react'

import profileImg from '../../../../assets/images/profile_av.png'
import { Link } from 'react-router-dom'

const Lockscreen = () => {
    return (
        <div className="px-xl-5 px-4 auth-body">
            <form>
                <ul className="row g-3 list-unstyled li_animate">
                    <li className="col-12 mb-3">
                        <div className="d-flex align-items-end">
                            <img className="rounded-4 img-thumbnail shadow avatar xl" src={profileImg} data-bs-toggle="tooltip" title="avatar" alt="Avatar" />
                            <div className="ms-3">
                                <a className="fs-4" href="#" title="">Radhika Sharma</a>
                                <p className="mb-0">RadhikaSharma@example.com</p>
                            </div>
                        </div>
                    </li>
                    <li className="col-12">
                        <div className="mb-2">
                            <div className="form-label">Enter Password</div>
                            <input type="password" className="form-control form-control-lg" placeholder="***************" />
                        </div>
                    </li>
                    <li className="col-12 my-lg-4">
                        <Link className="btn btn-lg w-100 btn-primary text-uppercase mb-2" to="/index" title="">Sign In</Link>
                    </li>
                    <li className="col-12">
                        <span className="text-muted">Don't have an account yet? <Link to="/signup">Sign up here</Link></span>
                    </li>
                </ul>
            </form>
        </div>
    )
}

export default Lockscreen