import { useState, useEffect } from 'react';
import { Table, Tag, Space, Button } from 'antd';
import { useSearchParams } from 'react-router-dom';

import { getRequestsRetailerApi } from '@api/retailerApi';
import DetailStoreWidget from '@components/Store/DetailStoreWidget';
import ActionStore from '@components/Store/ActionStore';
import { FilterRequest } from './components';

import { formatTime } from '@utils/formatTime';

function RequestRetailerPage() {
    const [searchParams] = useSearchParams();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState({
        target: null,
        isOpen: false
    });
    const status = searchParams.get('status');
    const sort = searchParams.get('sort');

    useEffect(() => {
        getRequestsRetailerApi({ status, sort })
            .then((data) => {
                setRequests(data.requests);
            })
            .finally(() => setLoading(false));
    }, [status, sort]);

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => (
                <Button
                    type="text"
                    onClick={() =>
                        setOpen({
                            target: record._id,
                            isOpen: true
                        })
                    }
                >
                    {record.name}
                </Button>
            )
        },
        {
            title: 'Điện thoại',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: 'Loại cửa hàng',
            key: 'type',
            dataIndex: 'type'
        },
        {
            title: 'Trạng thái',
            key: 'status',
            dataIndex: 'status',
            render: (_, record) => (
                <Space size="middle">
                    {record.status === 'pending' ? (
                        <Tag color="blue">Đang chờ</Tag>
                    ) : record.status === 'approved' ? (
                        <Tag color="green">Đã chấp thuận</Tag>
                    ) : (
                        <Tag color="red">Đã từ chối</Tag>
                    )}
                </Space>
            )
        },
        {
            title: 'Thời gian',
            key: 'createdAt',
            dataIndex: 'createdAt',
            render: (createdAt) => {
                return <p>{formatTime(createdAt)}</p>;
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {record.status === 'pending' && (
                        <ActionStore
                            storeId={record._id || 'abc'}
                            setStores={setRequests}
                            stores={requests}
                        />
                    )}
                </Space>
            )
        }
    ];

    return (
        <section className="mx-auto w-[90%] md:w-[80%]">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h1 className="p-6 text-center text-lg font-medium">
                        Quản lý cửa hàng
                    </h1>
                    <div className="mb-4 flex justify-center">
                        <FilterRequest />
                    </div>
                    <Table
                        columns={columns}
                        dataSource={requests}
                        rowKey="_id"
                    />

                    <DetailStoreWidget
                        open={open.isOpen}
                        onClose={() =>
                            setOpen({
                                target: null,
                                isOpen: false
                            })
                        }
                        data={requests.find(
                            (request) => request._id === open.target
                        )}
                        setStores={setRequests}
                        stores={requests}
                    />
                </>
            )}
        </section>
    );
}

export default RequestRetailerPage;
