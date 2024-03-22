/*
    cart: [
        {
            distributor: {}
            items: [
                {
                    product: {}
                    quantity: {}
                }
            ]
        }
    ]
*/
import { useMemo } from 'react';
import { Button } from 'antd';
function CartTotal({ cart }) {
    const totalPrice = useMemo(() => {
        return cart.reduce((acc, item) => {
            console.log('tính lại');
            return (
                acc +
                item.items.reduce((acc, prod) => {
                    return acc + prod.product.price * prod.quantity;
                }, 0)
            );
        }, 0);
    }, [cart]);

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
            <Button type="primary" className="bg-blue-500">
                Thanh toán
            </Button>
        </div>
    );
}

export default CartTotal;
