import { Avatar, Rate, Dropdown, Modal, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { MoreOutlined } from '@ant-design/icons';

import ActionCardRate from './ActionCardRate/ActionCardRate.component';
import DisplayImagesRate from './DisplayImagesRate/DisplayImages.component';
import ModalReport from '../Modal/ModalReport/ModalReport.component';

import { deleteRateApi } from '@api/RateApi';
import { handleFetch } from '@utils/expression';
import { returnUrl } from '@utils/returnUrl';
import { formatTime } from '@utils/formatTime';
import { useAuth } from '@hooks/useAuth';

const items1 = [
    {
        label: 'Chỉnh sửa',
        key: 'edit'
    },
    {
        label: 'Xóa',
        key: 'delete'
    }
];

const items2 = [
    {
        label: 'Báo cáo',
        key: 'report'
    }
];

function CardRate(rate) {
    const dispatch = useDispatch();
    const { data: user } = useAuth();
    const isMyRate = user._id === rate?.from?._id;
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [openReport, setOpenReport] = useState(false);

    const handleClick = ({ key }) => {
        if (key === 'edit') {
            dispatch({
                type: 'rating/setShowModal',
                payload: { isShow: true, isEdit: true }
            });
            return;
        }
        if (key === 'delete') {
            setConfirmDelete(true);
            return;
        }
        if (key === 'report') {
            setOpenReport(true);
            return;
        }
    };

    const handleDelete = async () => {
        const data = await handleFetch(() => deleteRateApi(rate._id));
        if (data) {
            dispatch({
                type: 'rating/deleteRate'
            });
            setConfirmDelete(false);
        }
    };

    return (
        <section className="card-rate space-y-2">
            <div className="px-4 md:px-sideBarMark">
                <div className="flex items-center gap-2">
                    <Avatar size={38} src={returnUrl({ user: rate.from })} />
                    <div>
                        <h3>
                            {isMyRate
                                ? 'Bạn'
                                : `${rate.from?.lastname} ${rate.from?.firstname}`}
                        </h3>
                        <div>
                            <Rate
                                value={rate.rate}
                                disabled
                                className="text-sm"
                            />
                        </div>
                    </div>
                    <div className="ml-auto">
                        <Dropdown
                            menu={{
                                items: isMyRate ? items1 : items2,
                                onClick: handleClick
                            }}
                            trigger={['click']}
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <MoreOutlined />
                            </a>
                        </Dropdown>
                    </div>
                </div>
                <div>
                    <p>{rate.comment}</p>
                </div>
            </div>

            <DisplayImagesRate images={rate.images} />

            <div className="flex items-center px-4 md:px-sideBarMark">
                <ActionCardRate
                    likes={rate.likes}
                    dislikes={rate.dislikes}
                    _id={rate._id}
                    userId={user._id}
                />
                <span className="ml-auto text-sm">
                    {formatTime(rate.createdAt)}
                </span>
            </div>

            <Modal
                title="Xác nhận"
                open={confirmDelete}
                centered
                onCancel={() => setConfirmDelete(false)}
                footer={[
                    <Button
                        key="back"
                        onClick={() => setConfirmDelete(false)}
                        className="btn btn-secondary"
                    >
                        Hủy
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={handleDelete}
                        className="btn btn-primary"
                        danger
                    >
                        Xác nhận
                    </Button>
                ]}
            >
                <p>Bạn có chắc chắn muốn xóa đánh giá này?</p>
            </Modal>

            <ModalReport
                toId={rate._id}
                toType="Rate"
                open={openReport}
                handleCancel={() => setOpenReport(false)}
            />
        </section>
    );
}

CardRate.SkeletonLoadingCardRate = function SkeletonLoadingCardRate() {
    return (
        <div className="mx-2 animate-pulse space-y-2 md:mx-10">
            <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                <div className="flex-1 space-y-2">
                    <div className="h-4 w-[70%] rounded-md bg-gray-300"></div>
                    <div className="h-4 w-[60%] rounded-md bg-gray-300"></div>
                </div>
            </div>
            <div className="space-y-1">
                <div className="h-4 w-full rounded-md bg-gray-300"></div>
                <div className="h-4 w-full rounded-md bg-gray-300"></div>
                <div className="h-4 w-full rounded-md bg-gray-300"></div>
            </div>
            <div className="flex">
                <div className="h-4 w-[10%] rounded-md bg-gray-300"></div>
                <div className="ml-2 h-4 w-[10%] rounded-md bg-gray-300"></div>
                <div className="ml-auto h-4 w-[30%] rounded-md bg-gray-300"></div>
            </div>
        </div>
    );
};

export default CardRate;
