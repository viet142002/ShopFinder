import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Spin } from 'antd';

import { getOrders } from '@api/orderApi';

import OrderItem from '@components/Order/OrderItem.Component';
import FilterOrder from '@components/Order/FilterOrder/FilterOrder.component';
import { useAuth } from '@hooks/useAuth';

function OrderPage() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const { data: user } = useAuth();

    useEffect(() => {
        setIsLoading(true);
        getOrders({
            status: searchParams.get('status') || 'all'
        })
            .then((res) => {
                setOrders(res.data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [user._id, searchParams]);

    return (
        <>
            <div className="overflow-auto md:mt-10 md:flex md:justify-center">
                <FilterOrder />
            </div>
            <div className="m-4 space-y-4 md:mx-10 md:mt-4">
                {orders.length === 0 && (
                    <div className="text-center text-xl font-medium">
                        Bạn chưa có đơn hàng nào
                    </div>
                )}
                {isLoading ? (
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Spin size="large" />
                    </div>
                ) : (
                    orders.map((order) => (
                        <OrderItem key={order._id} order={order} />
                    ))
                )}
            </div>
        </>
    );
}

export default OrderPage;
