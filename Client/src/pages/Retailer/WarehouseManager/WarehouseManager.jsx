import { Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import ActionImportExportProducts from '@components/ActionImportExportProducts/ActionImportExportProducts.component';

import { getWarehousesApi } from '@api/warehouseApi';

const cols = [
    {
        title: 'Mã phiếu',
        dataIndex: '_id',
        key: '_id',
        render: (_id) => {
            return <Link to={_id}>{_id}</Link>;
        }
    },

    {
        title: 'Số lượng',
        dataIndex: 'products',
        key: 'products',
        render: (products) => {
            return products.length;
        }
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        render: (status) => {
            return status === 'pending' ? (
                <Tag color="orange">Đang chờ</Tag>
            ) : (
                <Tag color="green">Đã nhập</Tag>
            );
        }
    },
    {
        title: 'Ngày lập phiếu',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (date) => {
            return new Date(date).toLocaleDateString();
        }
    }
];

function WarehouseManager({ isImport = true }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        getWarehousesApi().then((res) => {
            setData(res.warehouseReceipts);
        });
    }, []);
    return (
        <section className="space-y-2 px-4 py-2">
            <div className="mb-2 flex items-center justify-center bg-white">
                <h1 className="text-xl font-semibold">
                    Quản lý {isImport ? 'nhập' : 'xuất'}
                </h1>
            </div>
            <div className="grid grid-cols-1 gap-y-4 md:grid-cols-4 md:gap-4">
                <section className="bg-white md:col-span-1">
                    <ActionImportExportProducts isImport={isImport} />
                </section>
                <section className="col-span-3">
                    <Table
                        columns={cols}
                        dataSource={data}
                        rowKey={(record) => record._id}
                    />
                </section>
            </div>
        </section>
    );
}

export default WarehouseManager;
