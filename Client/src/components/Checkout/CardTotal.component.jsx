import { Button } from 'antd';
import { useEffect } from 'react';

import MiniCartItem from '../CartItem/MiniCartItem.component';
import { calculateDistance } from '../../utils/calculateDistance';
import { getPriceShipById } from '../../api/priceShippingApi';

function CardTotal({ state, location, priceSipping, setPriceShipping }) {
    useEffect(() => {
        if (location.lat === 0 && location.lng === 0) return;
        setPriceShipping([]);
        for (let i = 0; i < state.cart.length; i++) {
            const distance = calculateDistance(
                {
                    lat: location.lat,
                    lng: location.lng
                },
                {
                    lat: state.cart[i].distributor.location.loc.coordinates[1],
                    lng: state.cart[i].distributor.location.loc.coordinates[0]
                }
            ).toFixed(2);
            getPriceShipById(state.cart[i].distributor._id, distance).then(
                (res) => {
                    setPriceShipping((prev) => [...prev, res.data]);
                }
            );
        }
    }, [location, state.cart, setPriceShipping]);
    return (
        <>
            <div className="space-y-2 rounded-lg bg-white p-2 shadow-lg">
                <h2 className="text-xl font-medium">Sản phẩm</h2>
                <div className="mx-4">
                    {state &&
                        state.cart[0] &&
                        state?.cart?.map((item) => {
                            return (
                                <div
                                    key={item.distributor._id}
                                    className="space-y-2"
                                >
                                    {item.items.map((prod) => {
                                        return (
                                            <MiniCartItem
                                                item={prod}
                                                key={prod.product._id}
                                                className="flex rounded-md p-2 shadow-md"
                                            />
                                        );
                                    })}
                                </div>
                            );
                        })}
                </div>
                <div>
                    <h2 className="text-xl font-medium">Thanh toán</h2>
                    <div className="ml-4">
                        <div className="flex justify-between">
                            <p>Giá sản phẩm</p>
                            <p>
                                {state?.totalPrice.toLocaleString('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND'
                                })}
                            </p>
                        </div>
                        <div>
                            <p>Phí vận chuyển</p>

                            {priceSipping.length > 0 && (
                                <div className="my-1 ml-4">
                                    {priceSipping.map((item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="flex justify-between"
                                            >
                                                <p>{item.retailer.name}</p>
                                                <p>
                                                    {item.price.toLocaleString(
                                                        'vi-VN',
                                                        {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        }
                                                    )}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                        <div className="flex justify-between">
                            <p>Tổng cộng</p>
                            <p>
                                {(
                                    priceSipping.reduce(
                                        (acc, cur) => acc + cur.price,
                                        0
                                    ) + state?.totalPrice
                                ).toLocaleString('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND'
                                })}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mx-auto w-fit">
                    <Button
                        htmlType="submit"
                        type="primary"
                        className="bg-blue-500"
                    >
                        Đặt hàng
                    </Button>
                </div>
            </div>
        </>
    );
}

export default CardTotal;
