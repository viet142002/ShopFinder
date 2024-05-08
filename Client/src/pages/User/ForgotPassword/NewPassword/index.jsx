import { Button, Form, Input, message } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { resetPassword } from '@api/userApi';

function NewPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const email = searchParams.get('email');

    const onSubmit = (values) => {
        resetPassword({ data: values, token: searchParams.get('token') })
            .then(() => {
                message.success('Đổi mật khẩu thành công!');
                if (searchParams.get('typeAccount') === 'user') {
                    navigate('/login');
                }
                if (searchParams.get('typeAccount') === 'retailer') {
                    navigate('/login-retailer');
                }
            })
            .catch((err) => {
                switch (err.response?.data?.message) {
                    case 'Password not match':
                        message.error('Mật khẩu không khớp!');
                        break;
                    case 'Password must contain at least 8 characters, including uppercase, lowercase and number':
                        message.error(
                            'Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số!'
                        );
                        break;
                    case 'User not found':
                        message.error('Người dùng không tồn tại!');
                        break;
                    case 'Invalid email':
                        message.error('Email không hợp lệ!');
                        break;
                    case 'User is blocked':
                        message.error('Bạn đã bị chặn!');
                        break;
                    default:
                        message.error('Đường dẫn đã hết hạng!');
                        break;
                }
            });
    };

    useEffect(() => {
        form.setFieldsValue({
            email
        });
    }, [email, form]);

    return (
        <section>
            <div>
                <div className="mt-2 flex justify-center">
                    <img src="/logo.png" alt="" className="w-40 rounded-full" />
                </div>
            </div>
            <div className="mx-auto w-[80%] md:w-[50%]">
                <div className="my-8">
                    <h1 className="text-center text-lg font-bold">
                        Mật khẩu mới
                    </h1>
                </div>
                <Form
                    form={form}
                    onFinish={onSubmit}
                    name="dependencies"
                    variant="filled"
                    layout="vertical"
                    requiredMark={false}
                >
                    <Form.Item name="email" label="Địa chỉ email">
                        <Input
                            placeholder="Mật khẩu mới"
                            size="large"
                            disabled
                        />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập lại mật khẩu!'
                            },
                            () => ({
                                validator(_, value) {
                                    const regex =
                                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
                                    if (regex.test(value)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            'Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số!'
                                        )
                                    );
                                }
                            })
                        ]}
                    >
                        <Input.Password
                            placeholder="Mật khẩu mới"
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Nhập lại mật khẩu"
                        name="rePassword"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập lại mật khẩu!'
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue('password') === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            'Mật khẩu không khớp! Vui lòng nhập lại!'
                                        )
                                    );
                                }
                            })
                        ]}
                    >
                        <Input.Password
                            placeholder="Nhập lại Mật khẩu"
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full bg-blue-500"
                        >
                            Đổi mật khẩu
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </section>
    );
}

export default NewPassword;
