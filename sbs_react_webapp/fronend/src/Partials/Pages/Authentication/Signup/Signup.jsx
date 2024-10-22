import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
    return (
        <div className="px-xl-5 px-4 auth-body">
            <form>
                <ul className="row g-3 list-unstyled li_animate">
                    <li className="col-12">
                        <h1 className="h2 title-font">Welcome to SBS</h1>
                        <p>Your Admin Dashboard</p>
                    </li>
                    <li className="col-6">
                        <label className="form-label">Full name</label>
                        <input type="text" className="form-control form-control-lg" placeholder="Jony" />
                    </li>
                    <li className="col-6">
                        <label className="form-label">&nbsp;</label>
                        <input type="text" className="form-control form-control-lg" placeholder="Parker" />
                    </li>
                    <li className="col-12">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control form-control-lg" placeholder="name@example.com" />
                    </li>
                    <li className="col-6">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control form-control-lg" placeholder="8+ characters required" />
                    </li>
                    <li className="col-6">
                        <label className="form-label">Confirm password</label>
                        <input type="password" className="form-control form-control-lg" placeholder="8+ characters required" />
                    </li>
                    <li className="col-12">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="TermsConditions" />
                            <label className="form-check-label" htmlFor="TermsConditions">
                                I accept the <a href="#" title="" className="text-primary">Terms and Conditions</a>
                            </label>
                        </div>
                    </li>
                    <li className="col-12 my-4">
                        <Link className="btn btn-lg w-100 btn-primary text-uppercase mb-2" to="/index" title="">Sign Up</Link>
                        <a className="btn btn-lg btn-secondary w-100" href="#">
                            <i className="fa fa-google me-2"></i>
                            <span>Sign up with Google</span>
                        </a>
                    </li>
                    <li className="col-12">
                        <span className="text-muted d-flex d-sm-inline-flex mt-3 mt-sm-0">Already have an account? <Link className="ms-2" to="/signin">Sign in here</Link></span>
                    </li>
                </ul>
            </form>
        </div>
    )
}

export default Signup