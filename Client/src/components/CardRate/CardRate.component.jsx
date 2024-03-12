import { Avatar, Rate, Dropdown, Modal, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { MoreOutlined } from '@ant-design/icons';

import ActionCardRate from './ActionCardRate/ActionCardRate.component';
import DisplayImagesRate from './DisplayImagesRate/DisplayImages.component';

import { deleteRateApi } from '../../api/RateApi';

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
    const user = useSelector((state) => state.user.data);
    const isMyRate = user._id === rate?.from?._id;
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleClick = ({ key }) => {
        if (key === 'edit') {
            dispatch({
                type: 'rating/setShowModal',
                payload: { isShow: true, rate: rate }
            });
            return;
        }
        if (key === 'delete') {
            setConfirmDelete(true);
            return;
        }
        if (key === 'report') {
            console.log('report');
            return;
        }
    };

    const handleDelete = () => {
        try {
            deleteRateApi(rate._id).then((data) => {
                console.log('🚀 ~ deleteRateApi ~ data:', data);
                dispatch({
                    type: 'rating/deleteRate',
                    payload: rate._id
                });
                setConfirmDelete(false);
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className="space-y-2 card-rate">
            <div className="md:mx-10 mx-2">
                <div className="flex items-center gap-2">
                    <Avatar
                        size={38}
                        src={
                            import.meta.env.VITE_APP_API_URL +
                            (rate.avatar
                                ? rate.avatar
                                : '/images/avatar-default.png')
                        }
                    />
                    <div>
                        <h3>
                            {rate.from?.firstname} {rate.from?.lastname}
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

            <div className="flex items-center mx-10">
                <ActionCardRate
                    likes={rate.likes}
                    dislikes={rate.dislikes}
                    _id={rate._id}
                />
                <span className="ml-auto text-sm">
                    {new Date(rate.createdAt).toLocaleDateString()}
                </span>
            </div>

            <Modal
                title="Xác nhận"
                open={confirmDelete}
                centered
                onOk={() => {
                    dispatch({
                        type: 'rating/deleteRate',
                        payload: rate._id
                    });
                    setConfirmDelete(false);
                }}
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
        </section>
    );
}

export default CardRate;
