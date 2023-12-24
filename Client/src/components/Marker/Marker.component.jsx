import { Marker, Popup } from "react-leaflet";
import { useDispatch } from "react-redux";

import { setDestination, setShow } from "../../redux/routingSlice";

import { positionConstraints } from "../../utils/locationConstraints";
function MarkerCus() {
  console.log("vao");

  const dispatch = useDispatch();

  const handleOnClick = (item) => {
    dispatch(setDestination({ lat: item.lat, lng: item.long }));
    dispatch(setShow(true));
  };

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
                <button onClick={() => handleOnClick(item)}>Chỉ đường</button>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

export default MarkerCus;
