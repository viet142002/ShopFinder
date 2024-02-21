import * as Yup from 'yup';

const FormProduct = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập tên'),
    price: Yup.number().required('Vui lòng nhập giá'),
    type: Yup.string().required('Vui lòng chọn loại'),
    description: Yup.string().required('Vui lòng nhập mô tả')
});

export default FormProduct;
