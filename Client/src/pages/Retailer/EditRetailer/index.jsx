import { Form, Input, Button, Col, Row, Layout } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { handleFetch } from '@utils/expression';
import { registerRetailerApi } from '@api/retailerApi';
import { InputLocation, InputImage, InputAddress } from '@components/Input';
import EditorFormat from '@components/EditorFormat/EditorFormat';

// const FormatForm = (values, images, isRegisterRetailer) => {
//     const formData = new FormData();
//     if (isRegisterRetailer) {
//         formData.append('mode', values.mode);
//     }
//     formData.append('name', values.name);
//     formData.append('description', values.description);
//     formData.append('type', values.type);
//     formData.append('location', JSON.stringify(values.location));
//     for (let i = 0; i < images.length; i++) {
//         formData.append('images', images[i]);
//     }
//     formData.append('address', JSON.stringify(values.address));
//     return formData;
// };

function EditRetailer() {
    const [newImages, setNewImages] = useState([]);
    const [deleteImages, setDeleteImages] = useState([]);
    const retailerData = useSelector((state) => state.retailer.data);

    const [form] = Form.useForm();

    const dispatch = useDispatch();

    const onFill = (p) => {
        form.setFieldsValue({
            location: {
                lat: p.lat,
                lng: p.lng
            }
        });
    };

    const onFinish = (values) => {
        const data = handleFetch(() =>
            registerRetailerApi({
                ...values,
                id: retailerData._id,
                newImages: newImages,
                deleteImages: deleteImages
            })
        );
        if (data) alert('Đăng ký cửa hàng thành công');
    };

    useEffect(() => {
        if (Object.keys(retailerData) === 0) return;
        const { name, phone, description, location } = retailerData;
        form.setFieldsValue({
            name: name,
            phone: phone,
            description: description,
            location: {
                lat: location?.loc?.coordinates[1],
                lng: location?.loc?.coordinates[0]
            },
            address: {
                province: location?.address?.province,
                district: location?.address?.district,
                ward: location?.address?.ward,
                more: location?.address?.more
            }
        });
    }, [retailerData, form]);

    return (
        <Layout className="md:px-4 md:py-2">
            <Layout.Header className="flex items-center justify-center bg-white">
                <h1 className="text-xl font-bold">
                    Chỉ sửa thông tin cửa hàng
                </h1>
            </Layout.Header>
            <Layout.Content className="mt-10">
                <Form variant="filled" form={form} onFinish={onFinish}>
                    <Row gutter={{ md: 20 }} justify="center">
                        <Col
                            md={10}
                            span={20}
                            className="rounded-md p-2 md:bg-white"
                        >
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name">Tên cửa hàng</label>
                                <Form.Item
                                    name="name"
                                    id="name"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng nhập tên cửa hàng'
                                        }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="phone">Số điện thoại</label>
                                <Form.Item
                                    name="phone"
                                    id="phone"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng nhập số điện thoại cửa hàng'
                                        }
                                    ]}
                                >
                                    <Input type="number" />
                                </Form.Item>
                            </div>
                            <div className="create-store flex flex-col gap-2">
                                <InputLocation onFill={onFill} label="Toạ độ" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="description">Mô tả</label>
                                <Form.Item
                                    name="description"
                                    id="description"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập mô tả'
                                        }
                                    ]}
                                >
                                    <EditorFormat />
                                </Form.Item>
                            </div>
                            <div className="flex flex-col gap-2">
                                <InputAddress form={form} />
                            </div>
                        </Col>
                        <Col md={8} span={20}>
                            <div className="flex flex-col gap-2 rounded-md md:bg-white md:p-2">
                                <label htmlFor="image">Hình ảnh</label>
                                <InputImage
                                    setDeleteImages={setDeleteImages}
                                    setNewImages={setNewImages}
                                    images={retailerData.images}
                                />
                                <Form.Item className="!mb-0 flex justify-center">
                                    <Button
                                        type="primary"
                                        className="bg-blue-500 hover:bg-blue-600"
                                        htmlType="submit"
                                    >
                                        Cập nhật
                                    </Button>
                                </Form.Item>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Layout.Content>
        </Layout>
    );
}

export default EditRetailer;
