import { useEffect, useState } from 'react';
import { Button, Image } from 'antd';

import { DeleteOutlined } from '@ant-design/icons';

import InputQuantity from '../InputQuantity/InputQuantity.component';

import { updateCartApi, removeFromCartApi } from '../../api/cartApi';

function CartItem({ item, setCart }) {
    const [changeQuantity, setChangeQuantity] = useState({
        productId: '',
        quantity: 0
    });

    const handleRemove = (productId) => {
        removeFromCartApi({ productId }).then((res) => {
            setCart((prev) => {
                const newCart = prev.map((cartItem) => {
                    const newItems = cartItem.items.filter(
                        (prod) => prod.product._id !== productId
                    );
                    return { ...cartItem, items: newItems };
                });

                return newCart.filter((cartItem) => cartItem.items.length > 0);
            });
            console.log(res.data);
        });
    };

    useEffect(() => {
        if (changeQuantity.productId === '') return;
        const timeOutId = setTimeout(() => {
            updateCartApi(changeQuantity).then(() => {
                setCart((prev) => {
                    const newCart = prev.map((cartItem) => {
                        const newItems = cartItem.items.map((prod) => {
                            if (prod.product._id === changeQuantity.productId) {
                                return {
                                    ...prod,
                                    quantity: changeQuantity.quantity
                                };
                            }
                            return prod;
                        });
                        return { ...cartItem, items: newItems };
                    });

                    return newCart;
                });
            });
        }, 1000);

        return () => {
            clearTimeout(timeOutId);
        };
    }, [changeQuantity, setCart]);
    return (
        <>
            <div>
                <h2 className="mb-1 text-lg font-medium">
                    {item.distributor.name}
                </h2>
                {item.items.map((prod) => {
                    return (
                        <div
                            key={prod._id}
                            className="grid grid-cols-6 items-center justify-between gap-2 px-2"
                        >
                            <div className="relative">
                                <Image
                                    width={100}
                                    src={
                                        import.meta.env.VITE_APP_API_URL +
                                        prod.product.images[0].path
                                    }
                                />
                                {prod.product.discount > 0 && (
                                    <div className="left-0 top-2">
                                        {prod.product.price.toLocaleString(
                                            'vi-VN',
                                            {
                                                style: 'currency',
                                                currency: 'VND'
                                            }
                                        )}
                                    </div>
                                )}
                            </div>
                            <h3 className="col-span-2 text-lg font-medium">
                                {prod.product.name}
                            </h3>
                            <div>
                                <InputQuantity
                                    productId={prod.product._id}
                                    value={prod.quantity}
                                    productQuantity={prod.product.quantity}
                                    setChangeQuantity={setChangeQuantity}
                                />
                            </div>
                            <p className="text-center">
                                {prod.product.price.toLocaleString('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND'
                                })}
                            </p>
                            <div className="ml-auto">
                                <Button
                                    icon={<DeleteOutlined />}
                                    onClick={() =>
                                        handleRemove(prod.product._id)
                                    }
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default CartItem;
