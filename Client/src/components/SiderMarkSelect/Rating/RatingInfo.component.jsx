import { memo } from 'react';
import { Row, Divider } from 'antd';

import ModalRating from '../../Modal/ModalRating/ModalRating.component';
import DisplayRates from '../../DisplayRate/DisplayRate.component';
import RateTotal from '../../Rate/RateTotal/RateTotal.component';
import Rating from '../../Rate/Rating/Rating.component';

const RatingInfo = memo(function RatingInfo({ info }) {
    return (
        <>
            <div className="space-y-2">
                <Row className="px-4 md:px-sideBarMark">
                    <RateTotal locationId={info._id} />
                </Row>
                <Rating />
            </div>
            <Divider style={{ margin: '16px 0px' }} />
            <DisplayRates id={info._id} />
            <ModalRating
                title={info.name}
                to={info._id}
                toType={info.informationType}
            />
        </>
    );
});

export default RatingInfo;
