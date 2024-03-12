import { LikeOutlined } from '@ant-design/icons';
import { Button } from 'antd';

function ActionCardRate({ likes, dislikes, _id }) {
    const handleLike = () => {
        console.log('like', _id);
    };
    const handleDislike = () => {
        console.log('dislike', _id);
    };
    return (
        <>
            <div className="flex gap-2">
                <div>
                    <Button
                        icon={<LikeOutlined />}
                        shape="circle"
                        onClick={handleLike}
                        className="border-none"
                    />
                    <span>{likes?.count}</span>
                </div>
                <div>
                    <Button
                        icon={<LikeOutlined />}
                        shape="circle"
                        className="border-none"
                        onClick={handleDislike}
                    />
                    <span>{dislikes?.count}</span>
                </div>
            </div>
        </>
    );
}

export default ActionCardRate;
