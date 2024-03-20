import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getInfoMyRetailerApi } from '../../api/retailerApi';
import HTMLRenderer from '../../components/HTMLRenderer/HTMLRenderer.component';
import { typeLocations } from '../../utils/typeConstraint';

function RegisterRetailerPending() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [infoRegisterRetailer, setInfoRegisterRetailer] = useState({});

    useEffect(() => {
        const getData = async () => {
            getInfoMyRetailerApi().then((res) => {
                setInfoRegisterRetailer(res.data.retailer);
            });
        };
        getData();
    }, []);

    if (infoRegisterRetailer.status === 'approved') {
        dispatch({
            type: 'user/updateUser',
            payload: {
                pendingRetailer: {
                    retailer: infoRegisterRetailer._id,
                    status: 'approved'
                }
            }
        });
        navigate(`retailer/${infoRegisterRetailer._id}`);
    }
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
                open={true}
                className="md:w-1/2"
            >
                {infoRegisterRetailer.name && (
                    <>
                        <h1 className="text-center text-2xl font-bold">
                            {infoRegisterRetailer.status === 'pending'
                                ? 'Đơn của bạn đang chờ xét duyệt!'
                                : infoRegisterRetailer.status === 'rejected'
                                  ? 'Đơn của bạn đã bị từ chối!'
                                  : 'Đơn của bạn đã được chấp nhận!'}
                        </h1>
                        {infoRegisterRetailer.status === 'approved' && (
                            <h2 className="mb-4 mt-4 text-lg font-semibold">
                                Vui lòng đăng nhập lại để vào trang quản lý!
                            </h2>
                        )}
                        <h2 className="mb-4 mt-4 text-xl font-semibold">
                            Thông tin
                        </h2>
                        <ul className="space-y-2">
                            <li className="pl-8">
                                <span className="mr-2 font-medium">
                                    Tên của hàng:
                                </span>
                                {infoRegisterRetailer.name}
                            </li>
                            <li className="pl-8">
                                <span className="mr-2 font-medium">Loại:</span>
                                {
                                    typeLocations.find(
                                        (item) =>
                                            item.value ===
                                            infoRegisterRetailer.type
                                    ).label
                                }
                            </li>
                            <li className="pl-8">
                                <span className="mr-2 font-medium">Mô tả:</span>
                                <div className="ml-2 rounded-md bg-gray-100 p-2">
                                    <HTMLRenderer
                                        htmlString={
                                            infoRegisterRetailer.description
                                        }
                                    />
                                </div>
                            </li>
                            <li className="pl-8">
                                <span className="mr-2 font-medium">
                                    Toạ độ:
                                </span>
                                {
                                    infoRegisterRetailer.location.loc
                                        .coordinates[1]
                                }
                                ,{' '}
                                {
                                    infoRegisterRetailer.location.loc
                                        .coordinates[0]
                                }
                            </li>
                        </ul>
                    </>
                )}
            </Modal>
        </>
    );
}

export default RegisterRetailerPending;
