import { useState } from 'react';
import { Button } from 'antd';

import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';

function InputQuanTity({
    productQuantity,
    setChangeQuantity,
    value,
    productId
}) {
    const [quantity, setQuantity] = useState(value);

    const handleIncrease = () => {
        if (quantity < productQuantity) {
            setQuantity(quantity + 1);
            setChangeQuantity({ productId, quantity: quantity + 1 });
        }
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            setChangeQuantity({ productId, quantity: quantity - 1 });
        }
    };

    return (
        <div className="inline-block">
            <div className="flex justify-center rounded-md border">
                <Button
                    icon={<CaretLeftOutlined />}
                    className="border-none"
                    onClick={handleDecrease}
                />
                <input
                    value={quantity}
                    type="Number"
                    disabled
                    className="max-w-[30px]"
                />
                <Button
                    icon={<CaretRightOutlined />}
                    className="border-none"
                    onClick={handleIncrease}
                />
            </div>
        </div>
    );
}

export default InputQuanTity;
