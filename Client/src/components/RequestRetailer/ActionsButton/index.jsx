import { Space, Button, Tag } from 'antd';
import {
    acceptRequestApi,
    rejectRequestApi,
    blockedRetailerApi
} from '@api/retailerApi.js';
import { useState } from 'react';

function ActionRequestRetailer({ recordId, setRequests, requests = [] }) {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(
        requests?.find((request) => request?._id === recordId).status || ''
    );

    const handleAccept = async (_id) => {
        setLoading(true);

        const data = await acceptRequestApi(_id);

        if (data.message === 'Approved request successfully') {
            setResult('approved');
            setRequests([
                ...requests.map((request) => {
                    if (request._id === _id) {
                        request.status = 'approved';
                    }
                    return request;
                })
            ]);
        }
        setLoading(false);
    };

    const handleReject = async (_id) => {
        setLoading(true);
        const data = await rejectRequestApi(_id);
        if (data.message === 'Rejected request successfully') {
            setResult('rejected');
            setRequests([
                ...requests.map((request) => {
                    if (request._id === _id) {
                        request.status = 'rejected';
                    }
                    return request;
                })
            ]);
        }
        setLoading(false);
    };

    const handleBlock = async (_id) => {
        setLoading(true);
        const res = await blockedRetailerApi(_id);
        console.log('🚀 ~ handleBlock ~ data:', res.data);
        if (res.data.message === 'Blocked retailer successfully') {
            setResult('blocked');
            setRequests((prev) => {
                return prev.map((request) => {
                    if (request._id === _id) {
                        request.status = 'blocked';
                    }
                    return request;
                });
            });
        }
        setLoading(false);
    };

    return (
        <>
            {result === 'rejected' ? (
                <Tag color="red">Đã từ chối</Tag>
            ) : result === 'approved' ? (
                <Space size="middle">
                    <Tag color="green">Đã chấp thuận</Tag>
                    <Button
                        type="primary"
                        onClick={() => handleBlock(recordId)}
                        loading={loading}
                        danger
                    >
                        Chặn cửa hàng
                    </Button>
                </Space>
            ) : result === 'blocked' ? (
                <Space size="middle">
                    <Tag color="red">Đã chặn</Tag>
                    <Button
                        type="primary"
                        onClick={() => handleAccept(recordId)}
                        loading={loading}
                        className="bg-blue-500"
                    >
                        Mở chặn
                    </Button>
                </Space>
            ) : (
                <Space size="middle">
                    <Button
                        className="bg-blue-500 text-white hover:bg-blue-400 hover:!text-white"
                        onClick={() => handleAccept(recordId)}
                        loading={loading}
                    >
                        Chấp thuận
                    </Button>
                    <Button
                        type="danger"
                        onClick={() => handleReject(recordId)}
                        loading={loading}
                    >
                        Từ chối
                    </Button>
                </Space>
            )}
        </>
    );
}

export default ActionRequestRetailer;
