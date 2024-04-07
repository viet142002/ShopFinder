import { Button, Flex } from 'antd';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

import OrderDetailContent from '@components/Order/OrderDetailContent/OrderDetailContent.component';
import { getOrderById, updateStatusOrder } from '@api/orderApi';
import PrintBill from '@components/PrintBill';

import socket from '../../socket';
import { useSelector } from 'react-redux';

function ManageOrderDetail() {
    const { orderId } = useParams();
    const [order, setOrder] = useState();
    const { logo } = useSelector((state) => state.retailer.data.logo);
    const printRef = useRef();

    useEffect(() => {
        getOrderById(orderId).then((response) => {
            setOrder(response.data);
        });
    }, [orderId]);

    const handleUpdateStatus = (status) => {
        let message = `Đơn hàng của bạn tại ${order.distributor.name}`;
        if (status === 'cancelled') {
            message += ' đã bị hủy';
        }
        if (status === 'shipping') {
            message += ' đang được vận chuyển';
        }

        socket.emit('notification', {
            receiverId: order.user,
            type: 'ORDER',
            message: message,
            fromType: 'Retailer',
            from: {
                name: order.distributor.name,
                logo: logo
            },
            createdAt: new Date()
        });
        updateStatusOrder(order._id, status).then(() => {
            setOrder({
                ...order,
                status
            });
        });
    };

    const handlePrint = useReactToPrint({
        content: () => printRef.current
    });
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
                    {(order.status === 'shipping' ||
                        order.status === 'success') && (
                        <div className="flex justify-end">
                            <Button
                                type="primary"
                                className="bg-blue-500"
                                onClick={handlePrint}
                            >
                                In Hoá đơn
                            </Button>
                        </div>
                    )}
                </OrderDetailContent>
            )}

            {order && (
                <div className="hidden">
                    <PrintBill
                        // printRef={printRef}
                        ref={printRef}
                        bill={{ ...order, orderItems: '' }}
                        products={order.orderItems}
                    />
                </div>
            )}
        </>
    );
}

export default ManageOrderDetail;
