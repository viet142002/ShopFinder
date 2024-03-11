// TODO: Create modal rating

import { Button, Modal, Avatar, Form, Input, Rate } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { addRateApi } from '../../../../api/RateApi';

import UploadImage from '../../../UploadImage/UploadImage.component';

const formatForm = (values) => {
    console.log(values);
    const { rate, comment, images, to, toType } = values;
    const formData = new FormData();

    formData.append('rate', rate);
    formData.append('comment', comment);
    formData.append('to', to);
    formData.append('toType', toType);
    images.forEach((image) => {
        console.log(image.originFileObj);
        formData.append('images', image.originFileObj);
    });
    return formData;
};

function ModalRating({ setRates }) {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const info = useSelector((state) => state.routing.info);
    const { data: user, isAuth } = useSelector((state) => state.user);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [fileList, setFileList] = useState([]);

    const handleOk = () => {
        setConfirmLoading(true);
        form.validateFields()
            .then(async (values) => {
                const formData = formatForm({
                    ...values,
                    images: fileList,
                    to: info._id,
                    toType: info.informationType
                });
                const resData = await addRateApi(formData);

                setRates((prev) => [
                    { ...resData.newRate, from: user },
                    ...prev
                ]);
                form.resetFields();
                setFileList([]);
                setConfirmLoading(false);
                setOpen(false);
            })
            .catch((info) => {
                setConfirmLoading(false);
                console.log('Validate Failed:', info);
            });
    };

    const handleCancel = () => {
        setConfirmLoading(false);
        form.resetFields();
        setFileList([]);
        setOpen(false);
    };

    const handleOpenModal = () => {
        if (!isAuth) {
            navigate('/login');
            return;
        }
        setOpen(true);
    };
    return (
        <>
            <Button onClick={() => handleOpenModal()}>Đánh giá</Button>
            <Modal
                title={info.name}
                centered
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Huỷ
                    </Button>,
                    <Button
                        className="bg-blue-500"
                        key="submit"
                        type="primary"
                        loading={confirmLoading}
                        onClick={handleOk}
                    >
                        Bình luận
                    </Button>
                ]}
            >
                <section className="my-4">
                    <div>
                        <Avatar icon={<UserOutlined />} />
                        <span className="ml-2">
                            {user.firstname} {user.lastname}
                        </span>
                    </div>
                    <Form variant="filled" form={form}>
                        <div className="flex justify-center">
                            <Form.Item
                                name="rate"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập đánh giá!'
                                    }
                                ]}
                            >
                                <Rate className="md:text-3xl text-xl" />
                            </Form.Item>
                        </div>
                        <Form.Item
                            name="comment"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập bình luận!'
                                }
                            ]}
                        >
                            <Input.TextArea
                                className="w-full h-32 p-2 mt-2 border-2 border-gray-300 rounded-md"
                                placeholder="Nhập bình luận của bạn"
                            ></Input.TextArea>
                        </Form.Item>
                        <Form.Item>
                            <UploadImage
                                fileList={fileList}
                                setFileList={setFileList}
                            />
                        </Form.Item>
                    </Form>
                </section>
            </Modal>
        </>
    );
}

export default ModalRating;
