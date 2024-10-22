import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const PasswordReset = () => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const APP_URL = import.meta.env.VITE_API_URL || '/api';

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setMessage('')
        const formdata = new FormData()
        formdata.append('email', email)

        try {
            const response = await axios.post(`${APP_URL}/api/SendToken`, formdata)
            setMessage(response.data.message)
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="px-xl-5 px-4 auth-body">
            <form onSubmit={handleSubmit}>
                <ul className="row g-3 list-unstyled li_animate">
                    <li className="col-12">
                        <h1 className="h2 title-font">Welcome to SBS</h1>
                        <p>Your Admin Dashboard</p>
                    </li>
                    <li className="col-12">
                        <label className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control form-control-lg"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <small className="text-muted">An email will be sent to the above address with a link to set your new password.</small>
                    </li>
                    {message && (
                        <li className="col-12">
                            <div className={`alert ${message.includes('error') ? 'alert-danger' : 'alert-success'}`}>
                                {message}
                            </div>
                        </li>
                    )}
                    <li className="col-12 my-lg-4">
                        <button
                            type="submit"
                            className="btn btn-lg w-100 btn-primary text-uppercase mb-2"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Submitting...' : 'Submit'}
                        </button>
                    </li>
                    <li className="col-12">
                        <span className="text-muted"><Link to="/signin">Back to Sign in</Link></span>
                    </li>
                </ul>
            </form>
        </div>
    )
}

export default PasswordReset