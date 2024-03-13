import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Input, Space, Layout, Button } from 'antd';

import { MdCameraAlt } from 'react-icons/md';

import './profileStyle.scss';

import InputAddress from '../../../components/InputAddress/InputAddress.component';

const formData = (values) => {
    const data = new FormData();
    data.append('firstname', values.firstname);
    data.append('lastname', values.lastname);
    data.append('phone', values.phone);
    data.append('address', JSON.stringify(values.address));
    data.append('avatar', values.avatar);
    return data;
};

function ProfilePage() {
    const [form] = Form.useForm();
    const user = useSelector((state) => state.user.data);
    const [newAvatar, setNewAvatar] = useState(null);
    const [isChange, setIsChange] = useState(false);

    const handleChanges = () => {
        setIsChange(true);
    };

    const onFinish = (values) => {
        delete values.email;
        const data = formData({ ...values, avatar: newAvatar });
    };

    return (
        <>
            <Layout.Header className="flex items-center justify-center bg-transparent">
                <h1 className="text-center text-2xl font-semibold">
                    Hồ sơ cá nhân
                </h1>
            </Layout.Header>
            <section className="profile mx-auto w-[80%] grid-flow-dense grid-cols-4 gap-5 md:mt-10 md:grid">
                <div className="order-1 col-span-1">
                    <div className="relative p-4 md:shadow-lg">
                        <div className="group relative mx-auto w-[60%] overflow-hidden rounded-full md:w-full">
                            <label className="cursor-pointer" htmlFor="avatar">
                                <img
                                    className="aspect-square h-full w-full rounded-full object-cover"
                                    src={
                                        newAvatar
                                            ? URL.createObjectURL(newAvatar)
                                            : import.meta.env.VITE_APP_API_URL +
                                              (user.avatar ||
                                                  '/images/avatar-default.png')
                                    }
                                    alt="avatar"
                                />
                                <div className="absolute bottom-0 flex h-[25%] w-full items-center justify-center bg-gray-400 opacity-0 group-hover:opacity-50">
                                    <input
                                        name="avatar"
                                        id="avatar"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            setNewAvatar(e.target.files[0]);
                                        }}
                                    />

                                    <MdCameraAlt size={35} />
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                <Form
                    form={form}
                    className="-order-1 col-span-3"
                    variant="filled"
                    layout="vertical"
                    disabled={false}
                    onValuesChange={handleChanges}
                    initialValues={{
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email,
                        phone: user.phone,
                        address: user.address
                    }}
                    requiredMark={false}
                    onFinish={onFinish}
                >
                    <Space className="w-full">
                        <Form.Item
                            label="Họ"
                            name="lastname"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập họ!'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Tên"
                            name="firstname"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên!'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Space>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!'
                            }
                        ]}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number!'
                            }
                        ]}
                    >
                        <Input value={user.phone} />
                    </Form.Item>

                    <h2 className="text-[15px]">Địa chỉ</h2>

                    <InputAddress hiddenLabel />

                    {isChange && (
                        <Form.Item className="flex justify-center">
                            <Button
                                htmlType="submit"
                                type="primary"
                                className="bg-blue-500"
                            >
                                Cập nhật
                            </Button>
                        </Form.Item>
                    )}
                </Form>
            </section>
        </>
    );
}

export default ProfilePage;
