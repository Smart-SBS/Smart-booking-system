import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { PlusCircle, Trash2 } from 'lucide-react';
import LoadingFallback from "../utils/LoadingFallback";
import { useSelector } from 'react-redux';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const EditOpeningHours = () => {
    // Navigate function
    const navigate = useNavigate()

    // Access token
    const token = useSelector(state => state.auth.token);

    // API URL
    const APP_URL = import.meta.env.VITE_API_URL;

    // Shop id and shop name from the params
    const { shopId, shopName } = useParams();

    const [hours, setHours] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasChanges, setHasChanges] = useState(false);
    const [toBeDeleted, setToBeDeleted] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchOpeningHours();
    }, [APP_URL]);

    const fetchOpeningHours = async () => {
        try {
            const response = await axios.get(`${APP_URL}/ma-openhours/${shopId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data && response.data.OpenHours) {
                const fetchedHours = response.data.OpenHours;
                setHours(days.map((day, index) => {
                    const dayHours = fetchedHours.filter(h => parseInt(h.day_id) === index + 1);
                    return {
                        day_id: index + 1,
                        day: day,
                        is_closed: dayHours.length === 0 || dayHours[0].is_closed === "0",
                        time_slots: dayHours.length > 0 ? dayHours.map(h => ({
                            id: h.id,
                            start_time: h.start_time.substring(0, 5),
                            end_time: h.end_time.substring(0, 5)
                        })) : [],
                        editable: dayHours.length > 0
                    };
                }));
            }
        } catch (error) {
            toast.error(`Error fetching opening hours: ${error.message}`);
        } finally {
            setIsLoading(false);
            setHasChanges(prev => !prev); // Reset hasChanges after fetching
        }
    };

    const handleChange = (dayIndex, slotIndex, field, value) => {
        setHours(prevHours => {
            setHasChanges(true); // Set hasChanges to true when a change is made
            const newHours = [...prevHours];
            if (field === 'is_closed') {
                newHours[dayIndex].is_closed = value;
                if (value) {
                    if (newHours[dayIndex].time_slots.length === 1) {
                        newHours[dayIndex].time_slots[0].start_time = '00:00';
                        newHours[dayIndex].time_slots[0].end_time = '00:00';
                    } else {
                        toast.error(`This day can only be closed when there's a single record.`);
                        return prevHours;
                    }
                } else if (newHours[dayIndex].time_slots.length === 0) {
                    newHours[dayIndex].time_slots.push({ start_time: '09:00', end_time: '17:00' });
                }
            } else {
                newHours[dayIndex].time_slots[slotIndex][field] = value;
            }
            return newHours;
        });
    };

    const addTimeSlot = (dayIndex) => {
        setHasChanges(true); // Set hasChanges to true when a time slot is added
        const newHours = [...hours];
        newHours[dayIndex].time_slots.push({ start_time: '09:00', end_time: '17:00' });
        setHours(newHours);
    };

    const markForDeletion = async (dayIndex, slotIndex) => {
        setHasChanges(true); // Set hasChanges to true when a time slot is deleted
        const slotToDelete = hours[dayIndex].time_slots[slotIndex];

        if (slotToDelete.id) {
            setToBeDeleted(prev => [...prev, slotToDelete.id]);
        }

        if (slotToDelete.id) {
            try {
                await axios.delete(`${APP_URL}/ma-delete-openhours/${slotToDelete.id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                toast.success('Time slot deleted successfully');
                await fetchOpeningHours(); // Refetch the data to update the form
            } catch (error) {
                toast.error(`Error deleting time slot: ${error.message}`);
                return;
            }
        }

        setHours(prevHours => {
            const newHours = [...prevHours];
            newHours[dayIndex].time_slots.splice(slotIndex, 1);
            return newHours;
        });
    };

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

    if (isLoading) {
        return <LoadingFallback />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;
        setIsSubmitting(true);

        if (!hasChanges) {
            toast.success("No changes were made.");
            return;
        }

        try {
            const data = hours.flatMap(day =>
                day.editable ? (
                    day.time_slots
                        .filter(slot => slot.start_time && slot.end_time && !toBeDeleted.includes(slot.id))
                        .map(slot => ({
                            id: slot.id,
                            shop_id: shopId,
                            day_id: day.day_id,
                            start_time: day.is_closed ? '00:00' : slot.start_time,
                            end_time: day.is_closed ? '00:00' : slot.end_time,
                            is_closed: day.is_closed ? 0 : 1,
                        }))
                ) : []
            );

            const response = await axios.post(`${APP_URL}/ma-edit-openhours`, {
                data,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 200) {
                toast.success(response.data.message);
                setHasChanges(false); // Reset hasChanges after successful submission
                setTimeout(() => {
                    navigate(`/opening-hours/${shopName}/${shopId}`);
                }, 1000);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message;
            if (typeof errorMessage === 'object') {
                const errorMessages = Object.values(errorMessage).join(', ');
                toast.error(`Error updating opening hours: ${errorMessages}`);
            } else {
                toast.error(`Error updating opening hours: ${errorMessage || error.message}`);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-8 bg-white text-gray-800 rounded-xl shadow-lg">
            <Toaster />
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8">
                <h6 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Edit Opening and Closing Hours for {shopName}</h6>
                <Link
                    className="w-full sm:w-auto px-6 py-2 bg-pink-600 text-white font-semibold hover:bg-pink-700 transition duration-300 ease-in-out text-center"
                    to={`/opening-hours/${shopName}/${shopId}`}
                >
                    Back
                </Link>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                {hours.map((day, dayIndex) => (
                    <div key={day.day_id} className={`flex flex-col p-4 ${day.editable ? 'bg-gray-50' : 'bg-gray-100'} rounded-lg`}>
                        <div className="flex items-center justify-between mb-4">
                            <span className="font-semibold text-gray-700">{day.day}</span>
                            <div className="flex items-center justify-between gap-4">
                                {/* Closed / Open Toggle */}
                                <label className="flex items-center justify-center space-x-3 cursor-pointer">
                                    <span className={`text-sm ${day.is_closed ? 'text-red-500' : 'text-gray-500'}`}>
                                        {day.is_closed ? 'Closed' : 'Open'}
                                    </span>
                                    <input
                                        type="checkbox"
                                        checked={day.is_closed}
                                        onChange={(e) => handleChange(dayIndex, null, 'is_closed', e.target.checked)}
                                        className="form-checkbox h-5 w-5 text-pink-600 rounded focus:ring-[#fa2964e6]"
                                        disabled={!day.editable}
                                    />
                                </label>

                                {/* Show add time slot button only if day is open and editable */}
                                {!day.is_closed && day.editable && (
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

                        {/* Show time slots only if the shop is not closed */}
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
                                        {/* Show trash button only if it's not the first record and there's more than one record */}
                                        {slotIndex !== 0 && day.time_slots.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => markForDeletion(dayIndex, slotIndex)}
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
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`block w-full py-2 bg-pink-500 text-white font-semibold rounded hover:bg-pink-600 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isSubmitting ? 'Updating...' : 'Update hours'}
                </button>
            </form>
        </div>
    );
};

export default EditOpeningHours;