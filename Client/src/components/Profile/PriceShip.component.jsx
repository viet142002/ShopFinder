import { useEffect, useState } from 'react';
import { Button } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

import ModalAddRangePrice from '../Modal/ModalAddRangePrice/ModalAddRangePrice.component';

import { formatPrice } from '../../utils/formatPrice';
import { getPriceShip, deletePriceShip } from '../../api/priceShippingApi';

function PriceShip({ retailerId }) {
    const [priceShip, setPriceShip] = useState();
    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleDeletePriceShip = (id) => {
        deletePriceShip(id).then(() => {
            setPriceShip((prev) => {
                return prev.filter((item) => item._id !== id);
            });
        });
    };

    useEffect(() => {
        getPriceShip().then((res) => {
            setPriceShip(res.data.priceShipping);
        });
    }, [retailerId]);
    return (
        <>
            <div className="rounded-md bg-white p-4 shadow-md">
                <div className="space-x-2">
                    <h2 className="inline-block text-lg font-medium">
                        Phí vận chuyển
                    </h2>
                    <Button
                        type="text"
                        size="small"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            setIsOpenModal(true);
                        }}
                    />
                </div>

                <div className="mt-4 space-y-2">
                    {priceShip &&
                        priceShip.map((item, index) => (
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
                                <Button
                                    type="text"
                                    icon={<DeleteOutlined />}
                                    size="small"
                                    onClick={() =>
                                        handleDeletePriceShip(item._id)
                                    }
                                />
                            </div>
                        ))}
                </div>
            </div>

            <ModalAddRangePrice
                isOpenModal={isOpenModal}
                setIsOpenModal={setIsOpenModal}
                setPriceShip={setPriceShip}
                priceShip={priceShip}
            />
        </>
    );
}

export default PriceShip;
