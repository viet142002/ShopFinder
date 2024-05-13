import {
    LikeOutlined,
    DislikeOutlined,
    LikeFilled,
    DislikeFilled
} from '@ant-design/icons';
import { Button } from 'antd';
import { memo } from 'react';
import { useDispatch } from 'react-redux';

import { likeRateApi, dislikeRateApi } from '~/api/RateApi';
import socket from '~/socket';
import { useAuth, useRetailer } from '~/hooks';
import { emotionalRate, setShowModal } from '~/redux/ratingSlice';

import ModalRating from '~/components/Modal/ModalRating/ModalRating.component';

const ActionCardRate = memo(function ActionCardRate({
    likes,
    dislikes,
    _id: rateId
}) {
    const dispatch = useDispatch();
    const {
        data: { fullname, avatar, _id: userId }
    } = useAuth();
    const { data: retailer } = useRetailer();
    console.log('🚀 ~ fullname:', fullname);

    const handleLike = () => {
        likeRateApi(rateId).then((data) => {
            if (data.messageSocket) {
                socket.emit('notification', {
                    receiverId: data.rate.from._id,
                    _id: data.rate._id,
                    message: data.messageSocket,
                    type: 'RATE',
                    fromType: 'User',
                    from: {
                        avatar: avatar,
                        fullname: fullname
                    },
                    createdAt: new Date()
                });
            }
            dispatch(
                emotionalRate({
                    _id: rateId,
                    likes: data.rate.likes,
                    dislikes: data.rate.dislikes
                })
            );
        });
    };
    const handleDislike = () => {
        dislikeRateApi(rateId).then((data) => {
            dispatch({
                type: 'rating/emotionalRate',
                payload: {
                    _id: rateId,
                    likes: data.likes,
                    dislikes: data.dislikes
                }
            });
        });
    };
    const handleReply = () => {
        dispatch(
            setShowModal({
                title: 'Trả lời đánh giá',
                to: rateId,
                toType: 'Rate',
                from: retailer,
                fromType: 'Retailer'
            })
        );
    };

    return (
        <>
            <div className="flex gap-2">
                {fullname && (
                    <>
                        <div className="flex items-center">
                            <Button
                                icon={
                                    likes.includes(userId) ? (
                                        <LikeFilled />
                                    ) : (
                                        <LikeOutlined />
                                    )
                                }
                                shape="circle"
                                onClick={handleLike}
                                className="border-none"
                            />
                            <span>{likes?.length}</span>
                        </div>
                        <div className="flex items-center">
                            <Button
                                icon={
                                    dislikes.includes(userId) ? (
                                        <DislikeFilled />
                                    ) : (
                                        <DislikeOutlined />
                                    )
                                }
                                shape="circle"
                                className="border-none"
                                onClick={handleDislike}
                            />
                            <span>{dislikes?.length}</span>
                        </div>
                    </>
                )}

                {!fullname && (
                    <>
                        <Button
                            type="text"
                            onClick={handleReply}
                            className="border-none"
                        >
                            Trả lời
                        </Button>
                        <ModalRating />
                    </>
                )}
            </div>
        </>
    );
});

export default ActionCardRate;
