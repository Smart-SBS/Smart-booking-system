import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import LeftSidebar from './LeftSidebar';

const Dashboard = () => {
    // State initialization
    const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
    const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
    const location = useLocation();

    // Effect to close sidebar on route change (mobile only)
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setRightSidebarOpen(true);
                setLeftSidebarOpen(true);
            } else {
                setRightSidebarOpen(false);
                setLeftSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call it initially

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (window.innerWidth < 768) {
            setRightSidebarOpen(false);
            setLeftSidebarOpen(false);
        }
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

    // Effect to close sidebar on route change
    useEffect(() => {
        setLeftSidebarOpen(false);
        setRightSidebarOpen(false);
    }, [location]);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar for desktop */}
            <div className="hidden md:block w-64 bg-white" style={{ overflowX: 'hidden', scrollbarWidth: 'thin', overflowY: 'scroll' }}>
                <Sidebar />
            </div>

            {/* Left Sidebar */}
            <div className={`fixed inset-y-0 left-0 transform ${leftSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out bg-white z-30 md:hidden`}>
                <LeftSidebar
                    isOpen={leftSidebarOpen}
                />
            </div>

            {/* Right Sidebar */}
            <div className={`fixed inset-y-0 right-0 transform ${rightSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-200 ease-in-out bg-white z-30 md:hidden`}>
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <DashboardHeader
                    toggleLeftSidebar={toggleLeftSidebar}
                    toggleRightSidebar={toggleRightSidebar} />

                {/* Main Content Area */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Dashboard;