import { Marker, Tooltip } from 'react-leaflet';
import { useDispatch } from 'react-redux';

import { setMarkSelect } from '../../redux/routingSlice';

import { positionConstraints } from '../../utils/locationConstraints';
import { iconByType } from '../../utils/icon';

function MarkerCus() {
    const dispatch = useDispatch();

    const handleOnClick = (item) => {
        dispatch(
            setMarkSelect({
                markSelected: { lat: item.lat, lng: item.long },
                info: item.info
            })
        );
    };

    return (
        <>
            {positionConstraints.map((location, index) => {
                return (
                    <Marker
                        key={index}
                        position={[location.lat, location.long]}
                        icon={
                            iconByType[location.info.type] ||
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
                                <h2>{location.info.name}</h2>
                                <p>{location.info.address}</p>
                                <p>{location.info.phone}</p>
                                <p>{location.info.rate}</p>
                            </div>
                        </Tooltip>
                    </Marker>
                );
            })}
        </>
    );
}

export default MarkerCus;
