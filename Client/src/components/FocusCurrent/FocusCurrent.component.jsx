import { useMap } from 'react-leaflet';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import { AimOutlined } from '@ant-design/icons';

import { useDispatch } from 'react-redux';
import { getCurrentLocation } from '../../redux/routingSlice';
import { useEffect } from 'react';

function FocusCurrent() {
    const dispatch = useDispatch();
    const map = useMap();
    const p = useSelector((state) => state.routing.current);

    const handleClick = async () => {
        dispatch(getCurrentLocation());
    };

    useEffect(() => {
        if (p) {
            map.flyTo([p.lat, p.lng], 15);
        }
    }, [p, map]);

    return (
        <div className="absolute bottom-[92px] right-[13px] z-[99999]">
            <Button
                className="bg-white"
                size="middle"
                onClick={() => handleClick()}
                icon={<AimOutlined />}
            />
        </div>
    );
}

export default FocusCurrent;
