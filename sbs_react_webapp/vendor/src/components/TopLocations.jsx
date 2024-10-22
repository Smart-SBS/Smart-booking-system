/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useState, useEffect, useMemo } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const TopLocations = () => {
    // Navigation function
    const navigate = useNavigate();

    // APP URL and IMG URL
    const API_URL = import.meta.env.VITE_API_URL;
    const IMG_URL = import.meta.env.VITE_IMG_URL;

    // state intialization
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch popular cities
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_URL}/ma-popular-cities`);
                if (response.status === 200) {
                    const filteredLocations = response.data.Cities.filter(city => city.is_popular === "1" && city.status === "1");
                    setLocations(filteredLocations);
                    if (filteredLocations.length === 0) {
                        setError("No popular cities found.");
                    }
                }
                else {
                    throw new Error("Unexpected response status");
                }
            } catch (error) {
                if (error.response && error.response.status === 503) {
                    console.log('HTTP 503 error: Service Unavailable');
                } else {
                    console.log('An error occurred:', error.message);
                }
                setError("Server Error. Please try again later");
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
    }, [API_URL]);

    // handle location search
    const handleLocation = useMemo(() => async (location) => {
        try {
            const response = await axios.get(`${API_URL}/ma-search?location=${location}`);

            if (response.data && Array.isArray(response.data) && response.data.length > 0) {
                navigate(`/search?location=${location}`, { state: { searchResults: response.data } });
            } else {
                navigate('/search', { state: { message: `${location} doesn't have catalogs yet`, keyword: location } });
            }
        } catch (error) {
            let errorMessage = 'An error occurred while searching';
            if (error.response?.data?.message) {
                errorMessage = typeof error.response.data.message === 'object'
                    ? Object.values(error.response.data.message).join(', ')
                    : error.response.data.message;
            }
            console.error('Error fetching results:', errorMessage);
        }
    }, [API_URL, navigate]);

    // Setting for slick
    const settings = useMemo(() => ({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        dotsClass: "slick-dots custom-dots",
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
        customPaging: function () {
            return (
                <div className="custom-dot"></div>
            );
        },
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }), []);

    if (loading) {
        return (
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <p>Loading top locations...</p>
                </div>
            </section>
        );
    }

    if (error || locations.length === 0) {
        return (
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl text-black font-bold mb-2">TOP LOCATIONS</h2>
                    <p className="text-gray-600 text-center mb-8">Explore Your Dream Places.</p>
                    <p className="text-gray-600">{error || "No content available"}</p>
                </div>
            </section>
        );
    }

    return (
        <>
            <style jsx="true" >{`
                .custom-dots {
                    position: absolute;
                    bottom: -30px;
                    display: flex !important;
                    justify-content: center;
                    width: 100%;
                    padding: 0;
                    margin: 0;
                    list-style: none;
                    text-align: center;
                }

                .custom-dots li {
                    position: relative;
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    margin: 0 5px;
                    padding: 0;
                    cursor: pointer;
                }

                .custom-dot {
                    width: 10px;
                    height: 10px;
                    background-color: #fff;
                    border-radius: 50%;
                    transition: background-color 0.3s ease;
                    display: inline-block;
                }

                .custom-dots li.slick-active .custom-dot {
                    background-color: #ff4081;
                }

                .custom-dots li:hover .custom-dot {
                    background-color: #999;
                }
            `}</style>

            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4 2xl:container 2xl:mx-auto 2xl:px-4">
                    <h2 className="text-3xl text-black font-bold text-center mb-2">TOP LOCATIONS</h2>
                    <p className="text-gray-600 text-center mb-8">Explore Your Dream Places.</p>
                    <Slider {...settings}>
                        {locations.map((location, index) => (
                            <div
                                key={index}
                                className='px-8 hover:cursor-pointer'
                            >
                                <div className="relative overflow-hidden w-full h-96 border-[#eaeff5] border-[1px]" style={{ boxShadow: "rgba(71, 85, 95, 0.08) 0px 0px 10px 1px" }} onClick={() => handleLocation(location.city_name)}>
                                    <img
                                        src={location.city_image ? `${IMG_URL}/city-images/thumb/${location.city_image}` : `https://placehold.co/327x400?text=${location.city_name}`}
                                        alt={location.city_name}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        style={{ cursor: 'pointer' }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                                        <div className="absolute bottom-4 left-4 text-white">
                                            <h3 className="text-xl font-semibold">{location.city_name}</h3>
                                            <h4 className="text-md font-semibold my-1">View listings</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </section>
        </>
    );
};

export default TopLocations;

const CustomNextArrow = ({ onClick }) => (
    <div
        onClick={onClick}
        className="absolute top-1/2 -right-1 -translate-y-1/2 z-10 cursor-pointer"
    >
        <IoIosArrowDroprightCircle color='#999' size={30} />
    </div>
);

const CustomPrevArrow = ({ onClick }) => (
    <div
        onClick={onClick}
        className="absolute top-1/2 -left-1 -translate-y-1/2 z-10 cursor-pointer"
    >
        <IoIosArrowDropleftCircle color='#999' size={30} />
    </div>
);