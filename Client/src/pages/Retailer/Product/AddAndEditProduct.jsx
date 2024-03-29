import { Layout, Button, Form, Input, InputNumber, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import InputImage from '../../../components/Input/InputImage/InputImage.component';
import EditorFormat from '../../../components/EditorFormat/EditorFormat';
import ButtonBack from '../../../components/ActionsButton/ButtonBack.component';

import { typeStatus } from '../../../utils/typeConstraint';
import {
    createProductApi,
    updateProductByIdApi,
    getProductByIdApi
} from '../../../api/productApi';

import { handleFetch } from '../../../utils/expression';

const formatForm = (values, images = [], deleteImages = []) => {
    const formData = new FormData();
    for (let key in values) {
        formData.append(key, values[key]);
    }
    if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }
    }
    if (deleteImages.length > 0) {
        for (let i = 0; i < deleteImages.length; i++) {
            formData.append('deleteImages', deleteImages[i]);
        }
    }
    return formData;
};

function AddAndEditProduct() {
    const { idProduct } = useParams();
    const isAddMode = !idProduct;
    const [newImages, setNewImages] = useState([]);
    const [deleteImages, setDeleteImages] = useState([]);
    const [isChange, setIsChange] = useState(false);
    const [initialValues, setInitialValues] = useState({
        name: '',
        price: 0,
        discount: 0,
        type: 1,
        description: '',
        images: []
    });
    const [form] = Form.useForm();
    const retailer = useSelector((state) => state.retailer.data);

    const AddProduct = async (values) => {
        const formData = formatForm(values, newImages, deleteImages);
        await handleFetch(() => createProductApi(formData));
    };

    const EditProduct = async (values) => {
        const formData = formatForm(values, newImages, deleteImages);
        await handleFetch(() => updateProductByIdApi(idProduct, formData));
    };

    const onFinish = async (values) => {
        if (isAddMode) {
            AddProduct(values);
        } else {
            EditProduct(values);
        }
    };

    useEffect(() => {
        if (!isAddMode) {
            getProductByIdApi(idProduct).then((res) => {
                setInitialValues(res.data);
                form.setFieldsValue(res.data);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className="px-8 py-4">
            <Layout.Header className="mb-2 flex items-center justify-between bg-transparent">
                <ButtonBack />
                <h3 className="text-xl font-semibold">
                    {isAddMode ? 'Thêm sản phẩm' : 'Chỉnh sửa sản phẩm'}
                </h3>
            </Layout.Header>

            <Form
                form={form}
                variant="filled"
                onFinish={onFinish}
                initialValues={initialValues}
                onFieldsChange={() => setIsChange(true)}
                scrollToFirstError
            >
                <div className="grid gap-6 md:grid-flow-row md:grid-cols-3">
                    <section className="rounded-md bg-white md:col-span-2">
                        <div className="flex flex-col gap-4 p-4">
                            <h3 className="text-lg font-semibold">
                                Thông tin sản phẩm
                            </h3>
                            <div className="flex flex-col">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="name">Tên sản phẩm</label>
                                    <Form.Item
                                        name="name"
                                        id="name"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Vui lòng nhập tên sản phẩm'
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="price">Giá</label>
                                    <Form.Item name="price" id="price">
                                        <InputNumber
                                            className="w-full"
                                            min={0}
                                            formatter={(value) =>
                                                `${value}`.replace(
                                                    /\B(?=(\d{3})+(?!\d))/g,
                                                    ','
                                                )
                                            }
                                        />
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
                                {!isAddMode && retailer.mode === 'normal' && (
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="status">
                                            Trạng thái
                                        </label>
                                        <Form.Item id="status" name="status">
                                            <Select>
                                                {typeStatus.map((status) => (
                                                    <Select.Option
                                                        key={status.value}
                                                        value={status.value}
                                                    >
                                                        {status.label}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </div>
                                )}

                                <div className="flex flex-col gap-2">
                                    <span>Mô tả</span>
                                    <Form.Item name="description">
                                        <EditorFormat />
                                    </Form.Item>
                                </div>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="bg-blue-500 md:hidden"
                                    disabled={
                                        !isAddMode && !isChange ? true : false
                                    }
                                >
                                    {isAddMode
                                        ? 'Thêm sản phẩm'
                                        : 'Lưu thay đổi'}
                                </Button>
                            </div>
                        </div>
                    </section>
                    <section className="-order-1 rounded-md md:order-1 md:col-span-1">
                        <div className="flex flex-col justify-between gap-4 bg-white p-4 ">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">
                                    Hình ảnh sản phẩm
                                </h3>

                                <div className="flex flex-col gap-2">
                                    <InputImage
                                        setNewImages={setNewImages}
                                        setDeleteImages={setDeleteImages}
                                        images={initialValues.images}
                                    />
                                </div>
                            </div>

                            <Button
                                type="primary"
                                htmlType="submit"
                                className="hidden bg-blue-500 md:block"
                                disabled={
                                    !isAddMode && !isChange ? true : false
                                }
                            >
                                {isAddMode ? 'Thêm sản phẩm' : 'Lưu thay đổi'}
                            </Button>
                        </div>
                    </section>
                </div>
            </Form>
        </section>
    );
}

export default AddAndEditProduct;
