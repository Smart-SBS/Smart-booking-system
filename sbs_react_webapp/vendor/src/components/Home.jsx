import HeroSearch from './HeroSearch'
import TopLocations from './TopLocations'
import PopularListings from './PopularListings'
import HowItWorks from './HowItWorks'
import Header from './Header';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';
import LeftSidebar from './LeftSidebar';
import PopularShops from './PopularShops';

const Home = () => {
    // State initialization
    const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
    const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
    const location = useLocation();

    // Effect to close sidebar on route change
    useEffect(() => {
        setLeftSidebarOpen(false);
        setRightSidebarOpen(false);
    }, [location]);

    // Toggle Right Sidebar Functionality
    const toggleRightSidebar = () => {
        setLeftSidebarOpen(false);
        setRightSidebarOpen(prev => !prev);
    };

    // Toggle Left Sidebar Functionality
    const toggleLeftSidebar = () => {
        setRightSidebarOpen(false);
        setLeftSidebarOpen(prev => !prev);
    };

    return (
        <>
            {/* Left Sidebar */}
            <div className={`fixed inset-y-0 left-0 transform ${leftSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out bg-white z-30 md:hidden`}>
                <LeftSidebar isOpen={leftSidebarOpen} />
            </div>

            {/* Right Sidebar */}
            <div className={`fixed inset-y-0 right-0 transform ${rightSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-200 ease-in-out bg-white z-30 md:hidden`}>
                <Sidebar />
            </div>

            <Header toggleLeftSidebar={toggleLeftSidebar} toggleRightSidebar={toggleRightSidebar} />

            <HeroSearch />
            <TopLocations />
            <PopularShops />
            <PopularListings />
            <HowItWorks />
            <Footer />
        </>
    );

}

export default Home