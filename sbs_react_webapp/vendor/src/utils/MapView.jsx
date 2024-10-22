/* eslint-disable react/prop-types */
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import MapBounds from './MapBounds';
import getCoordinates from './getCoordinates';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect } from 'react';

const MapView = ({ listings }) => {
    const [coordinatesList, setCoordinatesList] = useState([]);

    useEffect(() => {
        const fetchCoordinates = async () => {
            const coords = await Promise.all(listings.map(async (listing) => {
                const coordinates = await getCoordinates(listing.area_name);
                return coordinates ? { ...listing, coordinates: [coordinates.lat, coordinates.lon] } : null;
            }));
            setCoordinatesList(coords.filter(coord => coord !== null));
        };

        fetchCoordinates();
    }, [listings]);

    return (
        coordinatesList.length > 0 && coordinatesList.every(listing => listing.coordinates) ? (
            <MapContainer center={coordinatesList[0].coordinates} zoom={11} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <MapBounds listings={listings} />
                {coordinatesList.map((listing, index) => (
                    <Marker key={listing.id || index} position={listing.coordinates}>
                        <Popup>
                            <div>
                                <h3 className="font-semibold">{listing.item_title}</h3>
                                <p>{listing.area_name}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        ) : (
            <div>Loading map...</div>
        )
    );
};

export default MapView