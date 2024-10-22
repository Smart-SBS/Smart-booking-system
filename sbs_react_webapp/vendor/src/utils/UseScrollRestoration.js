import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const useScrollRestoration = (maxEntries = 50) => {
    const { pathname } = useLocation();
    const navigationType = useNavigationType();
    const scrollPositions = useRef(new Map());

    const storeScrollPosition = () => {
        scrollPositions.current.set(pathname, window.scrollY);
        // Limit the size of the Map
        if (scrollPositions.current.size > maxEntries) {
            const oldestKey = scrollPositions.current.keys().next().value;
            scrollPositions.current.delete(oldestKey);
        }
    };

    const restoreScrollPosition = () => {
        if (navigationType === 'POP') {
            const scrollY = scrollPositions.current.get(pathname);
            if (scrollY !== undefined) {
                requestAnimationFrame(() => {
                    try {
                        window.scrollTo({
                            top: scrollY,
                            behavior: 'auto'
                        });
                    } catch (error) {
                        console.error('Failed to restore scroll position:', error);
                    }
                });
            }
        } else {
            requestAnimationFrame(() => {
                try {
                    window.scrollTo({
                        top: 0,
                        behavior: 'auto'
                    });
                } catch (error) {
                    console.error('Failed to scroll to top:', error);
                }
            });
        }
    };

    useEffect(() => {
        // Restore scroll position after the DOM has updated
        restoreScrollPosition();

        // Store scroll position when leaving the page
        return storeScrollPosition;
    }, [pathname, navigationType]);

    return null;
};

export default useScrollRestoration;
