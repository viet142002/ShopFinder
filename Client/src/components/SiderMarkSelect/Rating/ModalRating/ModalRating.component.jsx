// TODO: Create modal rating

import { Button, Modal, Avatar, Form, Input, Rate } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import UploadImage from '../../../UploadImage/UploadImage.component';

const formatForm = (values) => {
    const { rate, comment, images } = values;
    const formData = new FormData();
    formData.append('rate', rate);
    formData.append('comment', comment);
    images.forEach((image) => {
        formData.append('images', image.originFileObj);
    });
    return formData;
};

function ModalRating() {
    const [form] = Form.useForm();
    const info = useSelector((state) => state.routing.info);
    const user = useSelector((state) => state.user.data);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [fileList, setFileList] = useState([]);

    const handleOk = () => {
        setConfirmLoading(true);
        form.validateFields()
            .then((values) => {
                const formData = formatForm({ ...values, images: fileList });
                console.log(values);
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
    return (
        <>
            <Button onClick={() => setOpen(true)}>Đánh giá</Button>
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
                                <Rate
                                    allowHalf
                                    className="md:text-3xl text-xl"
                                />
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
                        <Form.Item name="images">
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
