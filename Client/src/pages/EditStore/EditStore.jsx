import { Form, Input, Button, Col, Row, Layout } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { handleFetch } from '@utils/expression';
import { updateRetailerApi, getInfoMyRetailerApi } from '@api/retailerApi';
import { updateStore, getStore } from '@api/communityApi';

import { InputLocation, InputImage, InputAddress } from '@components/Input';
import EditorFormat from '@components/EditorFormat/EditorFormat';

function EditStore() {
    const { id } = useParams();
    const { state } = useLocation();
    const [newImages, setNewImages] = useState([]);
    const [deleteImages, setDeleteImages] = useState([]);
    const [data, setData] = useState({});

    const [form] = Form.useForm();

    const onFill = (p) => {
        form.setFieldsValue({
            location: {
                lat: p.lat,
                lng: p.lng
            }
        });
    };

    const onFinish = async (values) => {
        state?.type === 'Information'
            ? await handleFetch(() =>
                  updateStore(id, {
                      ...values,
                      id: data._id,
                      images: newImages,
                      deleteImages: deleteImages
                  })
              )
            : await handleFetch(() =>
                  updateRetailerApi({
                      ...values,
                      id: data._id,
                      images: newImages,
                      deleteImages: deleteImages
                  })
              );
    };

    useEffect(() => {
        if (Object.keys(data) === 0) return;
        const { name, phone, description, location, email } = data;

        form.setFieldsValue({
            name,
            phone,
            email,
            description,
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
    }, [data, form]);

    useEffect(() => {
        // fetch data
        state?.type === 'Information'
            ? getStore(id).then((res) => {
                  setData(res.data);
              })
            : getInfoMyRetailerApi().then((res) => {
                  setData(res.data.retailer);
              });
    }, [id, state?.type]);

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
                                        state?.type !== 'Information' && {
                                            required: true,
                                            message:
                                                'Vui lòng nhập số điện thoại cửa hàng'
                                        }
                                    ]}
                                >
                                    <Input type="number" />
                                </Form.Item>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email">Email</label>
                                <Form.Item
                                    name="email"
                                    id="email"
                                    rules={[
                                        state?.type !== 'Information' && {
                                            required: true,
                                            message:
                                                'Vui lòng nhập email cửa hàng'
                                        }
                                    ]}
                                >
                                    <Input type="email" />
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
                                    images={data.images}
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

export default EditStore;
