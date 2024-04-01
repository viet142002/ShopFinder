import { Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { getOrdersByDistributor } from '@api/orderApi';

import { formatDate } from '@utils/formatDate';
import { typeOrderStatus } from '@utils/typeConstraint';
import { formatPrice } from '@utils/formatPrice';
import FilterOrder from '@components/Order/FilterOrder/FilterOrder.component';

const columns = [
    {
        title: 'Order ID',
        dataIndex: '_id',
        key: '_id'
    },
    {
        title: 'Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (date) => formatDate(date)
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status) => (
            <Tag
                color={
                    typeOrderStatus.find((item) => item.value === status).color
                }
            >
                {typeOrderStatus.find((item) => item.value === status).label}
            </Tag>
        )
    },
    {
        title: 'Sản phẩm',
        dataIndex: 'orderItems',
        key: 'orderItems',
        render: (orderItems) => orderItems.length
    },
    {
        title: 'Total',
        dataIndex: 'totalPrice',
        key: 'totalPrice',
        render: (price) => <p className="text-red-500">{formatPrice(price)}</p>
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (_, record) => {
            return <Link to={`./${record._id}`}>Xem</Link>;
        }
    }
];

function ManageOrder() {
    const [searchParams] = useSearchParams();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrdersByDistributor({
            status: searchParams.get('status') || 'all'
        }).then((response) => {
            setOrders(response.data);
        });
    }, [searchParams]);

    return (
        <>
            <div className="overflow-auto md:mt-10 md:flex md:justify-center">
                <FilterOrder />
            </div>
            <section className="p-5">
                <Table columns={columns} dataSource={orders} rowKey="_id" />
            </section>
        </>
    );
}

export default ManageOrder;
