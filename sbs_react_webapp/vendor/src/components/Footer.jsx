import { useDispatch, useSelector } from "react-redux";
import { MapPin, Phone, Mail } from "lucide-react";
import { openAuthPopup } from '../redux/slices/authPopupSlice';

const Footer = () => {
    const dispatch = useDispatch();
    const { token } = useSelector(state => state.auth);
    const handleLoginClick = () => {
        dispatch(openAuthPopup());
    };

    const quickLinks1 = [
        { name: 'Home', url: '/' },
        ...(token ? [{ name: 'Dashboard', url: '/dashboard' }] : []),
        { name: 'Register', url: '#', onClick: handleLoginClick },
        { name: 'Blogs', url: '#' }
    ];

    const quickLinks2 = [
        { name: 'Pricing', url: '#' },
        { name: 'Contact', url: '#' },
        { name: 'Support', url: '#' },
    ];

    const instagramImages = [
        '/img1.jpeg', '/img2.jpeg', '/img3.jpeg',
        '/img4.jpeg', '/img5.jpg', '/img6.jpeg',
        '/img7.jpeg', '/img8.jpg', '/img9.jpeg'
    ];

    return (
        <footer className="bg-[#0f1424] text-white py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Company Info */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-2">
                            <img src="/logo.png" alt="ListFind Logo" className="h-14" />
                        </div>
                        <p className="text-white">
                            Discover incredible destinations and experiences around the globe. From exotic getaways to local adventures, find the perfect location for your next trip or outing. Let us guide you to the best places and make your journey unforgettable.
                        </p>
                        <div className="space-y-3 text-white">
                            <p className="flex items-center space-x-3">
                                <MapPin className="text-[#fa2964e6]" size={24} />
                                <a href="https://maps.app.goo.gl/RG3qpXYjv2Xcby2SA" target="_blank">
                                    Olympia Phase 1, Baner, Pune, Maharashtra, India-411045
                                </a>
                            </p>
                            <p className="flex items-center space-x-3">
                                <Phone className="text-[#fa2964e6]" size={18} />
                                <a href="tel:73993 04545">(91+)73993 04545</a>
                            </p>
                            <p className="flex items-center space-x-3">
                                <Mail className="text-[#fa2964e6]" size={18} />
                                <a href="mailto:contact@smartscripts.tech">contact@smartscripts.tech</a>
                            </p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-semibold mb-6">
                            Quick Links
                            <div className="h-1 w-12 bg-[#fa2964e6] mt-2"></div>
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <ul className="space-y-3">
                                {quickLinks1.map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href={link.url}
                                            className="text-white hover:text-[#fa2964e6] transition-colors duration-300 flex items-center"
                                            onClick={(e) => {
                                                if (link.onClick) {
                                                    e.preventDefault();
                                                    link.onClick();
                                                }
                                            }}>
                                            <span className="mr-2 text-lg">»</span>
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <ul className="space-y-3">
                                {quickLinks2.map((link, index) => (
                                    <li key={index}>
                                        <a href={link.url} className="text-white hover:text-[#fa2964e6] transition-colors duration-300 flex items-center">
                                            <span className="mr-2 text-lg">»</span>
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Instagram */}
                    <div>
                        <h3 className="text-xl font-semibold mb-6">
                            Instagram
                            <div className="h-1 w-12 bg-[#fa2964e6] mt-2"></div>
                        </h3>
                        <div className="grid grid-cols-3 gap-2">
                            {instagramImages.map((img, index) => (
                                <div key={index} className="aspect-square overflow-hidden rounded-sm">
                                    <img
                                        src={img}
                                        alt={`Instagram post ${index + 1}`}
                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-xl font-semibold mb-6">
                            Newsletters
                            <div className="h-1 w-12 bg-[#fa2964e6] mt-2"></div>
                        </h3>
                        <p className="text-white mb-6">
                            Sign Up for Our Newsletter to get Latest Updates and Offers. Subscribe to receive news in your inbox.
                        </p>
                        <form className="space-y-4">
                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                className="w-full px-4 py-3 bg-[#1c2237] border border-[#2e344d] rounded-md focus:outline-none focus:border-[#fa2964e6] text-gray-300"
                            />
                            <button
                                type="submit"
                                className="w-full bg-[#fa2964e6] text-white py-3 px-4 rounded-md hover:bg-pink-600 transition-colors duration-300"
                            >
                                SUBSCRIBE
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-[#2e344d] flex flex-col md:flex-row justify-between items-center">
                    <p className="text-white">
                        ©2024 All rights reserved by Smartscripts Private Limited.
                    </p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a href="#" className="text-white hover:text-[#fa2964e6]">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="text-white hover:text-[#fa2964e6]">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="text-white hover:text-[#fa2964e6]">
                            <i className="fab fa-google-plus-g"></i>
                        </a>
                        <a href="#" className="text-white hover:text-[#fa2964e6]">
                            <i className="fab fa-youtube"></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;