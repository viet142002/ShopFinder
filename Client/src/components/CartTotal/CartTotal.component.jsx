import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { Button } from 'antd';

import { calculatePrice } from '../../utils/calculatePrice';
function CartTotal({ cart, checked }) {
    const totalPrice = useMemo(() => calculatePrice(cart), [cart]);

    return (
        <div>
            <h2>Tổng cộng</h2>
            <h3>
                Thành tiền:
                <span className="ml-2 text-lg font-medium text-red-400">
                    {totalPrice.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                    })}
                </span>
            </h3>
            <div className="mx-auto mt-4 w-fit">
                <Link
                    to="/checkout"
                    state={{
                        cart: cart
                            .map((item) => {
                                return {
                                    distributor: item.distributor,
                                    items: item.items.filter((prod) =>
                                        checked.includes(prod.product._id)
                                    )
                                };
                            })
                            .filter((item) => item.items.length > 0),
                        totalPrice
                    }}
                >
                    <Button
                        type="primary"
                        className="bg-blue-500"
                        disabled={checked.length === 0}
                    >
                        Thanh toán
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default CartTotal;
