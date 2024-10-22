/* eslint-disable react/no-unescaped-entities */
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typed from 'typed.js';
import axios from 'axios';
import Select from 'react-select';
import './search.css'
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

const HeroSearch = () => {
    const navigate = useNavigate();
    const API_BASE_URL = import.meta.env.VITE_API_URL;
    const typedRef = useRef(null);

    const [keyword, setKeyword] = useState('');
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [locationOptions, setLocationOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [userCity, setUserCity] = useState(null);

    useEffect(() => {
        const typed = new Typed(typedRef.current, {
            strings: ['Saloon', 'Restaurant', 'Cafe', 'Bar', 'Shop', 'Showrooms'],
            typeSpeed: 125,
            backSpeed: 75,
            loop: true
        });

        return () => typed.destroy();
    }, []);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [locationsResponse, categoriesResponse, citiesResponse] = await Promise.all([
                    axios.get(`${API_BASE_URL}/ma-detail-areas`),
                    axios.get(`${API_BASE_URL}/ma-active-categories`),
                    axios.get(`${API_BASE_URL}/ma-cities-for-search`),
                ]);

                let mergedOptions = [];

                if (citiesResponse.data.cities) {
                    const cityOptions = citiesResponse.data.cities.map(city => ({
                        id: city.id,
                        name: city.city_name,
                        isCity: true,
                    }));
                    mergedOptions = [...mergedOptions, ...cityOptions];
                }

                if (locationsResponse.data.areas) {
                    const areaOptions = locationsResponse.data.areas.map(area => ({
                        id: area.area_id,
                        name: `${area.area_name}, ${area.city_name}, ${area.states_name}`,
                        areaName: area.area_name,
                        cityName: area.city_name,
                        isCity: false,
                    }));
                    mergedOptions = [...mergedOptions, ...areaOptions];
                }

                mergedOptions = shuffleArray(mergedOptions);
                setLocationOptions(mergedOptions);

                if (categoriesResponse.data.active_category) {
                    setCategoryOptions(categoriesResponse.data.active_category.map(category => ({
                        label: category.category_name,
                        value: category.id,
                    })));
                }
            } catch (error) {
                console.error(`Error fetching options: ${error.message}`);
            }
        };

        fetchOptions();
        getUserLocation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [API_BASE_URL]);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const getUserLocation = () => {
        // const storedCity = localStorage.getItem('userCity');
        // if (storedCity) {
        //     setUserCity(storedCity);
        //     return;
        // }

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    reverseGeocode(latitude, longitude);
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    console.error("Unable to get your location. Please enable location services or select your city manually.");
                }
            );
        } else {
            console.error("Geolocation is not supported by your browser. Please select your city manually.");
        }
    };

    const reverseGeocode = async (latitude, longitude) => {
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const city = response.data.address.city || response.data.address.town || response.data.address.village;
            if (city) {
                setUserCity(city);
                localStorage.setItem('userCity', city);
            }
        } catch (error) {
            console.error("Reverse geocoding error:", error);
            console.error("Unable to determine your city. Please select your city manually.");
        }
    };

    const handleSearch = async () => {
        setIsLoading(true);
        try {
            const locationQuery = selectedLocation?.isCity
                ? selectedLocation.label
                : selectedLocation?.areaName || '';
            const params = new URLSearchParams({
                keyword: keyword || '',
                category: selectedCategory?.value || '',
                location: locationQuery
            });
            const response = await axios.get(`${API_BASE_URL}/ma-search?${params}`);
            const searchQuery = new URLSearchParams({
                keyword: keyword || '',
                category: selectedCategory?.label || '',
                location: locationQuery
            }).toString();
            let resultsToShow = response.data;
            if (Array.isArray(resultsToShow) && resultsToShow.length > 0) {
                // Only filter by user city if no specific location was selected
                if (userCity && !locationQuery) {
                    resultsToShow = resultsToShow.filter(item =>
                        item.city_name?.toLowerCase() === userCity.toLowerCase()
                    );
                }
                if (resultsToShow.length > 0) {
                    navigate(`/search?${searchQuery}`, { state: { searchResults: resultsToShow } });
                } else {
                    navigate('/search', { state: { message: 'No results found for the specified city' } });
                }
            } else {
                navigate('/search', {
                    state: {
                        message: 'No results found',
                        keyword: [keyword, selectedCategory?.label, locationQuery].filter(Boolean).join(' in ')
                    }
                });
            }
        } catch (error) {
            console.error('Error fetching results:', error);
            navigate('/search', { state: { message: 'An error occurred while searching' } });
        } finally {
            setIsLoading(false);
        }
    };

    const customStyles = {
        control: (baseStyles) => ({
            ...baseStyles,
            minHeight: '3rem',
            borderRadius: '0.375rem',
            border: '1px solid #e2e8f0',
        }),
        valueContainer: (baseStyles) => ({
            ...baseStyles,
            padding: '0.5rem',
        }),
        placeholder: (baseStyles) => ({
            ...baseStyles,
            color: '#a0aec0',
        }),
        input: (baseStyles) => ({
            ...baseStyles,
            margin: 0,
            padding: 0,
        }),
        menu: (baseStyles) => ({
            ...baseStyles,
            zIndex: 50,
            color: '#000'
        }),
    };

    useEffect(() => {
        if (userCity && locationOptions.length > 0) {
            const cityOption = locationOptions.find(option => option.label.toLowerCase() === userCity.toLowerCase() && option.isCity);
            if (cityOption) {
                setSelectedLocation(cityOption);
            }
        }
    }, [userCity, locationOptions]);

    const handleOnSelect = (item) => {
        // the item selected
        setSelectedLocation(item);
    };

    const formatResult = (item) => {
        return (
            <>
                <span style={{ display: 'block', textAlign: 'left', whiteSpace: 'normal', wordWrap: 'break-word' }}>{item.name}</span>
            </>
        );
    };

    return (
        <section
            id="hero-area"
            className="relative bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: 'url("https://code-theme.com/html/listifind/images/bg/bg-2.jpg")'
            }}
        >
            <div className="absolute inset-0 bg-[#00000070]"></div>
            <div className="relative z-10 container mx-auto px-4 py-24 2xl:min-h-[500px] 2xl:top-[120px] min-h-[500px] top-[60px]">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Find Nearby : <span ref={typedRef} className="typed border-b-2 border-[#fa2964e6]"></span>
                    </h1>
                    <p className="text-xl text-white mt-4">Let's uncover the best places to eat, drink, and shop nearest to you.</p>
                </div>
                <div className="bg-white bg-opacity-30 rounded-lg shadow-lg p-2 max-w-4xl mx-auto backdrop-filter backdrop-blur-sm">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <input
                                    type="text"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    placeholder="Search Catalogues"
                                    className="w-full h-12 px-2 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa2964e6]"
                                />
                            </div>
                            <div className="relative" style={{ zIndex: 1 }}>
                                <ReactSearchAutocomplete
                                    items={locationOptions}
                                    onSelect={handleOnSelect}
                                    formatResult={formatResult}
                                    placeholder='Select Location'
                                    styling={{
                                        width: '100%',
                                        height: "48px",
                                        border: "1px solid #e2e8f0",
                                        borderRadius: "0.375rem",
                                        backgroundColor: "white",
                                        boxShadow: "none",
                                        hoverBackgroundColor: "#f3f4f6",
                                        color: "black",
                                        fontSize: "16px",
                                        iconColor: "#a0aec0",
                                        lineColor: "#fa2964e6",
                                        placeholderColor: "#a0aec0",
                                        clearIconMargin: '3px 14px 0 0',
                                        zIndex: 2,
                                    }}
                                />
                            </div>
                            <div>
                                <Select
                                    placeholder="Select Category"
                                    value={selectedCategory}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    isClearable={true}
                                    isSearchable={true}
                                    onChange={setSelectedCategory}
                                    options={categoryOptions}
                                    styles={customStyles}
                                    components={{
                                        DropdownIndicator: () => null,
                                        IndicatorSeparator: () => null
                                    }}
                                />
                            </div>
                            <div>
                                <button
                                    className="w-full h-12 bg-[#fa2964e6] hover:bg-pink-600 text-white text-xl py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    onClick={handleSearch}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Searching...' : 'Search'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSearch;