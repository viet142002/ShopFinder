import { useState, useEffect } from 'react';
import { Table, Tag, Space, Button } from 'antd';

import { getRequestsRetailerApi } from '../../api/retailerApi';
import DetailRequestRetailer from '../../components/DetailRequestRetailer/DetailRequestRetailer.component';
import ActionRequestRetailer from '../../components/ActionsButton/ActionRequestRetailer.component';

function RequestRetailerPage() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState({
        target: null,
        isOpen: false
    });

    useEffect(() => {
        async function fetchRequests() {
            try {
                setLoading(true);
                const data = await getRequestsRetailerApi();
                setRequests(data.requests);
                setLoading(false);
            } catch (error) {
                console.error('RequestRetailerPage -> fetchRequests', error);
            }
        }
        fetchRequests();
    }, []);

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
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address'
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
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {record.status === 'pending' && (
                        <ActionRequestRetailer
                            recordId={record._id}
                            setRequest={setRequests}
                            requests={requests}
                        />
                    )}
                </Space>
            )
        }
    ];

    return (
        <section className="p-5">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <Table
                        columns={columns}
                        dataSource={requests}
                        rowKey="_id"
                    />
                    {requests && (
                        <DetailRequestRetailer
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
                        />
                    )}
                </>
            )}
        </section>
    );
}

export default RequestRetailerPage;
