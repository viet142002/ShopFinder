import { Button, Modal, Avatar, Form, Input, Rate } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    replyRate,
    setCloseModal,
    setNewRate,
    updateRate,
    updateReplyRate
} from '~/redux/ratingSlice';
import { addRateApi, updateRateApi } from '~/api/RateApi';
import { handleFetch, returnUrl } from '~/utils/index';

import UploadImage from '~/components/UploadImage/UploadImage.component';

const formatForm = (values) => {
    const { rate, comment, images, to, toType, deleteImages, from, fromType } =
        values;
    const formData = new FormData();
    if (rate) formData.append('rate', rate);
    formData.append('comment', comment);
    formData.append('to', to);
    formData.append('toType', toType);
    formData.append('from', from);
    formData.append('fromType', fromType);
    images.forEach((image) => {
        if (image.originFileObj) formData.append('images', image.originFileObj);
    });
    formData.append('deleteImages', JSON.stringify(deleteImages));
    return formData;
};

function ModalRating() {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const { showModal, myRate } = useSelector((state) => state.rating);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [fileList, setFileList] = useState([]);

    const handleOk = () => {
        setConfirmLoading(true);
        form.validateFields()
            .then(async (values) => {
                let deleteImages = [];

                if (showModal?.images?.length > 0) {
                    // get images  from rate.images not in fileList
                    deleteImages = myRate.images
                        .filter(
                            (image) =>
                                !fileList.find((file) => file._id === image._id)
                        )
                        .map((image) => image._id);
                }
                const form = formatForm({
                    ...values,
                    images: fileList,
                    deleteImages,
                    to: showModal.to,
                    toType: showModal.toType,
                    from: showModal.from._id,
                    fromType: showModal.fromType
                });

                if (showModal.isEdit) {
                    const data = await handleFetch(() =>
                        updateRateApi({
                            id: showModal.rateId,
                            values: form
                        })
                    );

                    if (data && data.rateUpdate.fromType === 'User') {
                        dispatch(
                            updateRate({
                                ...data.rateUpdate,
                                from: {
                                    _id: showModal?.from?._id,
                                    fullname:
                                        showModal?.from?.fullname ||
                                        showModal?.from?.name,
                                    avatar:
                                        showModal?.from?.avatar ||
                                        showModal?.from?.logo
                                }
                            })
                        );
                    }

                    if (data && data.rateUpdate.fromType === 'Retailer') {
                        dispatch(
                            updateReplyRate({
                                ...data.rateUpdate,
                                from: {
                                    _id: showModal?.from?._id,
                                    fullname:
                                        showModal?.from?.fullname ||
                                        showModal?.from?.name,
                                    avatar:
                                        showModal?.from?.avatar ||
                                        showModal?.from?.logo
                                }
                            })
                        );
                    }

                    if (data) dispatch(setCloseModal());
                } else {
                    const data = await handleFetch(() => addRateApi(form));
                    if (data && data.newRate.fromType === 'User') {
                        dispatch(
                            setNewRate({
                                ...data.newRate,
                                from: showModal?.from
                            })
                        );
                    }
                    if (data && data.newRate.fromType === 'Retailer') {
                        dispatch(
                            replyRate({
                                ...data.newRate,
                                from: showModal?.from
                            })
                        );
                    }
                    if (data) dispatch(setCloseModal());
                }
                setFileList([]);
                setConfirmLoading(false);
            })
            .catch(() => {
                setConfirmLoading(false);
            });
    };

    const handleCancel = () => {
        setConfirmLoading(false);
        form.resetFields();
        setFileList([]);
        dispatch(setCloseModal());
    };

    useEffect(() => {
        if (showModal.isShow && showModal.isEdit) {
            form.setFieldsValue({
                rate: showModal.rate,
                comment: showModal.comment
            });

            setFileList(
                showModal?.images?.map((item) => ({
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
                title={showModal.title || 'Bình luận'}
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
                        <Avatar
                            src={returnUrl(
                                showModal?.from?.avatar?.path ||
                                    showModal?.from?.logo?.path
                            )}
                        />
                        <span className="ml-2">
                            {showModal?.from?.fullname || showModal?.from?.name}
                        </span>
                    </div>

                    <Form variant="filled" form={form}>
                        {showModal?.fromType === 'User' && (
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
                        )}
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
