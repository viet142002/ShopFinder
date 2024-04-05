import { useEffect } from 'react';
import { Marker, Circle } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { setCurrentLocation } from '../../redux/routingSlice';

function MyMarker() {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const current = useSelector((state) => state.routing.current);

    useEffect(() => {
        const getCurrentPosition = () =>
            navigator.geolocation.watchPosition(
                (position) => {
                    if (position.coords.accuracy < 200) {
                        dispatch(
                            setCurrentLocation({
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                            })
                        );
                    }
                },
                (error) => {
                    alert('Error getting location');
                    console.log(error);
                }
            );
        const navigate = getCurrentPosition();

        return () => {
            navigator.geolocation.clearWatch(navigate);
        };
    }, [dispatch]);

    return (
        <>
            <Marker
                position={[current.lat, current.lng]}
                zIndexOffset={99999}
            ></Marker>
            <Circle
                center={[current.lat, current.lng]}
                radius={
                    searchParams.get('radius')
                        ? searchParams.get('radius') * 1000
                        : 2000
                }
            />
        </>
    );
}

export default MyMarker;
