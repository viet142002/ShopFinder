import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

import { getInfoMyRetailerApi } from '../../api/retailerApi';
import HTMLRenderer from '../../components/HTMLRenderer/HTMLRenderer.component';
import { typeLocations } from '../../utils/typeConstraint';

function RegisterRetailerPending() {
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const [open, setOpen] = useState(true);
    const [info, setInfo] = useState({});

    useEffect(() => {
        const getInfo = async () => {
            const res = await getInfoMyRetailerApi();

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
                onCancel={() => {
                    navigate('/');
                }}
                open={open}
                className="md:w-1/2"
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
                        <h2 className="text-xl font-semibold mb-4 mt-4">
                            Thông tin
                        </h2>
                        <ul className="space-y-2">
                            <li className="pl-8">
                                <span className="font-medium mr-2">
                                    Tên của hàng:
                                </span>
                                {info.name}
                            </li>
                            <li className="pl-8">
                                <span className="font-medium mr-2">Loại:</span>
                                {
                                    typeLocations.find(
                                        (item) => item.value === info.type
                                    ).label
                                }
                            </li>
                            <li className="pl-8">
                                <span className="font-medium mr-2">Mô tả:</span>
                                <HTMLRenderer
                                    htmlString={info.description}
                                    className="ml-2 bg-gray-100 p-2 rounded-md"
                                />
                            </li>
                            <li className="pl-8">
                                <span className="font-medium mr-2">
                                    Toạ độ:
                                </span>
                                {info.location.loc.coordinates[1]},{' '}
                                {info.location.loc.coordinates[0]}
                            </li>
                        </ul>
                    </>
                )}
            </Modal>
        </>
    );
}

export default RegisterRetailerPending;
