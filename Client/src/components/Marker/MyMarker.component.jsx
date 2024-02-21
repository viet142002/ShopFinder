import { useEffect, useState } from 'react';
import { Marker } from 'react-leaflet';
import { useDispatch } from 'react-redux';

import { setCurrentLocation } from '../../redux/routingSlice';

function MyMarker() {
    const [coords, setCoords] = useState({ lat: 0, lng: 0 });

    const dispatch = useDispatch();

    useEffect(() => {
        const navigate = navigator.geolocation.watchPosition(
            (position) => {
                setCoords({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            },
            (error) => {
                alert('Error getting location');
                console.log(error);
            },
            {
                timeout: 10000,
                enableHighAccuracy: true
            }
        );
        return () => {
            navigator.geolocation.clearWatch(navigate);
        };
    }, []);

    useEffect(() => {
        dispatch(setCurrentLocation(coords));
    }, [coords, dispatch]);

    return (
        <Marker
            position={[coords.lat, coords.lng]}
            zIndexOffset={99999}
        ></Marker>
    );
}

export default MyMarker;
