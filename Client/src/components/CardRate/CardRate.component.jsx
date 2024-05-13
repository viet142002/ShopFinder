import { Avatar, Rate, Dropdown, Modal, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { MoreOutlined } from '@ant-design/icons';

import ActionCardRate from './ActionCardRate/ActionCardRate.component';
import DisplayImagesRate from './DisplayImagesRate/DisplayImages.component';
import ModalReport from '../Modal/ModalReport/ModalReport.component';

import { deleteRateApi } from '~/api/RateApi';
import { returnUrl, formatTime, handleFetch } from '~/utils/index';
import { useAuth } from '~/hooks/useAuth';
import { deleteRate, deleteReplyRate, setShowModal } from '~/redux/ratingSlice';
import { useRetailer } from '~/hooks';

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

function CardRate({ showReply, ...rate }) {
    const dispatch = useDispatch();
    const { data: user } = useAuth();
    const { data: retailer } = useRetailer();
    const isMyRate = user._id === rate?.from?._id;
    const [confirmDelete, setConfirmDelete] = useState({
        open: false,
        rate: null
    });
    const [openReport, setOpenReport] = useState(false);

    const handleClick = ({ key }, value) => {
        if (key === 'edit') {
            dispatch(
                setShowModal({
                    ...value,
                    isShow: true,
                    isEdit: true,
                    title: 'Chỉnh sửa'
                })
            );
            return;
        }
        if (key === 'delete') {
            setConfirmDelete({
                open: true,
                rate: value
            });
            return;
        }
        if (key === 'report') {
            setOpenReport(true);
            return;
        }
    };

    const handleDelete = async () => {
        const data = await handleFetch(() =>
            deleteRateApi(confirmDelete.rate._id)
        );
        if (data) {
            if (showReply) {
                dispatch(deleteReplyRate(confirmDelete.rate));
            } else {
                dispatch(deleteRate());
            }
            setConfirmDelete({
                open: false,
                id: null
            });
        }
    };

    return (
        <section className="card-rate space-y-2">
            <div className="px-4 md:px-sideBarMark">
                <div className="flex items-center gap-2">
                    <Avatar size={38} src={returnUrl(rate.from.avatar.path)} />
                    <div>
                        <h3>{isMyRate ? 'Bạn' : `${rate.from?.fullname}`}</h3>
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
                                onClick: (props) => handleClick(props, rate)
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
                    showReply={showReply}
                />
                <span className="ml-auto text-sm">
                    {formatTime(rate.createdAt)}
                </span>
            </div>

            {rate?.reply?.length > 0 && (
                <div className="px-4 md:px-sideBarMark">
                    <div className="flex flex-col space-y-2 border-l pl-2">
                        {rate.reply.map((item) => (
                            <div key={item._id} className="flex space-x-2">
                                <Avatar
                                    className="flex-shrink-0"
                                    size={32}
                                    src={returnUrl(
                                        item.from?.logo?.path ||
                                            item.from?.avatar?.path
                                    )}
                                />

                                <div className="w-full">
                                    <div className="flex justify-between">
                                        <h3>
                                            {item?.from?.fullname ||
                                                item?.from?.name}
                                        </h3>
                                        {showReply && (
                                            <div className="ml-auto">
                                                <Dropdown
                                                    menu={{
                                                        items: items1,
                                                        onClick: (props) =>
                                                            handleClick(
                                                                props,
                                                                item
                                                            )
                                                    }}
                                                    trigger={['click']}
                                                >
                                                    <a
                                                        onClick={(e) =>
                                                            e.preventDefault()
                                                        }
                                                    >
                                                        <MoreOutlined />
                                                    </a>
                                                </Dropdown>
                                            </div>
                                        )}
                                    </div>
                                    <p>{item.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <Modal
                title="Xác nhận"
                open={confirmDelete.open}
                centered
                onCancel={() =>
                    setConfirmDelete({
                        open: false,
                        id: null
                    })
                }
                footer={[
                    <Button
                        key="back"
                        onClick={() =>
                            setConfirmDelete({
                                open: false,
                                id: null
                            })
                        }
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
                from={user?._id || retailer?._id}
                fromType={user?._id ? 'User' : 'Retailer'}
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
