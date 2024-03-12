// TODO: 'FEAT': 'Create fetch rating data from server'
import { memo, useState } from 'react';
import { Rate, Row, Col, Divider, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import ModalRating from '../../ModalRating/ModalRating.component';
import DisplayRates from '../../DisplayRate/DisplayRate.component';

const RatingInfo = memo(function RatingInfo({ info }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuth } = useSelector((state) => state.user);
    const [rates, setRates] = useState([]);
    const items = [80, 10, 5, 5, 0];

    const handleOpenModal = () => {
        if (!isAuth) {
            navigate('/login');
            return;
        }
        dispatch({ type: 'rating/setShowModal', payload: { isShow: true } });
    };

    return (
        <>
            <div className="space-y-2">
                <Row className="px-siderInfo">
                    <Col span={15}>
                        {items.map((item, index) => (
                            <div className="flex items-center" key={index}>
                                <span className="pr-2">{5 - index}</span>
                                <div className="bg-gray-200 w-full h-[8px] rounded-md">
                                    <div
                                        className="bg-yellow-500 h-full rounded-md"
                                        style={{
                                            width: `${item}%`
                                        }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </Col>

                    <Col span={8} offset={1}>
                        <h2 className="text-6xl text-center mb-2">4.4</h2>
                        <div className="flex justify-center">
                            <Rate
                                className="text-sm"
                                defaultValue={4.5}
                                allowHalf
                                disabled={true}
                            />
                        </div>
                        <p className="text-center">4000 đánh giá</p>
                    </Col>
                </Row>

                <div className="flex justify-center">
                    <Button onClick={handleOpenModal} htmlType="button">
                        Đánh giá
                    </Button>
                </div>
            </div>
            <Divider style={{ margin: '16px 0px' }} />
            <DisplayRates id={info._id} rates={rates} setRates={setRates} />
            <ModalRating />
        </>
    );
});

export default RatingInfo;
