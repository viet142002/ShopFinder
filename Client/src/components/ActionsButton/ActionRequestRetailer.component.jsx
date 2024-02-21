import { Space, Button, Tag } from 'antd';
import { acceptRequestApi, rejectRequestApi } from '../../api/retailerApi.js';
import { useState } from 'react';

function ActionRequestRetailer({ recordId, setRequest, requests }) {
    const [loading, setLoading] = useState({
        acceptRequest: false,
        rejectRequest: false
    });
    const [result, setResult] = useState('');

    const handleAccept = async (_id) => {
        setLoading({
            ...loading,
            acceptRequest: true
        });

        const data = await acceptRequestApi(_id);

        setLoading({
            ...loading,
            acceptRequest: false
        });
        if (data.message === 'Approved request successfully') {
            setResult('approved');
            setRequest([
                ...requests.map((request) => {
                    if (request._id === _id) {
                        request.status = 'approved';
                    }
                    return request;
                })
            ]);
        }
    };

    const handleReject = async (_id) => {
        setLoading({
            ...loading,
            rejectRequest: true
        });

        const data = await rejectRequestApi(_id);
        setLoading({
            ...loading,
            rejectRequest: false
        });
        if (data.message === 'Rejected request successfully') {
            setResult('rejected');

            setRequest([
                ...requests.map((request) => {
                    if (request._id === _id) {
                        request.status = 'rejected';
                    }
                    return request;
                })
            ]);
        }
    };

    return (
        <>
            {result === 'rejected' ? (
                <Tag color="red">Đã từ chối</Tag>
            ) : result === 'approved' ? (
                <Tag color="green">Đã chấp thuận</Tag>
            ) : (
                <Space size="middle">
                    <Button
                        className="bg-blue-500 text-white hover:bg-blue-400 hover:!text-white"
                        onClick={() => handleAccept(recordId)}
                        loading={loading.acceptRequest}
                    >
                        Chấp thuận
                    </Button>
                    <Button
                        type="danger"
                        onClick={() => handleReject(recordId)}
                        loading={loading.rejectRequest}
                    >
                        Từ chối
                    </Button>
                </Space>
            )}
        </>
    );
}

export default ActionRequestRetailer;
