import { formatPrice } from '@utils/formatPrice';
import { useEffect, useState, memo } from 'react';

import { getPriceShipByRetailerId } from '@api/priceShippingApi';

const ShippingPrice = memo(function ShippingPrice({ retailerId }) {
    const [priceShip, setPriceShip] = useState([]);

    useEffect(() => {
        getPriceShipByRetailerId(retailerId).then((res) => {
            setPriceShip(res.data.priceShipping);
        });
    }, [retailerId]);

    return (
        <>
            <div className="mt-4 space-y-2">
                {priceShip.length > 0 && (
                    <>
                        <p>Phí vận chuyển</p>
                        {priceShip.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-5"
                            >
                                <div className="flex flex-1 justify-between">
                                    <span>
                                        {item.range.from} - {item.range.to} km
                                    </span>
                                    <span>{formatPrice(item.price)}</span>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </>
    );
});

export default ShippingPrice;
