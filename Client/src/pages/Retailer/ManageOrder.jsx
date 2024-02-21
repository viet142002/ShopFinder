import { Table, Space } from 'antd';
import { useEffect, useState } from 'react';

const columns = [
    {
        title: 'Order ID',
        dataIndex: 'orderID',
        key: 'orderID'
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date'
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status'
    },
    {
        title: 'Total',
        dataIndex: 'total',
        key: 'total'
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action'
    }
];

function ManageOrder() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Call API to get orders
    }, []);

    return (
        <section className="p-5">
            <Table columns={columns} dataSource={orders} rowKey="_id" />
        </section>
    );
}

export default ManageOrder;
