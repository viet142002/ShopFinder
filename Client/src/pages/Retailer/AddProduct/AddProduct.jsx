import { Layout, Button, Form, Input, InputNumber, Select } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import InputImage from '../../../components/InputImage/InputImage.component';
import EditorFormat from '../../../components/EditorFormat/EditorFormat';

function AddProduct() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [images, setImages] = useState([]);

    const onFinish = (values) => {
        alert(JSON.stringify(values, null, 2));
        console.log(values);
    };

    return (
        <section className="px-8 py-4">
            <Layout.Header className="bg-transparent flex justify-between items-center mb-2">
                <Button onClick={() => navigate(-1)}>Quay lại</Button>
                <h3 className="text-xl font-semibold">Thêm sản phẩm</h3>
            </Layout.Header>

            <Form
                form={form}
                variant="filled"
                onFinish={onFinish}
                initialValues={{ status: '1', type: '1' }}
                scrollToFirstError
            >
                <div className="grid grid-flow-row grid-cols-3 gap-6">
                    <section className="bg-white col-span-2 rounded-md">
                        <div className="flex flex-col p-4 gap-4">
                            <h3 className="text-lg font-semibold">
                                Thông tin sản phẩm
                            </h3>
                            <div className="flex flex-col">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="name">Tên sản phẩm</label>
                                    <Form.Item name="name" id="name">
                                        <Input />
                                    </Form.Item>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="price">Giá</label>
                                    <Form.Item name="price" id="price">
                                        <InputNumber className="w-full" />
                                    </Form.Item>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="discount">
                                        Giảm giá (%)
                                    </label>
                                    <Form.Item id="discount" name="discount">
                                        <InputNumber
                                            className="w-full"
                                            min={0}
                                            max={100}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="status">Trạng thái</label>
                                    <Form.Item id="status" name="status">
                                        <Select>
                                            <Select.Option value="1">
                                                Còn hàng
                                            </Select.Option>
                                            <Select.Option value="2">
                                                Hết hàng
                                            </Select.Option>
                                        </Select>
                                    </Form.Item>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="type">Loại sản phẩm</label>
                                    <Form.Item id="type" name="type">
                                        <Select>
                                            <Select.Option value="1">
                                                Loại 1
                                            </Select.Option>
                                            <Select.Option value="2">
                                                Loại 2
                                            </Select.Option>
                                        </Select>
                                    </Form.Item>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span>Mô tả</span>
                                    <Form.Item name="description">
                                        <EditorFormat />
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="col-span-1 rounded-md">
                        <div className="flex flex-col gap-4 p-4 justify-between bg-white ">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">
                                    Hình ảnh sản phẩm
                                </h3>

                                <div className="flex flex-col gap-2">
                                    <InputImage
                                        name="image"
                                        images={images}
                                        setImages={setImages}
                                    />
                                </div>
                            </div>

                            <Button
                                type="primary"
                                htmlType="submit"
                                // disabled={isSubmitting}
                                className="bg-blue-500"
                            >
                                submit
                            </Button>
                        </div>
                    </section>
                </div>
            </Form>
        </section>
    );
}

export default AddProduct;
