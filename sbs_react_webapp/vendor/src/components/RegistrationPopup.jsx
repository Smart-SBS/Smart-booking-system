/* eslint-disable react/prop-types */
import UserRegistrationForm from './UserRegistrationForm';

const RegistrationPopup = ({ isOpen, onClose }) => {

    if (!isOpen) return null;

    return (
        <div className="fixed top-28 inset-0 flex justify-center items-center z-[70] text-black">
            <div className="bg-white p-8 md:p-8 rounded-lg shadow-lg w-full max-w-lg sm:max-w-xl mx-2 sm:mx-4" style={{ boxShadow: "rgba(71, 85, 95, 0.09) 0px 0px 10px 10px" }}>
                <div className="flex justify-between items-center mb-4 md:mb-6">
                    <h2 className="text-xl md:text-2xl font-bold">Welcome to Smart Booking System</h2>
                    <button onClick={onClose} className="text-2xl md:text-3xl">&times;</button>
                </div>

                <UserRegistrationForm isOpen={isOpen} onClose={onClose} />
            </div>
        </div>
    )
}

export default RegistrationPopup