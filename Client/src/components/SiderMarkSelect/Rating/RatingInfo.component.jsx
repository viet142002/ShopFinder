import { memo } from 'react';
import { Row, Divider } from 'antd';

import ModalRating from '~/components/Modal/ModalRating/ModalRating.component';
import DisplayRates from '~/components/DisplayRate/DisplayRate.component';
import RateTotal from '~/components/Rate/RateTotal/RateTotal.component';
import Rating from '~/components/Rate/Rating/Rating.component';

const RatingInfo = memo(function RatingInfo({ info }) {
    return (
        <>
            <div className="space-y-2">
                <Row className="px-4 md:px-sideBarMark">
                    <RateTotal locationId={info._id} />
                </Row>
                <Rating to={info._id} toType={info.informationType} />
            </div>
            <Divider style={{ margin: '16px 0px' }} />
            <DisplayRates id={info._id} />
            <ModalRating />
        </>
    );
});

export default RatingInfo;
