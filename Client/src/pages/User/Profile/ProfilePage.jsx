import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Space, Button, Tooltip } from 'antd';

import { MdCameraAlt } from 'react-icons/md';

import './profileStyle.scss';

import InputAddress from '@components/Input/InputAddress/InputAddress.component';
import RenderAddress from '@components/RenderAddress';

import { handleFetch } from '@utils/expression';
import { updateUser } from '@api/userApi';

const formData = (values) => {
    const data = new FormData();
    if (values.firstname) data.append('firstname', values.firstname);
    if (values.lastname) data.append('lastname', values.lastname);
    if (values.phone) data.append('phone', values.phone);
    if (values.address) data.append('address', JSON.stringify(values.address));
    if (values.avatar) data.append('avatar', values.avatar);
    return data;
};

function ProfilePage() {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.data);
    console.log('🚀 ~ ProfilePage ~ user:', user);
    const [newAvatar, setNewAvatar] = useState(null);
    const [isChange, setIsChange] = useState({
        isChangeAddress: false,
        isChangeOther: false
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChanges = () => {
        setIsChange((prev) => ({ ...prev, isChangeOther: true }));
    };

    const onFinish = async (values) => {
        setIsLoading(true);
        delete values.email;
        const data = formData({ ...values, avatar: newAvatar });
        const resData = await handleFetch(() => updateUser(user._id, data));
        if (resData) {
            dispatch({ type: 'user/updateUser', payload: resData.updatedUser });
            setIsChange(() => ({
                isChangeAddress: false,
                isChangeOther: false
            }));
        }
        setIsLoading(false);
    };

    return (
        <>
            <div className="mt-2 flex items-center justify-center bg-transparent">
                <h1 className="text-center text-2xl font-semibold">
                    Hồ sơ cá nhân
                </h1>
            </div>
            <section className="profile mx-auto w-[90%] grid-flow-dense grid-cols-4 gap-4 md:mt-10 md:grid md:w-[80%]">
                <div className="order-1 col-span-1">
                    <div className="relative p-4 md:shadow-lg">
                        <div className="group relative mx-auto w-[60%] overflow-hidden rounded-full md:w-full">
                            <label className="cursor-pointer" htmlFor="avatar">
                                <img
                                    className="aspect-square h-full w-full rounded-full object-cover"
                                    src={
                                        newAvatar
                                            ? URL.createObjectURL(newAvatar)
                                            : user?.avatar?.path
                                              ? user.avatar.path.slice(0, 4) ===
                                                'http'
                                                  ? user.avatar.path
                                                  : `${
                                                        import.meta.env
                                                            .VITE_APP_API_URL
                                                    }/${user.avatar.path}`
                                              : import.meta.env
                                                    .VITE_APP_AVATAR_DEFAULT
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
                                            setNewAvatar(
                                                () => e.target.files[0] || null
                                            );
                                            setIsChange(() => ({
                                                isChangeOther: true
                                            }));
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
                    onValuesChange={handleChanges}
                    initialValues={{
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email,
                        phone: user.phone
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
                    <Form.Item label="Email" name="email">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="Phone" name="phone">
                        <Input value={user.phone} />
                    </Form.Item>

                    <h2 className="text-[15px]">Địa chỉ</h2>

                    {isChange.isChangeAddress ? (
                        <div className="mt-2">
                            <InputAddress hiddenLabel />
                        </div>
                    ) : user.address ? (
                        <Tooltip title="Thay đổi địa chỉ" color="blue">
                            <Button
                                htmlType="button"
                                type="text"
                                block
                                className="mb-6 mt-2 flex items-center justify-start rounded-md bg-[#0000000a] p-2 text-left"
                                onClick={() =>
                                    setIsChange((prev) => ({
                                        ...prev,
                                        isChangeAddress: true
                                    }))
                                }
                            >
                                <RenderAddress address={user?.address} />
                            </Button>
                        </Tooltip>
                    ) : (
                        <Tooltip title="Thay đổi địa chỉ" color="blue">
                            <Button
                                htmlType="button"
                                type="text"
                                loading={isLoading}
                                block
                                className="mb-6 mt-2 flex items-center rounded-md bg-[#0000000a] p-2 text-left"
                                onClick={() =>
                                    setIsChange((prev) => ({
                                        ...prev,
                                        isChangeAddress: true
                                    }))
                                }
                            >
                                Chưa có địa chỉ
                            </Button>
                        </Tooltip>
                    )}

                    {(isChange.isChangeOther || isChange.isChangeAddress) && (
                        <Form.Item className="flex justify-center">
                            <Button
                                loading={isLoading}
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
