import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Spin } from 'antd';

import { getOrders } from '@api/orderApi';

import OrderItem from '@components/Order/OrderItem.Component';
import FilterOrder from '@components/Order/FilterOrder/FilterOrder.component';
import { PaginationPage } from '@components/common/Pagination';

function OrderPage() {
    const [data, setData] = useState({
        orders: [],
        total: 0,
        page: 1
    });
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        setIsLoading(true);
        getOrders({
            status: searchParams.get('status') || 'all',
            page: searchParams.get('page') || 1,
            limit: 10
        })
            .then((res) => {
                setData({
                    orders: res.data.orders,
                    total: res.data.total,
                    page: res.data.page
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [searchParams]);

    return (
        <section>
            <div className="overflow-auto md:mt-10 md:flex md:justify-center">
                <FilterOrder />
            </div>
            <div className="m-4 space-y-4 md:mx-10 md:mt-4">
                {data.total === 0 && (
                    <div className="text-center text-xl font-medium">
                        Bạn chưa có đơn hàng nào
                    </div>
                )}
                {isLoading ? (
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Spin size="large" />
                    </div>
                ) : (
                    data.orders.map((order) => (
                        <OrderItem key={order._id} order={order} />
                    ))
                )}
            </div>

            {data.total > 0 && (
                <div className="mb-2 mt-8 flex justify-center">
                    <PaginationPage total={data.total} current={data.page} />
                </div>
            )}
        </section>
    );
}

export default OrderPage;
