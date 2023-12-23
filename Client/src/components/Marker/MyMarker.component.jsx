import { Marker } from "react-leaflet";

import usePosition from "../../utils/location";

function MyMarker() {
  const position = usePosition();

  return <Marker position={[position.latitude, position.longitude]}></Marker>;
}

export default MyMarker;
