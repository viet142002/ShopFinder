import {
    LikeOutlined,
    DislikeOutlined,
    LikeFilled,
    DislikeFilled
} from '@ant-design/icons';
import { Button } from 'antd';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { likeRateApi, dislikeRateApi } from '../../../api/RateApi';

import socket from '../../../socket';

const ActionCardRate = memo(function ActionCardRate({
    likes,
    dislikes,
    _id,
    userId
}) {
    const dispatch = useDispatch();
    const { firstname, lastname, avatar } = useSelector(
        (state) => state.user.data
    );

    const handleLike = () => {
        likeRateApi(_id).then((data) => {
            if (data.messageSocket) {
                socket.emit('notification', {
                    receiverId: data.rate.from._id,
                    _id: data.rate._id,
                    message: data.messageSocket,
                    type: 'RATE',
                    fromType: 'User',
                    from: {
                        avatar: avatar,
                        firstname: firstname,
                        lastname: lastname
                    },
                    createdAt: new Date()
                });
            }
            dispatch({
                type: 'rating/emotionalRate',
                payload: {
                    _id: _id,
                    likes: data.rate.likes,
                    dislikes: data.rate.dislikes
                }
            });
        });
    };
    const handleDislike = () => {
        dislikeRateApi(_id).then((data) => {
            dispatch({
                type: 'rating/emotionalRate',
                payload: {
                    _id: _id,
                    likes: data.likes,
                    dislikes: data.dislikes
                }
            });
        });
    };
    return (
        <>
            <div className="flex gap-2">
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
            </div>
        </>
    );
});

export default ActionCardRate;
