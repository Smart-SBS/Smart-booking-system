import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { PlusCircle, Trash2 } from 'lucide-react';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const AddOpeningHours = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("jwtToken");
    const APP_URL = import.meta.env.VITE_API_URL
    const { shopId, shopName } = useParams();

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

        try {
            const response = await axios.post(`${APP_URL}/api/add-openhours`, { data }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            if (response.status === 200) {
                toast.success(response.data.message);
                setTimeout(() => {
                    navigate(`/admin/shop/opening-hours/${shopName}/${shopId}`);
                }, 1000);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message;
            if (typeof errorMessage === 'object') {
                const errorMessages = Object.values(errorMessage).join(', ');
                toast.error(`Error adding opening hours: ${errorMessages}`);
            } else {
                toast.error(`Error adding opening hours: ${errorMessage || error.message}`);
            }
        }
    };

    return (
        <div className="px-4 py-3 page-body">
            <Toaster />
            <div className='card'>
                <div className="card-header py-3 bg-transparent border-bottom-0">
                    <h6 className="title-font mt-2 mb-0" style={{ fontSize: '1.25rem' }}>
                        <strong>Add Opening and Closing Hours for {shopName}</strong>
                    </h6>
                    <Link className='btn btn-info text-white' to={`/admin/shop/opening-hours/${shopName}/${shopId}`}>Back</Link>
                </div>
                <div className="card-body card-main-one">
                    <form onSubmit={handleSubmit}>
                        {hours.map((day, dayIndex) => (
                            <div key={day.day} className="card mb-3 bg-light">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <span className="fw-medium text-secondary">{day.day}</span>
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="form-check form-switch">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={`closed-${day.day}`}
                                                    checked={day.is_closed}
                                                    onChange={(e) => handleChange(dayIndex, null, 'is_closed', e.target.checked)}
                                                />
                                                <label className="form-check-label" htmlFor={`closed-${day.day}`}>
                                                    {day.is_closed ? 'Closed' : 'Open'}
                                                </label>
                                            </div>
                                            {!day.is_closed && (
                                                <button
                                                    type="button"
                                                    onClick={() => addTimeSlot(dayIndex)}
                                                    className="btn btn-link text-danger p-0"
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
                                                <div key={slotIndex} className="row g-2 mb-2">
                                                    <div className="col">
                                                        <div className="form-floating">
                                                            <select
                                                                value={slot.start_time}
                                                                onChange={(e) => handleChange(dayIndex, slotIndex, 'start_time', e.target.value)}
                                                                className="form-select"
                                                                id={`start-time-${dayIndex}-${slotIndex}`}
                                                            >
                                                                {timeOptions.map((time) => (
                                                                    <option key={`start-${time}`} value={time}>{time}</option>
                                                                ))}
                                                            </select>
                                                            <label htmlFor={`start-time-${dayIndex}-${slotIndex}`}>Start Time</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-auto d-flex align-items-center">
                                                        <span className="text-secondary">to</span>
                                                    </div>
                                                    <div className="col">
                                                        <div className="form-floating">
                                                            <select
                                                                value={slot.end_time}
                                                                onChange={(e) => handleChange(dayIndex, slotIndex, 'end_time', e.target.value)}
                                                                className="form-select"
                                                                id={`end-time-${dayIndex}-${slotIndex}`}
                                                            >
                                                                {timeOptions.map((time) => (
                                                                    <option key={`end-${time}`} value={time}>{time}</option>
                                                                ))}
                                                            </select>
                                                            <label htmlFor={`end-time-${dayIndex}-${slotIndex}`}>End Time</label>
                                                        </div>
                                                    </div>
                                                    {day.time_slots.length > 1 && (
                                                        <div className="col-auto">
                                                            <button
                                                                type="button"
                                                                onClick={() => removeTimeSlot(dayIndex, slotIndex)}
                                                                className="btn btn-link text-danger p-0"
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            ))
                                    )}
                                </div>
                            </div>
                        ))}
                        <div className="mt-4">
                            <button className="me-1 btn btn-primary" type="submit">Save Hours</button>
                            <Link to={`/admin/shop/opening-hours/${shopName}/${shopId}`} className="btn btn-outline-secondary">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddOpeningHours;