import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form } from 'antd';
import { toast } from 'react-toastify';

import { FormCheckout } from '~/components/Form';
import CardTotal from '~/components/Checkout/CardTotal.component';

import { handleFetch } from '~/utils/expression';
import { createOrder, createOrderWithVNPay } from '~/api/orderApi';
import socket from '../../../socket';
import { useAuth } from '~/hooks/useAuth';

function CheckoutPage() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [priceSipping, setPriceShipping] = useState([]);
    const [location, setLocation] = useState({ lat: 0, lng: 0 });
    const { state } = useLocation();
    const { data: user } = useAuth();

    const onFinish = async (values) => {
        const items = state.cart.map((item) => {
            return {
                distributor: item.distributor._id,
                items: item.items.map((prod) => {
                    return {
                        productId: prod.product._id,
                        quantity: prod.quantity,
                        discount: prod.product.discount,
                        price:
                            prod.product.price *
                            prod.quantity *
                            (1 - prod.product.discount / 100)
                    };
                }),
                shippingPrice:
                    priceSipping.find(
                        (p) => p.retailer._id === item.distributor._id
                    )?.price || 0
            };
        });

        if (values.paymentMethod === 'VNPay') {
            if (items.length > 1) {
                toast.error('Chỉ hỗ trợ thanh toán online với 1 cửa hàng');
                return;
            }
            createOrderWithVNPay({
                ...values,
                orderItems: items,
                amount: state.totalPrice + priceSipping[0]?.price || 0
            }).then((res) => {
                window.location.href = res.data.vnpUrl;
            });
            return;
        }

        const data = await handleFetch(() =>
            createOrder({
                ...values,
                orderItems: items
            })
        );
        if (data) {
            data.orders.forEach((order) => {
                socket.emit('order', {
                    receiverId: order?.distributor,
                    order
                });
            });

            return navigate('/');
        }
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
                fullname: user?.fullname,
                phone: user?.phone,
                address: user?.address,
                paymentMethod: 'COD'
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
                <CardTotal
                    state={state}
                    location={location}
                    priceSipping={priceSipping}
                    setPriceShipping={setPriceShipping}
                />
            </section>
        </Form>
    );
}

export default CheckoutPage;
