import { Button, Modal, Avatar, Form, Input, Rate } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setNewRate, updateRate } from '@redux/ratingSlice';
import { addRateApi, updateRateApi } from '@api/RateApi';
import { handleFetch, returnUrl } from '@utils/index';

import UploadImage from '@components/UploadImage/UploadImage.component';
import { useAuth } from '@hooks/useAuth';

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

function ModalRating({ title, to, toType }) {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const { data: user } = useAuth();
    const { showModal, myRate } = useSelector((state) => state.rating);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [fileList, setFileList] = useState([]);

    const handleOk = () => {
        setConfirmLoading(true);
        form.validateFields()
            .then(async (values) => {
                let deleteImages = [];
                if (myRate?.images) {
                    // get images  from rate.images not in fileList
                    deleteImages = myRate.images
                        .filter(
                            (image) =>
                                !fileList.find((file) => file._id === image._id)
                        )
                        .map((image) => image._id);
                }
                const formData = formatForm({
                    ...values,
                    images: fileList,
                    to: to,
                    toType: toType,
                    deleteImages: deleteImages
                });

                if (showModal.isEdit) {
                    const data = await handleFetch(() =>
                        updateRateApi({
                            id: myRate._id,
                            values: formData
                        })
                    );

                    if (data) {
                        dispatch(
                            updateRate({
                                ...data.rateUpdate,
                                from: {
                                    _id: user._id,
                                    firstname: user.firstname,
                                    lastname: user.lastname,
                                    avatar: user.avatar
                                }
                            })
                        );
                    }
                } else {
                    const data = await handleFetch(() => addRateApi(formData));

                    if (data) {
                        dispatch(
                            setNewRate({
                                ...data.newRate,
                                from: {
                                    _id: user._id,
                                    firstname: user.firstname,
                                    lastname: user.lastname,
                                    avatar: user.avatar
                                }
                            })
                        );
                    }
                }
                form.resetFields();
                setFileList([]);
                setConfirmLoading(false);
                dispatch({
                    type: 'rating/setShowModal',
                    payload: { isShow: false, rate: null }
                });
            })
            .catch(() => {
                setConfirmLoading(false);
            });
    };

    const handleCancel = () => {
        setConfirmLoading(false);
        form.resetFields();
        setFileList([]);
        dispatch({
            type: 'rating/setShowModal',
            payload: { isShow: false, isEdit: false }
        });
    };

    useEffect(() => {
        if (myRate && showModal.isShow) {
            form.setFieldsValue({
                rate: myRate.rate,
                comment: myRate.comment
            });
            setFileList(
                myRate.images.map((item) => ({
                    _id: item._id,
                    uid: item._id,
                    name: item.name,
                    status: 'done',
                    thumbUrl: `${import.meta.env.VITE_APP_API_URL}${item.path}`
                }))
            );
        }
    }, [showModal, form, myRate]);

    return (
        <>
            <Modal
                title={title}
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
                        {showModal.isEdit ? 'Cập nhật' : 'Bình luận'}
                    </Button>
                ]}
            >
                <section className="my-4">
                    <div>
                        <Avatar src={returnUrl({ user })} />
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
                                <Rate className="text-xl md:text-3xl" />
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
                                className="mt-2 h-32 w-full rounded-md border-2 border-gray-300 p-2"
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
