import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import { useSelector } from 'react-redux';

import 'leaflet/dist/leaflet.css';

import './style.scss';

import MyMarker from '../Marker/MyMarker.component';
import MarkerCus from '../Marker/Marker.component';
import Routing from '../Routing/Routing.component';
import FocusCurrent from '../FocusCurrent/FocusCurrent.component';

function Map() {
    const p = useSelector((state) => state.routing.fixedLocation);
    const showRouting = useSelector((state) => state.routing.showRouting);

    return (
        <>
            <MapContainer
                center={[p.lat, p.lng]}
                zoom={13}
                className="relative h-full w-full"
                zoomControl={false}
                inertia={true}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MyMarker />
                {!showRouting && <MarkerCus />}
                <FocusCurrent />
                <Routing />
                <ZoomControl position="bottomright" />
            </MapContainer>
        </>
    );
}

export default Map;
