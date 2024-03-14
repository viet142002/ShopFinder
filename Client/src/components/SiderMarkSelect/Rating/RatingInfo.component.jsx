import { memo, useEffect, useState } from 'react';
import { Rate, Row, Col, Divider, Button, Skeleton } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import ModalRating from '../../ModalRating/ModalRating.component';
import DisplayRates from '../../DisplayRate/DisplayRate.component';

import { getCountStarRatesApi } from '../../../api/RateApi';

const RatingInfo = memo(function RatingInfo({ info }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuth } = useSelector((state) => state.user);
    const { myRate } = useSelector((state) => state.rating);
    const [stars, setStars] = useState({
        values: [0, 0, 0, 0, 0],
        total: 0,
        overage: 0,
        isLoading: true
    });

    const handleOpenModal = () => {
        if (!isAuth) {
            navigate('/login');
            return;
        }
        dispatch({ type: 'rating/setShowModal', payload: { isShow: true } });
    };

    useEffect(() => {
        setStars((prev) => ({ ...prev, isLoading: true }));
        getCountStarRatesApi(info._id)
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
    }, [info._id]);

    return (
        <>
            <div className="space-y-2">
                <Row className="px-siderInfo">
                    {stars.isLoading ? (
                        <Skeleton active />
                    ) : (
                        <>
                            <Col span={15}>
                                {stars.values.map((item, index) => (
                                    <div
                                        className="flex items-center"
                                        key={index}
                                    >
                                        <span className="pr-2">
                                            {5 - index}
                                        </span>
                                        <div className="h-[8px] w-full rounded-md bg-gray-200">
                                            <div
                                                className="h-full rounded-md bg-yellow-500"
                                                style={{
                                                    width:
                                                        item !== 0
                                                            ? `${
                                                                  (item /
                                                                      stars.total) *
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
                                <p className="text-center">
                                    {stars.total} đánh giá
                                </p>
                            </Col>
                        </>
                    )}
                </Row>

                {!myRate && (
                    <div className="flex justify-center">
                        <Button onClick={handleOpenModal} htmlType="button">
                            Đánh giá
                        </Button>
                    </div>
                )}
            </div>
            <Divider style={{ margin: '16px 0px' }} />
            <DisplayRates id={info._id} />
            <ModalRating />
        </>
    );
});

export default RatingInfo;
