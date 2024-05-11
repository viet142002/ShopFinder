import { Form, Input, Select, Space } from 'antd';

import { getProvinces, getDistricts, getWards } from '../../../api/addressApi';
import { useEffect, useState } from 'react';

import './inputAddressStyle.scss';

function InputAddress({ hiddenLabel = false, address = {} }) {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const handleChange = (values, field = '') => {
        if (field === 'province') {
            getDistricts(values.key).then((data) => {
                setDistricts(data);
            });
        } else {
            getWards(values.key).then((data) => {
                setWards(data);
            });
        }
    };

    useEffect(() => {
        getProvinces().then((data) => {
            setProvinces(data);
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
                            showSearch
                            placeholder={
                                address.province
                                    ? address.province
                                    : 'Tỉnh / Thành'
                            }
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.value ?? '')
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                            filterSort={(optionA, optionB) =>
                                (optionA?.value ?? '')
                                    .toLowerCase()
                                    .localeCompare(
                                        (optionB?.value ?? '').toLowerCase()
                                    )
                            }
                            onChange={(_, values) =>
                                handleChange(values, 'province')
                            }
                        >
                            {provinces.map((province) => (
                                <Select.Option
                                    key={province.idProvince}
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
                            showSearch
                            placeholder={
                                address.district
                                    ? address.district
                                    : 'Quận / Huyện'
                            }
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.value ?? '').includes(input)
                            }
                            filterSort={(optionA, optionB) =>
                                (optionA?.value ?? '')
                                    .toLowerCase()
                                    .localeCompare(
                                        (optionB?.value ?? '').toLowerCase()
                                    )
                            }
                            onChange={(_, values) => handleChange(values)}
                        >
                            {districts.map((district) => (
                                <Select.Option
                                    key={district.idDistrict}
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
                            showSearch
                            placeholder={
                                address.ward ? address.ward : 'Xã / Phường'
                            }
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.value ?? '').includes(input)
                            }
                            filterSort={(optionA, optionB) =>
                                (optionA?.value ?? '')
                                    .toLowerCase()
                                    .localeCompare(
                                        (optionB?.value ?? '').toLowerCase()
                                    )
                            }
                        >
                            {wards.map((ward) => (
                                <Select.Option
                                    key={ward.idCommune}
                                    value={ward.name}
                                >
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
