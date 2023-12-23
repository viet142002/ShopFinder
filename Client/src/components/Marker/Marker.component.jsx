import { Marker, Popup } from "react-leaflet";

import { positionConstraints } from "../../utils/locationConstraints";
function MarkerCus() {
  return (
    <>
      {positionConstraints.map((item, index) => {
        return (
          <Marker key={index} position={[item.lat, item.long]}>
            <Popup>
              <div>
                <h2>{item.info.name}</h2>
                <p>{item.info.address}</p>
                <p>{item.info.phone}</p>
                <p>{item.info.rate}</p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

export default MarkerCus;
