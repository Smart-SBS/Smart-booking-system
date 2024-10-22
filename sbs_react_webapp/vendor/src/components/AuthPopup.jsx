/* eslint-disable react/prop-types */
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthPopup = ({ isOpen, onClose, onSuccessfulLogin }) => {
    const [isLoginView, setIsLoginView] = useState(true);

    if (!isOpen) return null;

    return (
        <div className="fixed top-28 inset-0 flex justify-center items-center z-[70] text-black">
            <div className="bg-white p-8 md:p-8 rounded-lg shadow-lg w-full max-w-lg sm:max-w-xl mx-2 sm:mx-4" style={{ boxShadow: "rgba(71, 85, 95, 0.09) 0px 0px 10px 10px" }}>
                <div className="flex justify-between items-center mb-4 md:mb-6">
                    <h2 className="text-xl md:text-2xl font-bold">Welcome to Smart Booking System</h2>
                    <button onClick={onClose} className="text-2xl md:text-3xl">&times;</button>
                </div>
                <div className="mb-4">
                    <button
                        className={`px-3 py-2 md:px-4 md:py-2 rounded mr-2 ${isLoginView ? 'bg-[#fa2964] text-white' : 'bg-gray-200'}`}
                        onClick={() => setIsLoginView(true)}
                    >
                        Login
                    </button>
                    <button
                        className={`px-3 py-2 md:px-4 md:py-2 rounded ${!isLoginView ? 'bg-[#fa2964] text-white' : 'bg-gray-200'}`}
                        onClick={() => setIsLoginView(false)}
                    >
                        Register
                    </button>
                </div>
                {isLoginView ? (
                    <LoginForm
                        isOpen={isLoginView}
                        onClose={onClose}
                        onSuccessfulLogin={onSuccessfulLogin}
                    />
                ) : (
                    <RegisterForm
                        isOpen={!isLoginView}
                        onClose={onClose}
                    />
                )}
            </div>
        </div>
    )
}

export default AuthPopup;