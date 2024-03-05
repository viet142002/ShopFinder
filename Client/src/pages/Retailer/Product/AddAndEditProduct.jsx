import { Layout, Button, Form, Input, InputNumber, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import InputImage from '../../../components/InputImage/InputImage.component';
import EditorFormat from '../../../components/EditorFormat/EditorFormat';
import ButtonBack from '../../../components/ActionsButton/ButtonBack.component';

import { typeStatus } from '../../../utils/typeConstraint';
import {
    createProductApi,
    updateProductByIdApi,
    getProductByIdApi
} from '../../../api/productApi';

const formatForm = (values, images = [], deleteImage = []) => {
    const formData = new FormData();
    for (let key in values) {
        formData.append(key, values[key]);
    }
    for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
    }
    for (let i = 0; i < deleteImage.length; i++) {
        formData.append('deleteImages', deleteImage[i]);
    }
    return formData;
};

function AddAndEditProduct() {
    const { id } = useParams();
    const isAddMode = !id;
    const [newImages, setNewImages] = useState([]);
    const [deleteImages, setDeleteImages] = useState([]);
    const [isChange, setIsChange] = useState(false);
    const [initialValues, setInitialValues] = useState({
        name: '',
        price: 0,
        discount: 0,
        status: 'draft',
        type: 1,
        description: '',
        images: []
    });
    const [form] = Form.useForm();

    const AddProduct = async (values) => {
        try {
            const formData = formatForm(values, newImages);
            const data = await createProductApi(formData);
            alert(data.message);
        } catch (error) {
            alert(error.message);
        }
    };

    const EditProduct = async (values) => {
        try {
            const formData = formatForm(values, newImages, deleteImages);
            const data = await updateProductByIdApi(id, formData);
            alert(data.message);
        } catch (error) {
            alert(error.message);
        }
    };

    const getProduct = async (id) => {
        try {
            const data = await getProductByIdApi(id);
            setInitialValues(() => data);
        } catch (error) {
            alert(error.message);
        }
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
            getProduct(id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        form.setFieldsValue(initialValues);
        setIsChange(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialValues]);

    return (
        <section className="px-8 py-4">
            <Layout.Header className="bg-transparent flex justify-between items-center mb-2">
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
                <div className="grid grid-flow-row grid-cols-3 gap-6">
                    <section className="bg-white col-span-2 rounded-md">
                        <div className="flex flex-col p-4 gap-4">
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
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="status">Trạng thái</label>
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
                                        setNewImages={setNewImages}
                                        setDeleteImages={setDeleteImages}
                                        images={initialValues.images}
                                    />
                                </div>
                            </div>

                            <Button
                                type="primary"
                                htmlType="submit"
                                className="bg-blue-500"
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
