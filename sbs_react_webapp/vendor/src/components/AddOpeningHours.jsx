import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useSelector } from 'react-redux';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const AddOpeningHours = () => {
    // Navigate function
    const navigate = useNavigate()

    // Access token
    const token = useSelector(state => state.auth.token);

    // API URL
    const APP_URL = import.meta.env.VITE_API_URL;

    const { shopId, shopName } = useParams();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [hours, setHours] = useState(
        days.map((day, index) => ({
            day_id: index + 1,
            day: day,
            is_closed: 0,
            time_slots: [{ start_time: '09:00', end_time: '17:00' }]
        }))
    );

    const generateTimeOptions = () => {
        const options = [];
        for (let i = 0; i < 24; i++) {
            for (let j = 0; j < 60; j += 30) {
                const hour = i.toString().padStart(2, '0');
                const minute = j.toString().padStart(2, '0');
                options.push(`${hour}:${minute}`);
            }
        }
        return options;
    };

    const timeOptions = generateTimeOptions();

    const handleChange = (dayIndex, slotIndex, field, value) => {
        const newHours = [...hours];
        if (field === 'is_closed') {
            newHours[dayIndex].is_closed = value;
        } else {
            newHours[dayIndex].time_slots[slotIndex][field] = value;
        }
        setHours(newHours);
    };

    const addTimeSlot = (dayIndex) => {
        const newHours = [...hours];
        newHours[dayIndex].time_slots.push({ start_time: '09:00', end_time: '17:00' });
        setHours(newHours);
    };

    const removeTimeSlot = (dayIndex, slotIndex) => {
        const newHours = [...hours];
        newHours[dayIndex].time_slots.splice(slotIndex, 1);
        setHours(newHours);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        try {
            setIsSubmitting(true);

            const data = hours.flatMap(day =>
                day.is_closed
                    ? [{
                        shop_id: shopId,
                        day_id: day.day_id,
                        start_time: "00:00",
                        end_time: "00:00",
                        is_closed: 0 // Shop is closed
                    }]
                    : day.time_slots.map(slot => ({
                        shop_id: shopId,
                        day_id: day.day_id,
                        start_time: slot.start_time,
                        end_time: slot.end_time,
                        is_closed: 1 // Shop is open
                    }))
            );

            const response = await axios.post(`${APP_URL}/ma-add-openhours`, { data }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            if (response.status === 200) {
                toast.success(response.data.message);
                setTimeout(() => {
                    navigate(`/opening-hours/${shopName}/${shopId}`);
                }, 2000);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message;
            if (typeof errorMessage === 'object') {
                const errorMessages = Object.values(errorMessage).join(', ');
                toast.error(`Error adding opening hours: ${errorMessages}`);
            } else {
                toast.error(`Error adding opening hours: ${errorMessage || error.message}`);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-8 bg-white text-gray-800 rounded-xl shadow-lg">
            <Toaster />
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8">
                <h6 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Add Opening and Closing Hours for {shopName}</h6>
                <Link
                    className="w-full sm:w-auto px-6 py-2 bg-pink-600 text-white font-semibold hover:bg-pink-700 transition duration-300 ease-in-out text-center"
                    to={`/opening-hours/${shopName}/${shopId}`}
                >
                    Back
                </Link>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {hours.map((day, dayIndex) => (
                    <div key={day.day} className="flex flex-col p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                            <span className="font-semibold text-gray-700">{day.day}</span>
                            <div className="flex items-center justify-between gap-4">
                                <label className="flex items-center justify-center space-x-3 cursor-pointer">
                                    <span className={`text-sm ${day.is_closed ? 'text-red-500' : 'text-gray-500'}`}>
                                        {day.is_closed ? 'Closed' : 'Open'}
                                    </span>
                                    <input
                                        type="checkbox"
                                        checked={day.is_closed}
                                        onChange={(e) => handleChange(dayIndex, null, 'is_closed', e.target.checked)}
                                        className="form-checkbox h-5 w-5 text-pink-600 rounded focus:ring-[#fa2964e6]"
                                    />
                                </label>
                                {!day.is_closed && (
                                    <button
                                        type="button"
                                        onClick={() => addTimeSlot(dayIndex)}
                                        className="text-pink-600 hover:text-pink-800"
                                    >
                                        <PlusCircle size={22} />
                                    </button>
                                )}
                            </div>
                        </div>
                        {!day.is_closed && (
                            day.time_slots
                                .filter(slot => slot.start_time && slot.end_time)
                                .map((slot, slotIndex) => (
                                    <div key={slotIndex} className="flex items-center space-x-2 mb-2">
                                        <div className="flex-grow">
                                            <select
                                                value={slot.start_time}
                                                onChange={(e) => handleChange(dayIndex, slotIndex, 'start_time', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 bg-white"
                                                disabled={!day.editable}
                                            >
                                                {timeOptions.map((time) => (
                                                    <option key={`start-${time}`} value={time}>{time}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <span className="text-gray-500">to</span>
                                        <div className="flex-grow">
                                            <select
                                                value={slot.end_time}
                                                onChange={(e) => handleChange(dayIndex, slotIndex, 'end_time', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 bg-white"
                                                disabled={!day.editable}
                                            >
                                                {timeOptions.map((time) => (
                                                    <option key={`end-${time}`} value={time}>{time}</option>
                                                ))}
                                            </select>
                                        </div>
                                        {day.time_slots.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeTimeSlot(dayIndex, slotIndex)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </div>
                                ))
                        )}
                    </div>
                ))}
                <div className="mt-8">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full px-6 py-3 bg-[#fa2964e6] text-white font-semibold hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-[#fa2964e6] focus:ring-offset-2 transition duration-300 ease-in-out ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? 'Saving...' : 'Save hours'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddOpeningHours;