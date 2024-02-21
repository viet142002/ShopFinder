import { Button, Form, Input, InputNumber, Select } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { typeLocations } from '../../utils/typeConstraint';
import { registerRetailerApi } from '../../api/retailerApi';
import { updateUser } from '../../redux/userSlice';

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 6
        }
    },
    wrapperCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 16
        }
    }
};

function RegisterRetailer() {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [isCurrentLocation, setIsCurrentLocation] = useState(false);

    const onFinish = async (values) => {
        const res = await registerRetailerApi(values);
        if (res.message === 'Signup successfully') {
            dispatch(updateUser({ status: 'pending' }));
            navigate('/');
        }
    };

    const onFill = () => {
        form.setFieldsValue({
            lat: '10.194879',
            lng: '108.194879'
        });
    };
    return (
        <div className="mt-20 ">
            <Form
                {...formItemLayout}
                form={form}
                variant="filled"
                autoComplete="off"
                onFinish={onFinish}
                style={{
                    maxWidth: 1000,
                    margin: 'auto'
                }}
            >
                <Form.Item
                    wrapperCol={{
                        offset: 6,
                        span: 16
                    }}
                >
                    <h1 className="font-bold text-2xl text-center">
                        Đăng ký bán hàng
                    </h1>
                </Form.Item>
                <Form.Item
                    label="Toạ độ"
                    tooltip="Toạ độ được ghim trên bản đồ"
                    className="mb-0"
                >
                    <div className="flex justify-between space-x-4">
                        <Form.Item
                            name="lat"
                            tooltip="This is a required field"
                            className="flex-grow"
                            rules={
                                !isCurrentLocation && [
                                    {
                                        required: true,
                                        message: 'Please input!'
                                    }
                                ]
                            }
                        >
                            <Input
                                disabled={isCurrentLocation}
                                placeholder="10.194879"
                            />
                        </Form.Item>
                        <Form.Item
                            name="lng"
                            className="flex-grow"
                            tooltip="This is a required field"
                            rules={
                                !isCurrentLocation && [
                                    {
                                        required: true,
                                        message: 'Please input!'
                                    }
                                ]
                            }
                        >
                            <Input
                                disabled={isCurrentLocation}
                                placeholder="108.194879"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                className="bg-orange-200"
                                htmlType="button"
                                onClick={() => {
                                    setIsCurrentLocation(!isCurrentLocation);
                                    onFill();
                                }}
                            >
                                {isCurrentLocation
                                    ? 'Nhập thủ công'
                                    : 'Lấy vị trí'}
                            </Button>
                        </Form.Item>
                    </div>
                </Form.Item>
                <Form.Item
                    label="Tên cửa hàng"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng điền tên cửa hàng!'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập số điện thoại!'
                        }
                    ]}
                >
                    <InputNumber
                        style={{
                            width: '100%'
                        }}
                    />
                </Form.Item>

                <Form.Item
                    label="Mô tả"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Mô tả về cửa hàng!'
                        }
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    label="Sản phẩm"
                    name="type"
                    rules={[{ required: true, message: 'Please input!' }]}
                >
                    <Select>
                        {typeLocations.map((type, index) => (
                            <Select.Option value={type.value} key={index}>
                                {type.label}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 6,
                        span: 16
                    }}
                >
                    <div className="flex justify-center space-x-4">
                        <Button
                            className="bg-red-500 text-white"
                            htmlType="button"
                            onClick={() => {
                                navigate('/');
                            }}
                        >
                            Huỷ
                        </Button>
                        <Button
                            type="primary"
                            className="bg-purple-400"
                            htmlType="submit"
                        >
                            Submit
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
}

export default RegisterRetailer;
