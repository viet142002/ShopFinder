import { Marker, Popup } from "react-leaflet";
import { useDispatch } from "react-redux";

import { setDestination, setShow } from "../../redux/routingSlice";

import { positionConstraints } from "../../utils/locationConstraints";
import { iconByType } from "../../utils/icon";

function MarkerCus() {
  const dispatch = useDispatch();

  const handleOnClick = (item) => {
    dispatch(setDestination({ lat: item.lat, lng: item.long }));
    dispatch(setShow(true));
  };

  return (
    <>
      {positionConstraints.map((location, index) => {
        return (
          <Marker
            key={index}
            position={[location.lat, location.long]}
            icon={iconByType[location.info.type] || iconByType["default"]}
            anchorPoint={[32 / 2, 45]}
            zIndexOffset={1}
          >
            <Popup>
              <div>
                <h2>{location.info.name}</h2>
                <p>{location.info.address}</p>
                <p>{location.info.phone}</p>
                <p>{location.info.rate}</p>
                <button onClick={() => handleOnClick(location)}>
                  Chỉ đường
                </button>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

export default MarkerCus;
