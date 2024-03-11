import { Avatar, Rate, Button } from 'antd';
import { useSelector } from 'react-redux';
import { LikeOutlined } from '@ant-design/icons';

function CardRate({ from, avatar, rate, ...values }) {
    console.log('🚀 ~ CardRate ~ values:', values);

    const user = useSelector((state) => state.user.data);

    return (
        <>
            <div className="flex items-center gap-2">
                <Avatar
                    size={38}
                    src={
                        import.meta.env.VITE_APP_API_URL +
                        (avatar ? avatar : '/images/avatar-default.png')
                    }
                />
                <div>
                    <h3>
                        {from?.firstname} {from?.lastname}
                    </h3>
                    <div>
                        <Rate value={rate} disabled className="text-sm" />
                    </div>
                    {new Date(values.createdAt).toLocaleDateString()}
                </div>
                <div></div>
            </div>
            <div>
                <p>{values.comment}</p>
            </div>
            <div>
                <Button icon={<LikeOutlined />} />
            </div>
        </>
    );
}

export default CardRate;
