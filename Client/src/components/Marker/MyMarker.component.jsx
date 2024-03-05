import { useEffect, useState } from 'react';
import { Marker, Circle } from 'react-leaflet';

import { useDispatch, useSelector } from 'react-redux';

import { setCurrentLocation } from '../../redux/routingSlice';

function MyMarker() {
    const [coords, setCoords] = useState({ lat: 0, lng: 0 });
    const dispatch = useDispatch();
    const radius = useSelector((state) => state.search.radius);

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
        <>
            <Marker
                position={[coords.lat, coords.lng]}
                zIndexOffset={99999}
            ></Marker>
            <Circle center={[coords.lat, coords.lng]} radius={radius * 1000} />
        </>
    );
}

export default MyMarker;
