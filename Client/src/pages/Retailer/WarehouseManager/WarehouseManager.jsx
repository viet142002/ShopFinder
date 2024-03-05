import { Layout, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import ActionImportExportProducts from '../../../components/ActionImportExportProducts/ActionImportExportProducts.component';
import ButtonBack from '../../../components/ActionsButton/ButtonBack.component';

import { getWarehousesApi } from '../../../api/warehouseApi';

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
        <section className="px-4 py-2 space-y-2">
            <ButtonBack />
            <Layout.Header className="bg-white flex justify-center items-center mb-2">
                <h1 className="text-xl font-semibold">
                    Quản lý {isImport ? 'nhập' : 'xuất'}
                </h1>
            </Layout.Header>
            <Layout.Content className="grid grid-cols-1 md:grid-cols-4 md:gap-4 gap-y-4">
                <section className="md:col-span-1 bg-white">
                    <ActionImportExportProducts isImport={isImport} />
                </section>
                <section className="col-span-3">
                    <Table
                        columns={cols}
                        dataSource={data}
                        rowKey={(record) => record._id}
                    />
                </section>
            </Layout.Content>
        </section>
    );
}

export default WarehouseManager;
