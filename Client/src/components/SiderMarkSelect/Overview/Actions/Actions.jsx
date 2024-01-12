import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import {
    CaretUpOutlined,
    HeartOutlined,
    CloseOutlined,
    HeartFilled
} from '@ant-design/icons';
import { MdOutlineDirections } from 'react-icons/md';
import clsx from 'clsx';

import {
    unsetMarkSelect,
    setShowRouting
} from '../../../../redux/routingSlice';

function Actions() {
    const dispatch = useDispatch();
    const [favorite, setFavorite] = useState(false);
    const showRouting = useSelector((state) => state.routing.showRouting);

    const handleClose = () => {
        dispatch(unsetMarkSelect());
    };

    const handleShowRouting = () => {
        dispatch(setShowRouting(true));
    };

    const handleFavorite = () => {
        setFavorite(!favorite);
    };
    return (
        <div className="flex justify-between px-siderInfo mb-[16px]">
            <Button
                type="primary"
                className={clsx(
                    'text-white',
                    showRouting ? 'bg-red-500' : 'bg-blue-500'
                )}
                size="large"
                shape="circle"
                onClick={() => handleShowRouting()}
                icon={<MdOutlineDirections size={20} />}
            />
            <Button size="large" shape="circle" icon={<CaretUpOutlined />} />
            <Button
                size="large"
                shape="circle"
                className="text-red-500"
                icon={favorite ? <HeartFilled /> : <HeartOutlined />}
                onClick={() => handleFavorite()}
            />
            <Button
                size="large"
                shape="circle"
                icon={<CloseOutlined />}
                onClick={() => handleClose()}
            />
        </div>
    );
}

export default Actions;
