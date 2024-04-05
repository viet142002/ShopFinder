import { formatPrice } from '@utils/formatPrice';
import { useEffect, useState, memo } from 'react';

import { getPriceShipByRetailerId } from '@api/priceShippingApi';

const ShippingPrice = memo(function ShippingPrice({ retailerId }) {
    const [priceShip, setPriceShip] = useState();
    console.log('🚀 ~ ShippingPrice ~ priceShip:', priceShip);

    useEffect(() => {
        getPriceShipByRetailerId(retailerId).then((res) => {
            setPriceShip(res.data.priceShipping);
        });
    }, [retailerId]);

    return (
        <>
            <div className="mt-4 space-y-2">
                <p>Phí vận chuyển</p>
                {priceShip &&
                    priceShip.map((item, index) => (
                        <div key={index} className="flex items-center gap-5">
                            <div className="flex flex-1 justify-between">
                                <span>
                                    {item.range.from} - {item.range.to} km
                                </span>
                                <span>{formatPrice(item.price)}</span>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
});

export default ShippingPrice;
