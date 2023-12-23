import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./style.scss";

import MyMarker from "../Marker/MyMarker.component";
import usePosition from "../../utils/location";
import MarkerCus from "../Marker/Marker.component";

function Map() {
  const position = usePosition();
  console.log(position.latitude, position.longitude);
  return (
    <>
      <MapContainer
        center={[position.latitude, position.longitude]}
        zoom={13}
        className="h-screen w-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MyMarker />
        <MarkerCus />
      </MapContainer>
    </>
  );
}

export default Map;
