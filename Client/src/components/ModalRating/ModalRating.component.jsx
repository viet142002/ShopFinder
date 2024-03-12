import { Button, Modal, Avatar, Form, Input, Rate } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setNewRate, updateRate } from '../../redux/ratingSlice';
import { addRateApi, updateRateApi } from '../../api/RateApi';

import UploadImage from '../UploadImage/UploadImage.component';

const formatForm = (values) => {
    const { rate, comment, images, to, toType, deleteImages } = values;
    const formData = new FormData();

    formData.append('rate', rate);
    formData.append('comment', comment);
    formData.append('to', to);
    formData.append('toType', toType);
    images.forEach((image) => {
        if (image.originFileObj) formData.append('images', image.originFileObj);
    });
    formData.append('deleteImages', JSON.stringify(deleteImages));
    return formData;
};

function ModalRating() {
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const info = useSelector((state) => state.routing.info);
    const { data: user } = useSelector((state) => state.user);
    const { showModal } = useSelector((state) => state.rating);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [fileList, setFileList] = useState([]);

    const handleOk = () => {
        setConfirmLoading(true);
        form.validateFields()
            .then(async (values) => {
                let deleteImages = [];
                if (showModal.rate) {
                    // get images  from rate.images not in fileList
                    deleteImages = showModal.rate.images
                        .filter(
                            (image) =>
                                !fileList.find((file) => file._id === image._id)
                        )
                        .map((image) => image._id);
                }
                const formData = formatForm({
                    ...values,
                    images: fileList,
                    to: info._id,
                    toType: info.informationType,
                    deleteImages: deleteImages
                });

                if (showModal.rate) {
                    updateRateApi({
                        id: showModal.rate._id,
                        values: formData
                    }).then((data) => {
                        console.log(data.rateUpdate);
                        dispatch(
                            updateRate({ ...data.rateUpdate, from: user })
                        );
                    });
                } else {
                    addRateApi(formData).then((data) => {
                        dispatch(
                            setNewRate({
                                ...data.newRate,
                                from: {
                                    _id: user._id,
                                    firstname: user.firstname,
                                    lastname: user.lastname
                                }
                            })
                        );
                    });
                }
                form.resetFields();
                setFileList([]);
                setConfirmLoading(false);
                dispatch({
                    type: 'rating/setShowModal',
                    payload: { isShow: false, rate: null }
                });
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
        dispatch({
            type: 'rating/setShowModal',
            payload: { isShow: false, rate: null }
        });
    };

    useEffect(() => {
        if (showModal.rate && showModal.isShow) {
            form.setFieldsValue({
                rate: showModal.rate.rate,
                comment: showModal.rate.comment
            });
            setFileList(
                showModal.rate.images.map((item) => ({
                    _id: item._id,
                    uid: item._id,
                    name: item.name,
                    status: 'done',
                    thumbUrl: `${import.meta.env.VITE_APP_API_URL}${item.path}`
                }))
            );
        }
    }, [showModal, form]);

    return (
        <>
            <Modal
                title={info.name}
                centered
                open={showModal.isShow}
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
