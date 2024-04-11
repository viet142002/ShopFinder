import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Divider } from 'antd';
import {
    CloseOutlined,
    EditOutlined,
    WarningOutlined
} from '@ant-design/icons';
import { MdOutlineDirections, MdOutlineShoppingBag } from 'react-icons/md';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

import {
    unsetMarkSelect,
    setShowRouting
} from '../../../../redux/routingSlice';

import ModalReport from '../../../Modal/ModalReport/ModalReport.component';

function Actions({ info }) {
    console.log('🚀 ~ Actions ~ info:', info);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [openReport, setOpenReport] = useState(false);
    const showRouting = useSelector((state) => state.routing.showRouting);
    const { _id } = useSelector((state) => state.user.data);

    const handleClose = () => {
        dispatch(unsetMarkSelect());
    };

    const handleShowRouting = () => {
        dispatch(setShowRouting());
    };

    const handleEdit = () => {
        if (info.informationType === 'informationType') {
            return navigate(`/edit-store/${info._id}`, {
                state: {
                    type: info.informationType
                }
            });
        }
        navigate(`/edit-store/${info._id}`, {
            state: {
                type: info.informationType
            }
        });
    };

    return (
        <>
            <div className="mb-[16px] flex justify-between px-siderInfo">
                <Button
                    type="primary"
                    className={clsx(
                        'text-white',
                        showRouting ? 'bg-red-500' : 'bg-blue-500'
                    )}
                    size="large"
                    shape="circle"
                    onClick={() => handleShowRouting()}
                    icon={<MdOutlineDirections size={20} />}
                />

                <Button
                    size="large"
                    shape="circle"
                    icon={<MdOutlineShoppingBag size={20} />}
                    onClick={() =>
                        navigate(`/store/${info._id}`, {
                            state: {
                                type: info.informationType
                            }
                        })
                    }
                />

                {_id === info.user || _id === info.owner ? (
                    <Button
                        size="large"
                        shape="circle"
                        onClick={handleEdit}
                        icon={<EditOutlined />}
                    />
                ) : (
                    <Button
                        size="large"
                        shape="circle"
                        icon={<WarningOutlined />}
                        onClick={() => setOpenReport(true)}
                    />
                )}

                <Button
                    size="large"
                    shape="circle"
                    icon={<CloseOutlined />}
                    onClick={() => handleClose()}
                />
            </div>
            <Divider className="my-[16px]" />

            <ModalReport
                open={openReport}
                handleCancel={() => setOpenReport(false)}
                toId={info._id}
                toType={info.informationType}
            />
        </>
    );
}

export default Actions;
