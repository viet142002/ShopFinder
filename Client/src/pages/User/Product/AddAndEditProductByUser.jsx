import { Form } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { handleFetch } from '@utils/expression';
import {
    createProductByUserApi,
    getProductByIdApi,
    updateProductByUserApi
} from '@api/productApi';

import { FormProduct } from '@components/Form';

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

function AddAndEditProductByUser() {
    const { productId, storeId } = useParams();
    console.log('here');
    const isAddMode = !productId;
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

    const AddProduct = async (values) => {
        const formData = formatForm(
            {
                ...values,
                distributor: storeId
            },
            newImages,
            deleteImages
        );
        await handleFetch(() => createProductByUserApi(formData));
    };

    const EditProduct = async (values) => {
        const formData = formatForm(values, newImages, deleteImages);
        await handleFetch(() => updateProductByUserApi(productId, formData));
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
            getProductByIdApi(productId).then((res) => {
                setInitialValues(res.data);
                form.setFieldsValue(res.data);
            });
        }
    }, [form, productId, isAddMode]);

    return (
        <section>
            <div className="my-4 flex items-center justify-center md:my-8">
                <h1 className="text-xl font-bold">
                    {isAddMode ? 'Thêm sản phẩm' : 'Chỉnh sửa sản phẩm'}
                </h1>
            </div>
            <Form
                form={form}
                variant="filled"
                onFinish={onFinish}
                initialValues={initialValues}
                onFieldsChange={() => setIsChange(true)}
                scrollToFirstError
            >
                <FormProduct
                    isAddMode={isAddMode}
                    isChange={isChange}
                    imageBefore={initialValues.images}
                    setNewImages={setNewImages}
                    setDeleteImages={setDeleteImages}
                />
            </Form>
        </section>
    );
}

export default AddAndEditProductByUser;
