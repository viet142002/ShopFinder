import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { memo, useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import Routing from '@components/Routing/Routing.component';
import { useDispatch } from 'react-redux';
import { setShowRouting } from '@redux/routingSlice';

function MiniMap({ coordinates, destination, children }) {
    const dispatch = useDispatch();
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        dispatch(setShowRouting(true));
        setIsShow(true);
        return () => {
            dispatch(setShowRouting(false));
            setIsShow(false);
        };
    }, [dispatch]);
    return (
        <>
            {isShow && (
                <MapContainer
                    center={[coordinates.lat, coordinates.lng]}
                    zoom={13}
                    className="h-full w-full"
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[coordinates.lat, coordinates.lng]} />
                    {children}
                    <Routing destination={coordinates} start={destination} />
                </MapContainer>
            )}
        </>
    );
}

const MemoMiniMap = memo(MiniMap);
export default MemoMiniMap;
