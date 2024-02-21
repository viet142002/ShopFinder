import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

import { getInfoMyRetailerApi } from '../../api/retailerApi';

function RegisterRetailerPending() {
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const [open, setOpen] = useState(true);
    const [info, setInfo] = useState({});

    useEffect(() => {
        const getInfo = async () => {
            const res = await getInfoMyRetailerApi();
            console.log(res);
            if (res.message === 'Get info retailer successfully')
                setInfo(res.retailer);
        };
        getInfo();
    }, []);
    return (
        <>
            <Modal
                title="Thông báo"
                centered
                cancelButtonProps={{ style: { display: 'none' } }}
                okText="Đồng ý"
                okButtonProps={{ style: { backgroundColor: 'blueviolet' } }}
                onOk={() => {
                    navigate('/');
                }}
                open={open}
                width={1000}
            >
                {info.name && (
                    <>
                        <h1 className="text-2xl font-bold text-center">
                            {info.status === 'pending'
                                ? 'Đơn của bạn đang chờ xét duyệt!'
                                : info.status === 'rejected'
                                  ? 'Đơn của bạn đã bị từ chối!'
                                  : 'Đơn của bạn đã được chấp nhận!'}
                        </h1>
                        <h3 className="text-xl font-bold mb-4">
                            Vui lòng đăng nhập lại để vào giao diện quản lý cửa
                            hàng
                        </h3>
                        <h2 className="text-xl font-semibold mb-4">
                            Thông tin
                        </h2>
                        <ul>
                            <li className="pl-8">
                                <span className="font-medium mr-2">
                                    Tên của hàng:
                                </span>
                                {info.name}
                            </li>
                            <li className="pl-8">
                                <span className="font-medium mr-2">Loại:</span>
                                {info.type}
                            </li>
                            <li className="pl-8">
                                <span className="font-medium mr-2">Mô tả:</span>
                                {info.description}
                            </li>
                            <li className="pl-8">
                                <span className="font-medium mr-2">
                                    Toạ độ:
                                </span>
                                {info.location.lat}, {info.location.lng}
                            </li>
                        </ul>
                    </>
                )}
            </Modal>
        </>
    );
}

export default RegisterRetailerPending;
