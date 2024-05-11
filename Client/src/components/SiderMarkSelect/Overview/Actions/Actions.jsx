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

import { unsetMarkSelect, setShowRouting } from '~/redux/routingSlice';
import ModalReport from '~/components/Modal/ModalReport/ModalReport.component';
import { useAuth } from '~/hooks/useAuth';

function Actions({ info }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [openReport, setOpenReport] = useState(false);
    const { showRouting } = useSelector((state) => state.routing);
    const {
        data: { _id }
    } = useAuth();

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
            <div className="mb-[16px] flex justify-between px-4 md:px-sideBarMark">
                <Button
                    aria-label="showRouting"
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
                    aria-label="store"
                    size="large"
                    shape="circle"
                    icon={<MdOutlineShoppingBag size={20} />}
                    onClick={() =>
                        navigate(`/stores/${info._id}/products`, {
                            state: {
                                type: info.informationType
                            }
                        })
                    }
                />

                {_id === info.user || _id === info.owner ? (
                    <Button
                        aria-label="edit"
                        size="large"
                        shape="circle"
                        onClick={handleEdit}
                        icon={<EditOutlined />}
                    />
                ) : (
                    <Button
                        aria-label="report"
                        size="large"
                        shape="circle"
                        icon={<WarningOutlined />}
                        onClick={() => setOpenReport(true)}
                    />
                )}

                <Button
                    aria-label="close"
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
