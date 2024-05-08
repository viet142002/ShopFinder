import { Space, Button, Tag } from 'antd';
import {
    acceptRequestApi,
    rejectRequestApi,
    blockedRetailerApi
} from '@api/retailerApi.js';

import { updateStatus } from '@api/communityApi';
import { useState } from 'react';

function ActionStore({ storeId, setStores, stores, type = 'retailer' }) {
    console.log('🚀 ~ ActionStore ~ type:', type);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(
        stores?.find((store) => store?._id === storeId)?.status || ''
    );

    const handleAccept = async (_id) => {
        setLoading(true);
        let data = null;
        if (type === 'retailer') {
            data = await acceptRequestApi(_id);
        } else {
            const res = await updateStatus(_id, { status: 'normal' });
            data = res.data;
        }
        if (data.message === 'Successfully') {
            setResult(type === 'retailer' ? 'approved' : 'normal');
            setStores((prev) => [
                ...prev.map((request) => {
                    if (request._id === _id) {
                        request.status =
                            type === 'retailer' ? 'approved' : 'normal';
                    }
                    return request;
                })
            ]);
        }
        setLoading(false);
    };

    const handleReject = async (_id) => {
        setLoading(true);
        let data = null;
        if (type === 'retailer') {
            data = await rejectRequestApi(_id);
        } else {
            data = await acceptRequestApi(_id, 'store');
        }

        if (data.message === 'Rejected request successfully') {
            setResult('rejected');
            setStores((prev) => [
                ...prev.map((request) => {
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
        let res = null;
        if (type === 'retailer') {
            res = await blockedRetailerApi(_id);
        } else {
            res = await updateStatus(_id, { status: 'blocked' });
        }
        if (res.data.message === 'Successfully') {
            setResult('blocked');
            setStores((prev) => {
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

    if (result === 'blocked') {
        return (
            <Space size="middle">
                <Tag color="red">Đã chặn</Tag>
                <Button
                    type="primary"
                    className="flex items-center bg-blue-500"
                    onClick={() => handleAccept(storeId)}
                    loading={loading}
                >
                    Mở chặn
                </Button>
            </Space>
        );
    }

    if (result === 'approved') {
        return (
            <Space size="middle">
                <Tag color="green">Đã chấp thuận</Tag>
                <Button
                    type="primary"
                    className="flex items-center bg-blue-500"
                    onClick={() => handleBlock(storeId)}
                    loading={loading}
                    danger
                >
                    Chặn cửa hàng
                </Button>
            </Space>
        );
    }

    if (result === 'rejected') {
        return <Tag color="red">Đã từ chối</Tag>;
    }

    if (type === 'information' && result === 'normal') {
        return (
            <Space size="middle">
                <Tag color="green">Bình thường</Tag>
                <Button
                    type="primary"
                    className="flex items-center bg-blue-500"
                    danger
                    onClick={() => handleBlock(storeId)}
                    loading={loading}
                >
                    Chặn
                </Button>
            </Space>
        );
    }

    if (type === 'information' && result === 'blocked') {
        return (
            <Space size="middle">
                <Tag color="red">Đã chặn</Tag>
                <Button
                    type="primary"
                    className="flex items-center bg-blue-500"
                    onClick={() => handleAccept(storeId)}
                    loading={loading}
                >
                    Mở chặn
                </Button>
            </Space>
        );
    }

    return (
        <Space size="middle">
            <Button
                className="bg-blue-500 text-white hover:bg-blue-400 hover:!text-white"
                onClick={() => handleAccept(storeId)}
                loading={loading}
            >
                Chấp thuận
            </Button>
            <Button
                type="danger"
                onClick={() => handleReject(storeId)}
                loading={loading}
            >
                Từ chối
            </Button>
        </Space>
    );
}

export default ActionStore;
