import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'antd';

import { getOrderById, updateStatusOrder } from '@api/orderApi';

import OrderDetailContent from '@components/Order/OrderDetailContent/OrderDetailContent.component';

function OrderDetailPage() {
    const { orderId } = useParams();
    const [order, setOrder] = useState();

    useEffect(() => {
        getOrderById(orderId).then((response) => {
            setOrder(response.data);
        });
    }, [orderId]);

    const handleUpdateStatus = (status) => {
        updateStatusOrder(order._id, status).then(() => {
            setOrder({
                ...order,
                status
            });
        });
    };

    return (
        <>
            {order && (
                <OrderDetailContent order={order}>
                    {order.status === 'pending' && (
                        <Button
                            type="primary"
                            danger
                            className="w-full"
                            onClick={() => handleUpdateStatus('cancelled')}
                        >
                            Hủy đơn hàng
                        </Button>
                    )}
                </OrderDetailContent>
            )}
        </>
    );
}

export default OrderDetailPage;
