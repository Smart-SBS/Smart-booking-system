/* eslint-disable react/prop-types */
const OpeningHoursCard = ({ openingHours = [] }) => {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const groupedHours = daysOfWeek.map(day => {
        const daySlots = openingHours.filter(slot => slot.day_name === day);
        return {
            day,
            slots: daySlots,
            isClosed: daySlots.length === 0 || daySlots.some(slot => slot.is_closed === "0")
        };
    });

    const formatTime = (time) => {
        return new Date(`2024-01-01 ${time}`).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    };

    return (
        <div className={`max-w-sm mt-6 bg-white p-6 border-[#eaeff5] border-[1px]`} style={{ boxShadow: "rgba(71, 85, 95, 0.08) 0px 0px 10px 1px" }}>
            <div className="flex items-center gap-2 mb-4">
                <h2 className="text-2xl font-bold pb-1 text-gray-900 inline-block border-b-4 border-[#fa2964] mb-4">
                    Opening Hours
                </h2>
            </div>
            <div className="space-y-3">
                {openingHours.length === 0 ? (
                    <div className="text-start text-gray-500">
                        No opening hours found for the shop
                    </div>
                ) : (
                    groupedHours.map(({ day, slots, isClosed }) => (
                        <div key={day} className="flex justify-between items-start text-sm">
                            <span className="font-medium text-gray-700">{day}</span>
                            <div className="text-right">
                                {isClosed ? (
                                    <span className="text-gray-500">Closed</span>
                                ) : (
                                    <div className="flex flex-col items-end">
                                        {slots.map((slot, idx) => (
                                            <span key={idx} className="text-gray-600">
                                                {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default OpeningHoursCard;