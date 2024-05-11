import { Card } from 'antd';
import { Link } from 'react-router-dom';

import { formatTime } from '~/utils/index';

export default function CardStore({ store }) {
    return (
        <Link to={`/stores/${store._id}`}>
            <Card
                hoverable
                className="h-full w-full"
                cover={
                    <img
                        alt="example"
                        loading="lazy"
                        className="h-[300px] w-full object-cover"
                        src={`${import.meta.env.VITE_APP_API_URL}${
                            store.images[0].path
                        }`}
                    />
                }
            >
                <Card.Meta
                    title={store.name}
                    description={
                        <span className="text-base text-black">
                            {formatTime(store.createdAt)}
                        </span>
                    }
                />
            </Card>
        </Link>
    );
}
