import { Marker } from "react-leaflet";
import { useSelector } from "react-redux";

function MyMarker() {
  const p = useSelector((state) => state.routing.current);

  return <Marker position={[p.lat, p.lng]}></Marker>;
}

export default MyMarker;
