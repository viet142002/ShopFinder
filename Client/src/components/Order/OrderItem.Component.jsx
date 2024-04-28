import { useState } from 'react';
import { Tag, Button } from 'antd';
import { Link } from 'react-router-dom';

import OrderProductItem from './OrderProductItem/OrderProductItem.component';

import { formatPrice, typeOrderStatus } from '@utils/index';
import { updateStatusOrder } from '@api/orderApi';

function OrderItem({ order }) {
    const [statusOrder, setStatusOrder] = useState(order.status);

    const handleUpdateOrder = (status) => {
        updateStatusOrder(order._id, status).then(() => {
            setStatusOrder(status);
        });
    };

    return (
        <section className="rounded-lg bg-white p-2 shadow-card md:p-4">
            <div className="mt-4">
                <Link to={`./${order._id}`}>
                    <div>
                        <h3 className="font-medium">
                            {order.distributor.name}
                        </h3>
                        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] justify-between">
                            {order.orderItems.map((prod) => (
                                <OrderProductItem
                                    key={prod._id}
                                    product={prod.product}
                                    discount={prod.discount}
                                    price={prod.price}
                                    quantity={prod.quantity}
                                />
                            ))}
                        </div>
                    </div>

                    <p className="text-right">
                        <span className="text-base font-normal">Tổng: </span>
                        <span className="text-right text-lg font-medium text-red-500">
                            {formatPrice(order.totalPrice)}
                        </span>
                    </p>
                </Link>
                <div className="mt-4 flex items-center justify-between">
                    <Tag
                        color={
                            typeOrderStatus.find(
                                (status) => status.value === statusOrder
                            ).color
                        }
                    >
                        {
                            typeOrderStatus.find(
                                (status) => status.value === statusOrder
                            ).label
                        }
                    </Tag>
                    {statusOrder === 'pending' && (
                        <Button
                            type="primary"
                            danger
                            onClick={() => handleUpdateOrder('cancelled')}
                        >
                            Huỷ đơn hàng
                        </Button>
                    )}
                    {statusOrder === 'shipping' && (
                        <Button
                            type="primary"
                            className="bg-blue-500"
                            onClick={() => handleUpdateOrder('success')}
                        >
                            Xác nhận nhận hàng
                        </Button>
                    )}
                </div>
            </div>
        </section>
    );
}

export default OrderItem;
