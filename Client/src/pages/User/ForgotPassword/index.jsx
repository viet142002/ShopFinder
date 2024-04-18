import { Button, Form, Input, Space } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { forgotPassword } from '@api/userApi';

function ForgotPassword() {
    const navigate = useNavigate();
    const [status, setStatus] = useState();

    const handleReturn = () => {
        navigate('/login');
        return;
    };

    const sendMail = (values) => {
        setStatus('loading');
        forgotPassword({ email: values.email })
            .then(() => {
                setStatus('success');
            })
            .catch(() => {
                setStatus('error');
            });
    };

    return (
        <section className="flex-col justify-center md:flex md:h-svh">
            <div className="mb-10 flex justify-center">
                <img
                    src="/public/logo.png"
                    alt=""
                    className="w-32 rounded-full"
                />
            </div>
            <div className="mx-auto w-[90%] md:w-[30%] ">
                {status === 'success' && (
                    <div className="mb-4 text-center text-green-500">
                        Vui lòng kiểm tra email của bạn!
                    </div>
                )}
                {status === 'error' && (
                    <div className="mb-4 text-center text-red-500">
                        Địa chỉ email không tồn tại!
                    </div>
                )}
                <Form
                    onFinish={sendMail}
                    layout="vertical"
                    requiredMark={false}
                    variant="filled"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập email!'
                            },
                            {
                                type: 'email',
                                message: 'Email không hợp lệ!'
                            }
                        ]}
                        label="Email"
                    >
                        <Input type="email" placeholder="abc@gmail.com" />
                    </Form.Item>
                    <Form.Item>
                        <Space className="w-full justify-center">
                            <Button onClick={handleReturn}>Quay lại</Button>
                            <Button
                                htmlType="submit"
                                type="primary"
                                className="flex items-center bg-blue-500"
                                loading={status === 'loading'}
                            >
                                Gửi
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </section>
    );
}

export default ForgotPassword;
