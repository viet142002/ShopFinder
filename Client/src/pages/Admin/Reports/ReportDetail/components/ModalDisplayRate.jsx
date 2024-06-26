import { Modal } from 'antd';
import { useEffect, useState } from 'react';

import { getRateByIdApi } from '~/api/RateApi';
import CardRate from '~/components/CardRate/CardRate.component';

export function ModalDisplayRate({ rateId, isOpen, onClose }) {
    const [rate, setRate] = useState(null);

    useEffect(() => {
        if (!rateId) return;
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
            {!rate ? (
                <div>
                    {!rateId ? (
                        <div>Không có dữ liệu</div>
                    ) : (
                        <div>Đang tải...</div>
                    )}
                </div>
            ) : (
                <CardRate {...rate} />
            )}
        </Modal>
    );
}

export default ModalDisplayRate;
