import { Button, Flex } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import OrderDetailContent from '@components/Order/OrderDetailContent/OrderDetailContent.component';
import { getOrderById, updateStatusOrder } from '@api/orderApi';

function ManageOrderDetail() {
    const { orderId } = useParams();
    const [order, setOrder] = useState();
    // console.log('🚀 ~ ManageOrderDetail ~ order:', order);

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
                        <Flex gap={4}>
                            <Button
                                danger
                                onClick={() => handleUpdateStatus('cancelled')}
                            >
                                Hủy đơn hàng
                            </Button>
                            <Button
                                type="primary"
                                className="flex-1 bg-blue-500"
                                onClick={() => handleUpdateStatus('shipping')}
                            >
                                Giao hàng
                            </Button>
                        </Flex>
                    )}
                </OrderDetailContent>
            )}
        </>
    );
}

export default ManageOrderDetail;
