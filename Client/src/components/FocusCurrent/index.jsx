import { useMap } from 'react-leaflet';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import { AimOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { setFirstLocation } from '../../redux/routingSlice';

function FocusCurrent() {
    const [isLoading, setIsLoading] = useState(false);
    const map = useMap();
    const dispatch = useDispatch();
    const p = useSelector((state) => state.routing.fixedLocation);

    const handleClick = async () => {
        setIsLoading(true);
        dispatch(setFirstLocation());
    };

    useEffect(() => {
        if (p.lat !== 0) {
            map.flyTo([p.lat, p.lng], 13);
            setIsLoading(false);
        }
    }, [p, map]);
    return (
        <div className="absolute bottom-[92px] right-[10px] z-[999]">
            <Button
                className="bg-white"
                size="middle"
                onClick={() => handleClick()}
                icon={<AimOutlined />}
                loading={isLoading}
            />
        </div>
    );
}

export default FocusCurrent;
