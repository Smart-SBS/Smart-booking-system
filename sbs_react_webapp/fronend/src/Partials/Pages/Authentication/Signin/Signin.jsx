import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const Signin = () => {
    const APP_URL = import.meta.env.VITE_API_URL || '/api';

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            toast.error('Please fill in all fields');
            return;
        }

        setIsLoading(true);

        try {
            const res = await axios.post(`${APP_URL}/api/login`, formData, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (res.data.status === 200) {
                const { jwt } = res.data;
                localStorage.setItem('jwtToken', jwt);
                if (rememberMe) {
                    localStorage.setItem('rememberedEmail', formData.email);
                } else {
                    localStorage.removeItem('rememberedEmail');
                }
                navigate('admin/index');
            } else {
                toast.error(res.data.message || 'Login failed');
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || 'Error logging in');
            } else if (error.request) {
                toast.error('No response from server. Please try again.');
            } else {
                toast.error('Error setting up request. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="px-xl-5 px-4 auth-body">
            <Toaster
                containerStyle={{
                    top: 140,
                    left: 760,
                    bottom: 20,
                    right: 20,
                }}
                toastOptions={{
                    duration: 1000
                }}
            />
            <form onSubmit={handleSubmit}>
                <ul className="row g-3 list-unstyled li_animate">
                    <li className="col-12">
                        <h1 className="h2 title-font">Welcome to SBS</h1>
                        <p>Your Admin Dashboard</p>
                    </li>
                    <li className="col-12">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control form-control-lg"
                            placeholder="admin@SBS.com"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            aria-label="Email"
                            required
                        />
                    </li>
                    <li className="col-12">
                        <div className="form-label">
                            <span className="d-flex justify-content-between align-items-center">
                                Password
                                <Link className="text-primary" to="/send-token">Forgot Password?</Link>
                            </span>
                        </div>
                        <div className="position-relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className="form-control form-control-lg"
                                placeholder="Enter your password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                aria-label="Password"
                                required
                            />
                            <div
                                className="position-absolute top-50 end-0 translate-middle-y pe-3"
                                style={{ cursor: 'pointer' }}
                                onClick={toggleShowPassword}
                            >
                                <i className={`bi ${showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"}`}></i>
                            </div>
                        </div>
                    </li>
                    <li className="col-12">
                        <div className="form-check fs-5">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="Rememberme"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                aria-label="Remember this Device"
                            />
                            <label className="form-check-label fs-6" htmlFor="Rememberme">Remember this Device</label>
                        </div>
                    </li>
                    <li className="col-12 my-lg-4">
                        <button
                            className="btn btn-lg w-100 btn-primary text-uppercase mb-2"
                            type='submit'
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </li>
                </ul>
            </form>
        </div>
    );
};

export default Signin;
