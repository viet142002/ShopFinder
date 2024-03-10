// TODO: 'FEAT': 'Create fetch rating data from server'

import { Rate, Row, Col, Divider } from 'antd';

import ModalRating from './ModalRating/ModalRating.component';

function RatingInfo() {
    const items = [80, 10, 5, 5, 0];
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
                    <ModalRating />
                </div>
            </div>
            <Divider style={{ margin: '16px 0px' }} />
        </>
    );
}

export default RatingInfo;
