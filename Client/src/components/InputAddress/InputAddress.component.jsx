import { Form, Input, Select, Space } from 'antd';

import { getProvinces, getDistricts, getWards } from '../../api/addressApi';
import { useEffect, useState } from 'react';

import './inputAddressStyle.scss';

function InputAddress({ hiddenLabel = false, address = {} }) {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const handleChange = (values, field = '') => {
        if (field === 'province') {
            getDistricts(values.key).then((data) => {
                setDistricts(data.districts);
            });
        } else {
            getWards(values.key).then((data) => {
                setWards(data.wards);
            });
        }
    };

    useEffect(() => {
        getProvinces().then((data) => {
            setProvinces(data.results);
        });
    }, []);

    return (
        <>
            <div className="input-address">
                {!hiddenLabel && <label htmlFor="address">Địa chỉ</label>}
                <Space wrap className="w-full">
                    <Form.Item
                        name={['address', 'province']}
                        rules={[
                            { required: true, message: 'Vui lòng chọn Tỉnh' }
                        ]}
                        style={{
                            marginBottom: '10px'
                        }}
                    >
                        <Select
                            placeholder={
                                address.province
                                    ? address.province
                                    : 'Tỉnh / Thành'
                            }
                            onChange={(_, values) =>
                                handleChange(values, 'province')
                            }
                        >
                            {provinces.map((province) => (
                                <Select.Option
                                    key={province.id}
                                    value={province.name}
                                >
                                    {province.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name={['address', 'district']}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn quận/huyện'
                            }
                        ]}
                        style={{
                            marginBottom: '10px'
                        }}
                    >
                        <Select
                            placeholder={
                                address.district
                                    ? address.district
                                    : 'Quận / Huyện'
                            }
                            onChange={(_, values) => handleChange(values)}
                        >
                            {districts.map((district) => (
                                <Select.Option
                                    key={district.id}
                                    value={district.name}
                                >
                                    {district.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name={['address', 'ward']}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn xã / phường'
                            }
                        ]}
                        style={{
                            marginBottom: '10px'
                        }}
                    >
                        <Select
                            placeholder={
                                address.ward ? address.ward : 'Xã / Phường'
                            }
                        >
                            {wards.map((ward) => (
                                <Select.Option key={ward.id} value={ward.name}>
                                    {ward.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Space>
                <Form.Item name={['address', 'more']}>
                    <Input
                        placeholder={
                            address.more ? address.more : 'Số nhà, tên đường'
                        }
                    />
                </Form.Item>
            </div>
        </>
    );
}

export default InputAddress;
