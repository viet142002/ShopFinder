import { Input, Space, Form, Select, InputNumber } from 'antd';

import { typeLocations } from '../../utils/typeConstraint.js';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

function SearchLocation() {
    const [form] = Form.useForm();
    const [searchParams, setSearchParams] = useSearchParams({
        name: '',
        type: 'all',
        radius: 2
    });

    useEffect(() => {
        form.setFieldsValue({
            search: searchParams.get('name') || '',
            type: searchParams.get('type') || 'all',
            radius: searchParams.get('radius') || 2
        });
    }, [searchParams, form]);

    return (
        <Form
            form={form}
            size="large"
            initialValues={{
                search: searchParams.get('name') || '',
                type: searchParams.get('type') || 'all',
                radius: searchParams.get('radius') || 2
            }}
        >
            <Space>
                <Form.Item name="search">
                    <Input
                        type="text"
                        className="min-w-32 border-none bg-white"
                        placeholder="Tên cửa hàng"
                        value={searchParams.get('name') || ''}
                        onChange={(e) => {
                            setSearchParams(
                                (prev) => {
                                    prev.set('name', e.target.value);
                                    return prev;
                                },
                                {
                                    replace: true
                                }
                            );
                            // setSearch(e.target.value);
                        }}
                    />
                </Form.Item>
                <Form.Item name="radius">
                    <InputNumber
                        controls={false}
                        placeholder="Bán kính"
                        className="w-[80px]"
                        min={1}
                        suffix="km"
                        onChange={(value) => {
                            if (value < 1) value = 1;
                            setSearchParams(
                                (prev) => {
                                    prev.set('radius', value);
                                    return prev;
                                },
                                {
                                    replace: true
                                }
                            );
                        }}
                    />
                </Form.Item>
                <Form.Item name="type">
                    <Select
                        style={{ width: 150 }}
                        onChange={(value) => {
                            setSearchParams(
                                (prev) => {
                                    prev.set('type', value);
                                    return prev;
                                },
                                {
                                    replace: true
                                }
                            );
                            // dispatch(setValues({ type: value }));
                        }}
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
