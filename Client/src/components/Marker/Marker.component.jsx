import { useEffect, useState } from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';

import { setMarkSelect } from '../../redux/routingSlice';

// import { positionConstraints } from '../../utils/locationConstraints';
import { iconByType } from '../../utils/icon';

import { getLocations } from '../../api/locationApi';

function MarkerCus() {
    const [locations, setLocations] = useState([]);
    const dispatch = useDispatch();
    const current = useSelector((state) => state.routing.current);
    const { radius, type, name } = useSelector((state) => state.search);

    const handleOnClick = (item) => {
        dispatch(
            setMarkSelect({
                markSelected: {
                    lat: item.loc.coordinates[1],
                    lng: item.loc.coordinates[0]
                },
                info: {
                    ...item.information,
                    informationType: item.informationType,
                    address: item.address
                }
            })
        );
    };

    useEffect(() => {
        getLocations({
            lat: current.lat,
            lng: current.lng,
            radius: radius,
            type: type,
            name: name
        }).then((data) => {
            setLocations(data.locations);
        });
    }, [current.lat, current.lng, radius, type, name]);

    return (
        <>
            {locations.length > 0 &&
                locations.map((location, index) => {
                    return (
                        <Marker
                            key={index}
                            position={[
                                location.loc.coordinates[1],
                                location.loc.coordinates[0]
                            ]}
                            icon={
                                iconByType[location.type] ||
                                iconByType['default']
                            }
                            anchorPoint={[32 / 2, 45]}
                            zIndexOffset={1}
                            eventHandlers={{
                                click: () => {
                                    handleOnClick(location);
                                }
                            }}
                        >
                            <Tooltip direction="top" opacity={1} className="">
                                <div className="text-lg">
                                    <h2>{location.information.name}</h2>
                                    {/* <p>{location.information.address}</p>
                                <p>{location.information.phone}</p>
                                <p>{location.information.rate}</p> */}
                                </div>
                            </Tooltip>
                        </Marker>
                    );
                })}
        </>
    );
}

export default MarkerCus;
