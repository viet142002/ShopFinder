import { Input, Space, Form, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setValues } from '../../redux/searchSlice.js';

import { typeLocations } from '../../utils/typeConstraint.js';

function SearchLocation() {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (search === '') {
            return;
        }
        const fetchData = setTimeout(async () => {
            try {
                console.log('fetch data');
            } catch (err) {
                console.log(err);
            }
        }, 1000);

        return () => {
            clearTimeout(fetchData);
        };
    }, [search]);

    return (
        <Form size="large" initialValues={{ type: 'all', radius: 5 }}>
            <Space>
                <Form.Item name="search">
                    <Input
                        type="text"
                        className="border-none bg-white min-w-32"
                        placeholder="Tên cửa hàng"
                        onChange={(e) => {
                            setSearch(e.target.value);
                            dispatch(setValues({ search: e.target.value }));
                        }}
                    />
                </Form.Item>
                <Form.Item name="radius">
                    <Input
                        type="number"
                        placeholder="Bán kính"
                        className="w-20"
                        suffix="km"
                        onChange={(e) => {
                            dispatch(setValues({ radius: e.target.value }));
                        }}
                    />
                </Form.Item>
                <Form.Item name="type">
                    <Select
                        style={{ width: 150 }}
                        onChange={(value) =>
                            dispatch(setValues({ type: value }))
                        }
                    >
                        <Select.Option value="all">Tất cả</Select.Option>
                        {typeLocations.map((item, index) => {
                            return (
                                <Select.Option value={item.value} key={index}>
                                    {item.label}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Form.Item>
                {/* <Form.Item>
                        <Button
                            className="bg-blue-500"
                            type="primary"
                            htmlType="submit"
                            icon={<SearchOutlined />}
                        />
                    </Form.Item> */}
            </Space>
        </Form>
    );
}

export default SearchLocation;
