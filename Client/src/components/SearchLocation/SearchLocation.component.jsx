import { Input, Space, Form, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setValues } from '../../redux/searchSlice.js';

import { typeLocations } from '../../utils/typeConstraint.js';

function SearchLocation() {
    const dispatch = useDispatch();
    const dataSearch = useSelector((state) => state.search);
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (search === '') {
            // dispatch(setValues({ name: '' }));
            return;
        }
        const timeOutId = setTimeout(() => {
            dispatch(setValues({ name: search }));
        }, 500);

        return () => {
            clearTimeout(timeOutId);
        };
    }, [search, dispatch]);

    return (
        <Form
            size="large"
            initialValues={{
                search: dataSearch.name,
                type: 'all',
                radius: dataSearch.radius
            }}
        >
            <Space>
                <Form.Item name="search">
                    <Input
                        type="text"
                        className="border-none bg-white min-w-32"
                        placeholder="Tên cửa hàng"
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                    />
                </Form.Item>
                <Form.Item name="radius">
                    <Input
                        type="number"
                        placeholder="Bán kính"
                        className="w-[90px]"
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
            </Space>
        </Form>
    );
}

export default SearchLocation;
