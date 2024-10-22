import mapIcon from '/map.png';
import emailIcon from '/contact.png';
import calendarIcon from '/user.png';
import worldMap from '/3d-map.png';

const HowItWorks = () => {
    const steps = [
        {
            icon: mapIcon,
            title: 'Find Great Places',
            description: 'Discover top-rated locations and hidden gems in your area. Whether you’re looking for restaurants, shops, or attractions, our platform helps you find the best spots tailored to your interests.'
        },
        {
            icon: emailIcon,
            title: 'Get in Touch with Owners',
            description: 'Connect directly with business owners or service providers. Ask questions, get more details, and make arrangements to ensure a seamless experience.'
        },
        {
            icon: calendarIcon,
            title: 'Book Your Visit',
            description: 'Secure your spot by making reservations or appointments through our platform. Enjoy the convenience of scheduling and managing your visits effortlessly.'
        }
    ];

    return (
        <div className="py-16 2xl:py-16">
            <h2 className="text-3xl text-black font-bold text-center mb-2">HOW IT WORKS</h2>
            <p className="text-center text-gray-600 mb-12">Easy To Use.</p>

            <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
                    {steps.map((step, index) => (
                        <div key={index} className="text-center p-3 w-80 rounded-sm border-[#eaeff5] border-[1px]" style={{ boxShadow: "rgba(71, 85, 95, 0.08) 0px 0px 10px 1px" }}>
                            <div className="mb-4 flex justify-center">
                                <img src={step.icon} alt={step.title} className="w-16 h-16" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <ExploreTheWorld />
        </div>
    );
};

const ExploreTheWorld = () => {
    return (
        <div className="mt-16 bg-[#fa2964e6] overflow-hidden">
            <div className="w-full px-4 py-16 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-8 md:mb-0">
                    <img src={worldMap} alt="World Map" className="w-full" />
                </div>
                <div className="md:w-1/2 md:pl-8 text-white">
                    <h2 className="text-3xl font-bold mb-4">EXPLORE THE WORLD</h2>
                    <p className="mb-6">
                        Discover incredible destinations and experiences around the globe. From exotic getaways to local adventures, find the perfect location for your next trip or outing. Let us guide you to the best places and make your journey unforgettable.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
