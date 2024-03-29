import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Form } from 'antd';

import FormCheckout from '../../../components/Checkout/FormCheckout.component';
import CardTotal from '../../../components/Checkout/CardTotal.component';

function CheckoutPage() {
    const [form] = Form.useForm();
    const [location, setLocation] = useState({ lat: 0, lng: 0 });
    const { state } = useLocation();
    const user = useSelector((state) => state.user.data);

    const onFinish = (values) => {
        const products = [];
        state.cart.forEach((item) => {
            if (!item.items.length) return;
            item.items.forEach((prod) => {
                products.push({
                    productId: prod.product._id,
                    quantity: prod.quantity,
                    discount: prod.product.discount
                });
            });
        });
        console.log({ ...values, products });
    };

    const onFill = (p) => {
        setLocation(p);
        form.setFieldsValue({
            location: {
                lat: p.lat,
                lng: p.lng
            }
        });
    };

    return (
        <Form
            form={form}
            className="mx-2 mt-10 grid gap-4 md:mx-auto md:w-[80%] md:grid-cols-5"
            onFinish={onFinish}
            variant="filled"
            onValuesChange={(changedValues) => {
                if (changedValues.location) {
                    setLocation((prev) => {
                        return {
                            ...prev,
                            ...changedValues.location
                        };
                    });
                }
            }}
            initialValues={{
                lastname: user?.lastname,
                firstname: user?.firstname,
                phone: user?.phone,
                address: user?.address
            }}
            layout="vertical"
            requiredMark={false}
        >
            <section className="md:col-span-3">
                <div className="rounded-lg bg-white p-2 shadow-lg">
                    <h1>Thông tin</h1>
                    <FormCheckout address={user.address} onFill={onFill} />
                </div>
            </section>
            <section className="md:col-span-2">
                <CardTotal state={state} location={location} />
            </section>
        </Form>
    );
}

export default CheckoutPage;
