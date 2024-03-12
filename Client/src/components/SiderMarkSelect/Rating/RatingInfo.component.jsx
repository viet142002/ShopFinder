// TODO: 'FEAT': 'Create fetch rating data from server'
import { memo, useEffect, useState } from 'react';
import { Rate, Row, Col, Divider, Button } from 'antd';
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
        overage: 0
    });

    const handleOpenModal = () => {
        if (!isAuth) {
            navigate('/login');
            return;
        }
        dispatch({ type: 'rating/setShowModal', payload: { isShow: true } });
    };

    useEffect(() => {
        getCountStarRatesApi(info._id).then((data) => {
            setStars(data.star);
        });
    }, [info._id]);

    return (
        <>
            <div className="space-y-2">
                <Row className="px-siderInfo">
                    <Col span={15}>
                        {stars.values.map((item, index) => (
                            <div className="flex items-center" key={index}>
                                <span className="pr-2">{5 - index}</span>
                                <div className="bg-gray-200 w-full h-[8px] rounded-md">
                                    <div
                                        className="bg-yellow-500 h-full rounded-md"
                                        style={{
                                            width: `${
                                                (item / stars.total) * 100
                                            }%`
                                        }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </Col>

                    <Col span={8} offset={1}>
                        <h2 className="text-6xl text-center mb-2">
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
