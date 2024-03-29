import { Card } from 'antd';
import { Link } from 'react-router-dom';

import { formatPrice } from '../../utils/formatPrice';

function CardProduct({ product }) {
    return (
        <Link to={`./${product._id}`}>
            <Card
                hoverable
                className="h-full w-full"
                cover={
                    <img
                        alt="example"
                        loading="lazy"
                        className="h-[200px] w-full object-cover md:h-[300px] "
                        src={`${import.meta.env.VITE_APP_API_URL}${
                            product.images[0].path
                        }`}
                    />
                }
            >
                <Card.Meta
                    title={product.name}
                    description={
                        <span className="text-lg font-bold">
                            {formatPrice(product.price)}
                        </span>
                    }
                />
            </Card>
        </Link>
    );
}

export default CardProduct;
