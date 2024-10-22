import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { PlusCircle, Trash2 } from 'lucide-react';
import LoadingFallback from "../LoadingFallback/LoadingFallback";

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const EditOpeningHours = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("jwtToken");
    const APP_URL = import.meta.env.VITE_API_URL || '/api';
    const { shopId, shopName } = useParams();

    const [hours, setHours] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasChanges, setHasChanges] = useState(false);
    const [toBeDeleted, setToBeDeleted] = useState([]);

    useEffect(() => {
        fetchOpeningHours();
    }, [APP_URL, shopId, shopName]);

    const fetchOpeningHours = async () => {
        try {
            const response = await axios.get(`${APP_URL}/api/openhours/${shopId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
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
            setHasChanges(prev => !prev);
        }
    };

    const handleChange = (dayIndex, slotIndex, field, value) => {
        setHours(prevHours => {
            setHasChanges(true);
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
        setHasChanges(true);
        const newHours = [...hours];
        newHours[dayIndex].time_slots.push({ start_time: '09:00', end_time: '17:00' });
        setHours(newHours);
    };

    const markForDeletion = async (dayIndex, slotIndex) => {
        setHasChanges(true);
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
                await fetchOpeningHours();
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!hasChanges) {
            toast.success("No changes were made.");
            return;
        }

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

        try {
            const response = await axios.post(`${APP_URL}/api/edit-openhours`, {
                data,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 200) {
                toast.success(response.data.message);
                setHasChanges(false);
                setTimeout(() => {
                    navigate(`/admin/shop/opening-hours/${shopName}/${shopId}`);
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
        }
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

    return (
        <div className="px-4 py-3 page-body">
            <Toaster />
            <div className='card'>
                <div className="card-header py-3 bg-transparent border-bottom-0">
                    <h6 className="title-font mt-2 mb-0" style={{ fontSize: '1.25rem' }}>
                        <strong>Edit Opening and Closing Hours for {shopName}</strong>
                    </h6>
                    <Link className='btn btn-info text-white' to={`/admin/shop/opening-hours/${shopName}/${shopId}`}>Back</Link>
                </div>
                <div className="card-body card-main-one">
                    <form onSubmit={handleSubmit}>
                        {hours.map((day, dayIndex) => (
                            <div key={day.day_id} className={`card mb-3 ${day.editable ? 'bg-light' : 'bg-secondary'}`}>
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
                                                    disabled={!day.editable}
                                                />
                                                <label className="form-check-label" htmlFor={`closed-${day.day}`}>
                                                    {day.is_closed ? 'Closed' : 'Open'}
                                                </label>
                                            </div>
                                            {!day.is_closed && day.editable && (
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
                                                                disabled={!day.editable}
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
                                                                disabled={!day.editable}
                                                            >
                                                                {timeOptions.map((time) => (
                                                                    <option key={`end-${time}`} value={time}>{time}</option>
                                                                ))}
                                                            </select>
                                                            <label htmlFor={`end-time-${dayIndex}-${slotIndex}`}>End Time</label>
                                                        </div>
                                                    </div>
                                                    {slotIndex !== 0 && day.time_slots.length > 1 && (
                                                        <div className="col-auto">
                                                            <button
                                                                type="button"
                                                                onClick={() => markForDeletion(dayIndex, slotIndex)}
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
                            <button className="btn btn-primary" type="submit">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditOpeningHours;