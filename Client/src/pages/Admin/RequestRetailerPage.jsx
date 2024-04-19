// TODO: Page hiển thị danh sách yêu cầu mở cửa hàng của retailer

import { useState, useEffect } from 'react';
import { Table, Tag, Space, Button } from 'antd';

import { getRequestsRetailerApi } from '@api/retailerApi';
import DetailRequestRetailer from '@components/RequestRetailer/DetailRequestRetailer';
import ActionRequestRetailer from '@components/RequestRetailer/ActionsButton';
import FilterRequest from '@components/RequestRetailer/FilterRequest';
import { useSearchParams } from 'react-router-dom';
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
                    <div className="mb-5">
                        <h1 className="text-center text-xl font-bold">
                            Yêu cầu đăng ký cửa hàng
                        </h1>
                    </div>
                    <div className="mb-4 flex justify-center">
                        <FilterRequest />
                    </div>
                    <Table
                        columns={columns}
                        dataSource={requests}
                        rowKey="_id"
                    />

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
                        setRequest={setRequests}
                        requests={requests}
                    />
                </>
            )}
        </section>
    );
}

export default RequestRetailerPage;
