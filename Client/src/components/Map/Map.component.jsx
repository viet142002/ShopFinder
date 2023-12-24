import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useSelector, useDispatch } from "react-redux";

import "leaflet/dist/leaflet.css";
import "./style.scss";

import MyMarker from "../Marker/MyMarker.component";
import MarkerCus from "../Marker/Marker.component";
import Routing from "../Routing/Routing.component";

function Map() {
  const showRouting = useSelector((state) => state.routing.show);
  const p = useSelector((state) => state.routing.current);

  return (
    <>
      <MapContainer
        center={[p.lat, p.lng]}
        zoom={13}
        className="h-screen w-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MyMarker />
        <MarkerCus />
        {showRouting && <Routing />}
      </MapContainer>
    </>
  );
}

export default Map;
