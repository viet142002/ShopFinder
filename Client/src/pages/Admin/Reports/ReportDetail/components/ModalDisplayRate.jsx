import { Modal } from 'antd';
import { useEffect, useState } from 'react';

import { getRateByIdApi } from '@api/RateApi';
import CardRate from '@components/CardRate/CardRate.component';

function ModalDisplayRate({ rateId, isOpen, onClose }) {
    const [rate, setRate] = useState(null);

    useEffect(() => {
        getRateByIdApi(rateId).then((res) => {
            setRate(res.data.rate);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rateId]);

    return (
        <Modal
            title="Chi tiết đánh giá"
            open={isOpen}
            onCancel={onClose}
            footer={null}
        >
            {!rate ? <div>Loading...</div> : <CardRate {...rate} />}
        </Modal>
    );
}

export default ModalDisplayRate;
