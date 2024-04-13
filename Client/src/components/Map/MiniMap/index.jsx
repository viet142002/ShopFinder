import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { memo, useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';

function MiniMap({ coordinates }) {
    const [isShow, setIsShow] = useState(false);
    useEffect(() => {
        setIsShow(true);
        return () => setIsShow(false);
    }, []);
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
                </MapContainer>
            )}
        </>
    );
}

const MemoMiniMap = memo(MiniMap);
export default MemoMiniMap;
