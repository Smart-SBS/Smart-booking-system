/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
    iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
    shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
});

const MapBounds = ({ listings }) => {
    const map = useMap();

    useEffect(() => {
        if (listings.length > 0) {
            const validCoordinates = listings
                .filter(listing => listing.coordinates && listing.coordinates.length === 2);

            if (validCoordinates.length > 0) {
                const bounds = L.latLngBounds(validCoordinates.map(listing => listing.coordinates));
                map.fitBounds(bounds);
            }
        }
    }, [listings, map]);

    return null;
};

export default MapBounds