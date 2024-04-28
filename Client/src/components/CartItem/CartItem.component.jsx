import { useEffect, useState } from 'react';
import { Button, Image, Checkbox } from 'antd';

import { DeleteOutlined } from '@ant-design/icons';

import InputQuantity from '../Input/InputQuantity/InputQuantity.component';

import { updateCartApi, removeFromCartApi } from '../../api/cartApi';

function CartItem({ item, setCart, setChecked }) {
    const [changeQuantity, setChangeQuantity] = useState({
        productId: '',
        quantity: 0
    });

    const handleRemove = (productId) => {
        removeFromCartApi({ productId }).then(() => {
            setCart((prev) => {
                const newCart = prev.map((cartItem) => {
                    const newItems = cartItem.items.filter(
                        (prod) => prod.product._id !== productId
                    );
                    return { ...cartItem, items: newItems };
                });

                return newCart.filter((cartItem) => cartItem.items.length > 0);
            });
        });
    };

    const handleChecked = (productId) => {
        setCart((prev) => {
            const newCart = prev.map((cartItem) => {
                const newItems = cartItem.items.map((prod) => {
                    if (prod.product._id === productId) {
                        if (prod.isChecked) {
                            setChecked((prev) =>
                                prev.filter((id) => id !== productId)
                            );
                        } else {
                            setChecked((prev) => [...prev, productId]);
                        }
                        return { ...prod, isChecked: !prod.isChecked };
                    }
                    return prod;
                });
                return { ...cartItem, items: newItems };
            });

            return newCart;
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
            <div className="mb-3">
                <h2 className="mb-1 text-lg font-medium">
                    {item.distributor.name}
                </h2>
                {item.items.map((prod) => {
                    return (
                        <div
                            key={prod._id}
                            className="mt-2 grid grid-cols-6 items-center justify-between gap-2 px-2"
                        >
                            <div className="col-span-2 flex items-center gap-4 md:col-span-1">
                                <Checkbox
                                    onChange={() =>
                                        handleChecked(prod.product._id)
                                    }
                                    disabled={
                                        prod.product.status === 'sold-out' ||
                                        prod.product.status === 'stop' ||
                                        prod.product.distributor.status ===
                                            'blocked' ||
                                        prod.product.status === 'blocked'
                                    }
                                />
                                <div className="relative flex h-full w-full items-center">
                                    <Image
                                        width={'100%'}
                                        height={80}
                                        className="object-cover"
                                        src={
                                            import.meta.env.VITE_APP_API_URL +
                                            prod.product.images[0].path
                                        }
                                    />
                                    {prod.product.discount > 0 && (
                                        <div className="absolute left-0 top-2 bg-gray-50 opacity-60">
                                            -{prod.product.discount}%
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-span-4 flex h-full md:col-span-5">
                                <div className="flex flex-col justify-between">
                                    <h3 className="text-lg font-medium">
                                        {prod.product.name}{' '}
                                        {prod.product.status === 'sold-out' && (
                                            <span className="text-red-500">
                                                (Hết hàng)
                                            </span>
                                        )}
                                        {prod.product.status === 'stop' && (
                                            <span className="text-red-500">
                                                (Ngừng kinh doanh)
                                            </span>
                                        )}
                                        {(prod.product.distributor.status ===
                                            'blocked' ||
                                            prod.product.status ===
                                                'blocked') && (
                                            <span className="text-red-500">
                                                (Bị chặn)
                                            </span>
                                        )}
                                    </h3>
                                    <div className="items-center md:flex md:gap-2">
                                        <InputQuantity
                                            productId={prod.product._id}
                                            value={prod.quantity}
                                            productQuantity={
                                                prod.product.quantity
                                            }
                                            setChangeQuantity={
                                                setChangeQuantity
                                            }
                                        />
                                        <p className="text-lg text-red-600">
                                            {prod.product.discount > 0 ? (
                                                <>
                                                    <span>
                                                        {(
                                                            prod.product.price *
                                                            (1 -
                                                                prod.product
                                                                    .discount /
                                                                    100)
                                                        ).toLocaleString(
                                                            'vi-VN',
                                                            {
                                                                style: 'currency',
                                                                currency: 'VND'
                                                            }
                                                        )}
                                                    </span>
                                                    <span className="ml-2 text-sm line-through">
                                                        {prod.product.price.toLocaleString(
                                                            'vi-VN',
                                                            {
                                                                style: 'currency',
                                                                currency: 'VND'
                                                            }
                                                        )}
                                                    </span>
                                                </>
                                            ) : (
                                                prod.product.price.toLocaleString(
                                                    'vi-VN',
                                                    {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    }
                                                )
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <div className="ml-auto flex shrink-0 items-center">
                                    <Button
                                        icon={<DeleteOutlined />}
                                        onClick={() =>
                                            handleRemove(prod.product._id)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default CartItem;
