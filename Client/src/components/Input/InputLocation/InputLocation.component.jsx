import { Form, Input, InputNumber, Button, Tooltip } from 'antd';
import { useState } from 'react';

import { useSelector } from 'react-redux';

import { MdOutlineHdrAuto } from 'react-icons/md';

function InputLocation({ label, onFill }) {
    const [isCurrentLocation, setIsCurrentLocation] = useState(false);
    const currentLocation = useSelector((state) => state.routing.current);
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
                        !isCurrentLocation && [
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
                        disabled={isCurrentLocation}
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
                        disabled={isCurrentLocation}
                        controls={false}
                    />
                </Form.Item>
                <Tooltip title="Toạ độ hiện tại">
                    <Button
                        className={
                            isCurrentLocation
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-300 text-gray-800'
                        }
                        htmlType="button"
                        onClick={() => {
                            setIsCurrentLocation(!isCurrentLocation);
                            onFill(currentLocation);
                        }}
                        icon={<MdOutlineHdrAuto />}
                    />
                </Tooltip>
            </div>
        </>
    );
}

export default InputLocation;
