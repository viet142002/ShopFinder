import { useEffect, useState } from 'react';
import { Col, Rate, Skeleton } from 'antd';

import { getCountStarRatesApi } from '../../api/RateApi';

function RateTotal({ locationId, productId }) {
    const [stars, setStars] = useState({
        values: [0, 0, 0, 0, 0],
        total: 0,
        overage: 0,
        isLoading: true
    });

    useEffect(() => {
        if (locationId) {
            getCountStarRatesApi(locationId)
                .then((data) => {
                    setStars({
                        values: data.star.values,
                        total: data.star.total,
                        overage: data.star.overage,
                        isLoading: false
                    });
                })
                .catch(() => {
                    setStars({
                        isLoading: false
                    });
                });
        }
        if (productId) {
            getCountStarRatesApi(productId)
                .then((data) => {
                    setStars({
                        values: data.star.values,
                        total: data.star.total,
                        overage: data.star.overage,
                        isLoading: false
                    });
                })
                .catch(() => {
                    setStars({
                        isLoading: false
                    });
                });
        }
    }, [locationId, productId]);
    return (
        <>
            {stars.isLoading ? (
                <Skeleton active />
            ) : (
                <>
                    <Col span={15}>
                        {stars.values.map((item, index) => (
                            <div className="flex items-center" key={index}>
                                <span className="pr-2">{5 - index}</span>
                                <div className="h-[8px] w-full rounded-md bg-gray-200">
                                    <div
                                        className="h-full rounded-md bg-yellow-500"
                                        style={{
                                            width:
                                                item !== 0
                                                    ? `${
                                                          (item / stars.total) *
                                                          100
                                                      }%`
                                                    : '0%'
                                        }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </Col>

                    <Col span={8} offset={1}>
                        <h2 className="mb-2 text-center text-6xl">
                            {stars.overage}
                        </h2>
                        <div className="flex justify-center">
                            <Rate
                                className="text-sm"
                                value={stars.overage}
                                allowHalf
                                disabled={true}
                            />
                        </div>
                        <p className="text-center">{stars.total} đánh giá</p>
                    </Col>
                </>
            )}
        </>
    );
}

export default RateTotal;
