import { Form, InputNumber, Button, Tooltip, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MdOutlineHdrAuto } from 'react-icons/md';

import MiniMap from '@components/Map/MiniMap';
import { useMapEvent } from 'react-leaflet';

function InputLocation({ label, onFill }) {
    const [hadSetLocation, setHadSetLocation] = useState(false);
    const currentLocation = useSelector((state) => state.routing.current);
    const [coordinates, setCoordinates] = useState();
    const [open, setOpen] = useState(false);

    const onOk = () => {
        setHadSetLocation(true);
        onFill(coordinates);
        setOpen(false);
    };
    const onCancel = () => {
        setOpen(false);
        setHadSetLocation(false);
    };

    const handleClick = () => {
        setOpen(true);
    };

    useEffect(() => {
        setCoordinates(currentLocation);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            {label && (
                <label htmlFor="lat" className="mb-[8px] block">
                    {label}
                </label>
            )}
            <div className="flex flex-wrap gap-2">
                <Form.Item
                    name={['location', 'lat']}
                    id="lat"
                    className="m-0 flex-1"
                    rules={
                        !hadSetLocation && [
                            {
                                required: true,
                                message: 'Vui lòng không bỏ trống'
                            }
                        ]
                    }
                    style={{
                        marginBottom: '10px'
                    }}
                >
                    <InputNumber
                        className="w-full"
                        disabled={hadSetLocation}
                        controls={false}
                    />
                </Form.Item>
                <Form.Item
                    className="flex-1"
                    name={['location', 'lng']}
                    id="lng"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng không bỏ trống'
                        }
                    ]}
                    style={{
                        marginBottom: '10px'
                    }}
                >
                    <InputNumber
                        className="w-full"
                        disabled={hadSetLocation}
                        controls={false}
                    />
                </Form.Item>
                <Tooltip title="Toạ độ hiện tại">
                    <Button
                        className={
                            hadSetLocation
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-300 text-gray-800'
                        }
                        htmlType="button"
                        onClick={handleClick}
                        icon={<MdOutlineHdrAuto />}
                    />
                </Tooltip>
            </div>
            <ModalCus
                coordinates={coordinates}
                open={open}
                onOk={onOk}
                setCoordinates={setCoordinates}
                onCancel={onCancel}
            />
        </>
    );
}

const ModalCus = ({ open, onOk, coordinates, onCancel, setCoordinates }) => {
    return (
        <Modal
            title="Modal"
            open={open}
            onOk={() => onOk()}
            onCancel={onCancel}
            okText="Xác nhận"
            cancelText="Huỷ"
            okButtonProps={{
                className: 'bg-blue-500'
            }}
        >
            <MapGetLoc
                coordinates={coordinates}
                setCoordinates={setCoordinates}
            />
        </Modal>
    );
};

const MapGetLoc = ({ coordinates, setCoordinates }) => {
    return (
        <div className="mr-5 h-80 w-full">
            <MiniMap coordinates={coordinates}>
                <ChooseCoordinates setCoordinates={setCoordinates} />
            </MiniMap>
        </div>
    );
};

const ChooseCoordinates = ({ setCoordinates }) => {
    useMapEvent('click', (e) => {
        setCoordinates(e.latlng);
    });

    return null;
};

export default InputLocation;
