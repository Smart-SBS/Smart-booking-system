/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback, useMemo } from "react";
import PropTypes from 'prop-types';
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { isAfter, isBefore, setHours, setMinutes, startOfDay, isToday, addDays } from 'date-fns';
import './booking.css';

const useOpenHours = (shopId) => {
    const APP_URL = import.meta.env.VITE_API_URL;
    const [state, setState] = useState({
        error: null,
        openHours: []
    });

    useEffect(() => {
        const fetchData = async () => {
            if (!shopId) return;

            try {
                const response = await axios.get(`${APP_URL}/ma-openhours/${shopId}`);
                if (response.status === 200) {
                    setState(prev => ({ ...prev, openHours: response.data.OpenHours }));
                } else if (response.status === 204) {
                    setState(prev => ({ ...prev, isLoading: false, error: 'No enquiry can be made since there are no opening hours for this shop.' }));
                }
            } catch (error) {
                const errorMessage = error.response?.data?.message;
                const errorMessages = typeof errorMessage === 'object'
                    ? Object.values(errorMessage).join(', ')
                    : errorMessage || error.message;
                setState(prev => ({ ...prev, isLoading: false, error: errorMessages }));
                console.error(`Error fetching vendor OpenHours data: ${errorMessages}`);
            }
        };

        fetchData();
    }, [APP_URL, shopId]);

    return state;
};

const BookingForm = ({ catalogueData }) => {
    const navigate = useNavigate();
    const { error, openHours } = useOpenHours(catalogueData?.shop_id);
    const [message, setMessage] = useState('')
    const [bookingData, setBookingData] = useState({
        message: "",
        visit_date: new Date(),
        visit_time: new Date()
    });

    useEffect(() => {
        const now = new Date();
        setBookingData(prevData => ({
            ...prevData,
            visit_date: now,
            visit_time: now
        }));
    }, []);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(''); // Clears the message after 2 seconds
            }, 3000);

            return () => clearTimeout(timer); // Cleanup on component unmount
        }
    }, [message]); // Triggered when `message` state changes

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setBookingData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }, []);

    const handleDateChange = useCallback((date) => {
        setBookingData(prevData => ({
            ...prevData,
            visit_date: date,
            visit_time: setHours(setMinutes(date, prevData.visit_time.getMinutes()), prevData.visit_time.getHours())
        }));
    }, []);

    const handleTimeChange = useCallback((time) => {
        setBookingData(prevData => ({
            ...prevData,
            visit_time: time
        }));
    }, []);

    const getDayOpenHours = useCallback((date) => {
        const dayOfWeek = date.getDay();
        return openHours.filter(hour => parseInt(hour.day_id) === (dayOfWeek === 0 ? 7 : dayOfWeek));
    }, [openHours]);

    const findNextAvailableSlot = useCallback((date) => {
        let currentDate = new Date(date);
        let attempts = 0;
        const maxAttempts = 7; // Look up to a week ahead

        while (attempts < maxAttempts) {
            const dayOpenHours = getDayOpenHours(currentDate);

            for (const hour of dayOpenHours) {
                if (hour.is_closed === "1") {
                    const [openHoursStr, openMinutes] = hour.start_time.split(':');
                    const [closeHoursStr, closeMinutes] = hour.end_time.split(':');

                    let openTime = setHours(setMinutes(currentDate, parseInt(openMinutes)), parseInt(openHoursStr));
                    let closeTime = setHours(setMinutes(currentDate, parseInt(closeMinutes)), parseInt(closeHoursStr));

                    // Handle case where closing time is on the next day
                    if (isBefore(closeTime, openTime)) {
                        closeTime = setHours(setMinutes(addDays(currentDate, 1), parseInt(closeMinutes)), parseInt(closeHoursStr));
                    }

                    const now = new Date();
                    const currentTime = setHours(setMinutes(now, now.getMinutes()), now.getHours());

                    // If it's today and the open time is in the past, start from the current time
                    if (isToday(currentDate) && isBefore(openTime, currentTime)) {
                        openTime = currentTime;
                    }

                    // Check if there's still time available today
                    if (isAfter(closeTime, openTime)) {
                        // Round up to the nearest 15 minutes
                        const minutes = openTime.getMinutes();
                        const roundedMinutes = Math.ceil(minutes / 15) * 15;
                        openTime = setMinutes(openTime, roundedMinutes);

                        // If rounding up pushed us to the next hour, adjust accordingly
                        if (openTime.getMinutes() === 0) {
                            openTime = setHours(openTime, openTime.getHours() + 1);
                        }

                        // Ensure the rounded time is still before closing time
                        if (isBefore(openTime, closeTime)) {
                            return {
                                date: currentDate,
                                time: openTime
                            };
                        }
                    }
                }
            }

            currentDate = addDays(currentDate, 1);
            attempts++;
        }

        return null; // If no slot found within a week
    }, [getDayOpenHours]);

    const validateEnquiryDateTime = useCallback(() => {
        const selectedDate = bookingData.visit_date;
        const selectedTime = bookingData.visit_time;
        const dayOpenHours = getDayOpenHours(selectedDate);

        if (dayOpenHours.length === 0) {
            toast.error("Unable to determine shop hours for the selected day.");
            return false;
        }

        if (dayOpenHours.every(hour => hour.is_closed === "0")) {
            const nextSlot = findNextAvailableSlot(selectedDate);
            if (nextSlot) {
                setBookingData(prevData => ({
                    ...prevData,
                    visit_date: nextSlot.date,
                    visit_time: nextSlot.time
                }));
                setMessage(`Shop is closed on the selected day. We've selected the next available slot for you.`);
            } else {
                setMessage("No available slots found within the next week.");
            }
            return false;
        }

        const isValidTime = dayOpenHours.some(shopHours => {
            const [openHoursStr, openMinutes] = shopHours.start_time.split(':');
            const [closeHoursStr, closeMinutes] = shopHours.end_time.split(':');

            let openTime = setHours(setMinutes(selectedDate, parseInt(openMinutes)), parseInt(openHoursStr));
            let closeTime = setHours(setMinutes(selectedDate, parseInt(closeMinutes)), parseInt(closeHoursStr));

            // Handle case where closing time is on the next day
            if (isBefore(closeTime, openTime)) {
                closeTime = setHours(setMinutes(addDays(selectedDate, 1), parseInt(closeMinutes)), parseInt(closeHoursStr));
            }

            // If it's today, don't allow times before the current time
            if (isToday(selectedDate)) {
                const now = new Date();
                if (isBefore(openTime, now)) {
                    openTime = now;
                }
            }
            return !isBefore(selectedTime, openTime) && !isAfter(selectedTime, closeTime);
        });

        if (!isValidTime) {
            const nextSlot = findNextAvailableSlot(selectedDate);
            if (nextSlot) {
                setBookingData(prevData => ({
                    ...prevData,
                    visit_date: nextSlot.date,
                    visit_time: nextSlot.time
                }));
                setMessage(`Selected time is outside shop hours. We've selected the next available slot for you.`);
            } else {
                setMessage("No available slots found within the next week.");
            }
            return false;
        }

        return true;
    }, [bookingData.visit_date, bookingData.visit_time, getDayOpenHours, findNextAvailableSlot]);

    const handleEnquireClick = useCallback((e) => {
        e.preventDefault();
        if (validateEnquiryDateTime()) {
            try {
                // Create a new Date object to ensure we're working with the correct local time
                const localEnquiryDate = new Date(bookingData.visit_date);
                const localEnquiryTime = new Date(bookingData.visit_time);

                // Combine date and time into a single Date object
                const combinedDateTime = new Date(
                    localEnquiryDate.getFullYear(),
                    localEnquiryDate.getMonth(),
                    localEnquiryDate.getDate(),
                    localEnquiryTime.getHours(),
                    localEnquiryTime.getMinutes()
                );

                const newItem = {
                    shop_info: {
                        catalog_name: catalogueData.item_title,
                        catalog_id: catalogueData.id,
                        vendor_id: catalogueData.user_id,
                        vendor: `${catalogueData.firstname} ${catalogueData.lastname}`,
                        area_name: catalogueData.area_name,
                        shop_image: catalogueData.primary_catalog_image,
                        city_name: catalogueData.city_name,
                        shop_name: catalogueData.shop_name,
                        states_name: catalogueData.states_name,
                    },
                    order_info: {
                        sale_price: parseInt(catalogueData.sale_price),
                        final_price: parseFloat(catalogueData.sale_price) * 1.1,
                        visit_date: localEnquiryDate.toISOString(),
                        visit_time: combinedDateTime.toISOString(),
                        message: bookingData.message,
                    },
                    timezone_offset: combinedDateTime.getTimezoneOffset()
                };

                setTimeout(() => {
                    navigate('/checkout', { state: { orderDetails: newItem } });
                }, 1000);
            } catch (error) {
                console.error(error.message);
            }
        }
    }, [catalogueData, bookingData, navigate, validateEnquiryDateTime]);

    const filterAvailableDates = useCallback((date) => {
        const today = startOfDay(new Date());
        if (isBefore(date, today)) return false;

        const dayOpenHours = getDayOpenHours(date);
        return dayOpenHours.some(hour => hour.is_closed === "1");
    }, [getDayOpenHours]);

    const filterAvailableTimes = useMemo(() => {
        return (time) => {
            if (openHours.length === 0) return false;

            const selectedDate = bookingData.visit_date;
            const dayOpenHours = getDayOpenHours(selectedDate);

            if (dayOpenHours.length === 0 || dayOpenHours.every(hour => hour.is_closed === "0")) return false;

            return dayOpenHours.some(shopHours => {
                const [openHoursStr, openMinutes] = shopHours.start_time.split(':');
                const [closeHoursStr, closeMinutes] = shopHours.end_time.split(':');

                let openTime = setHours(setMinutes(selectedDate, parseInt(openMinutes)), parseInt(openHoursStr));
                let closeTime = setHours(setMinutes(selectedDate, parseInt(closeMinutes)), parseInt(closeHoursStr));

                // Handle case where closing time is on the next day
                if (isBefore(closeTime, openTime)) {
                    closeTime = setHours(setMinutes(addDays(selectedDate, 1), parseInt(closeMinutes)), parseInt(closeHoursStr));
                }

                // If it's today, don't allow times before the current time
                if (isToday(selectedDate)) {
                    const now = new Date();
                    if (isBefore(openTime, now)) {
                        openTime = now;
                    }
                }

                return !isBefore(time, openTime) && !isAfter(time, closeTime);
            });
        };
    }, [bookingData.visit_date, getDayOpenHours, openHours]);

    if (error) {
        return <div className="max-w-sm text-red-500 bg-white font-bold rounded-lg p-6 border-[#eaeff5] border-[1px]" style={{ boxShadow: "rgba(71, 85, 95, 0.08) 0px 0px 10px 1px" }}>No enquiry can be made since there are no opening hours for this shop.</div>;
    }

    return (
        <div className="max-w-sm bg-white mb-8 rounded-lg p-6 border-[#eaeff5] border-[1px]" style={{ boxShadow: "rgba(71, 85, 95, 0.08) 0px 0px 10px 1px" }}>
            <Toaster />
            <h2 className="text-2xl font-bold pb-1 text-gray-900 inline-block border-b-4 border-[#fa2964] mb-4">Book Now</h2>
            <form onSubmit={handleEnquireClick}>
                <div className="mb-4">
                    <label htmlFor="visit_date" className="block text-gray-700 mb-2">Visit Date</label>
                    <DatePicker
                        selected={bookingData.visit_date}
                        onChange={handleDateChange}
                        filterDate={filterAvailableDates}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="visit_time" className="block text-gray-700 mb-2">Visit Time</label>
                    <DatePicker
                        selected={bookingData.visit_time}
                        onChange={handleTimeChange}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        filterTime={filterAvailableTimes}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                    <textarea
                        rows={3}
                        id="message"
                        name="message"
                        value={bookingData.message}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>
                {message && (
                    <div className="w-full px-3 py-2 font-semibold border rounded mb-4 text-green-700">
                        {message}
                    </div>
                )}
                <button
                    type="submit"
                    className="w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 cursor-pointer"
                >
                    Book now
                </button>
            </form>
        </div>
    );
};

BookingForm.propTypes = {
    catalogueData: PropTypes.shape({
        shop_id: PropTypes.string.isRequired,
    }).isRequired,
};

export default BookingForm;