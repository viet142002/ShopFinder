import {
    LikeOutlined,
    DislikeOutlined,
    LikeFilled,
    DislikeFilled
} from '@ant-design/icons';
import { Button } from 'antd';
import { memo } from 'react';
import { useDispatch } from 'react-redux';

import { likeRateApi, dislikeRateApi } from '../../../api/RateApi';

const ActionCardRate = memo(function ActionCardRate({
    likes,
    dislikes,
    _id,
    userId
}) {
    const dispatch = useDispatch();

    const handleLike = () => {
        likeRateApi(_id).then((data) => {
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
