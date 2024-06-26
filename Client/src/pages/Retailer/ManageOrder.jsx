import { Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { getOrdersByDistributor } from '~/api/orderApi';

import { formatTime, formatPrice } from '~/utils/index';
import { STATUS } from '~/constants';
import FilterOrder from '~/components/Order/FilterOrder/FilterOrder.component';

import socket from '~/socket';

const columns = [
    {
        title: 'Tên khách hàng',
        dataIndex: 'fullname',
        key: 'fullname'
    },
    {
        title: 'Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (date) => formatTime(date)
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status) => (
            <Tag color={STATUS.ORDER[status].COLOR}>
                {STATUS.ORDER[status].LABEL}
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
            status: searchParams.get('status') || 'all',
            fullname: searchParams.get('fullname') || ''
        }).then((response) => {
            setOrders(response.data);
        });
    }, [searchParams]);

    useEffect(() => {
        socket.on('order', (data) => {
            if (
                ['all', 'pending'].includes(searchParams.get('status')) ||
                !searchParams.get('status')
            ) {
                setOrders((prev) => [data.order, ...prev]);
            }
        });

        return () => {
            socket.off('order');
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="m-4 mx-auto max-w-[1200px]">
            <div className="my-5 overflow-auto md:my-10 md:flex md:justify-center">
                <FilterOrder />
            </div>
            <section className="overflow-auto">
                <Table
                    columns={columns}
                    dataSource={orders}
                    rowKey="_id"
                    pagination={{
                        pageSize: 20
                    }}
                />
            </section>
        </div>
    );
}

export default ManageOrder;
