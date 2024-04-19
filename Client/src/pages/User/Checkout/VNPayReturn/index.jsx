import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Spin } from 'antd';

import { addDetailPayment } from '@api/orderApi';

const update = async (id, data) => {
    await addDetailPayment(id, data);
};

function VNPayReturn() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const orderId = searchParams.get('orderId');

    useEffect(() => {
        if (!orderId) {
            navigate('/');
            return;
        }
        const data = {
            price: searchParams.get('vnp_Amount'),
            bank_code: searchParams.get('vnp_BankCode'),
            bank_tran_no: searchParams.get('vnp_BankTranNo'),
            card_type: searchParams.get('vnp_CardType'),
            pay_date: searchParams.get('vnp_PayDate'),
            responseCode: searchParams.get('vnp_ResponseCode'),
            transactionNo: searchParams.get('vnp_TransactionNo')
        };
        if (searchParams?.get('vnp_ResponseCode') == '00') {
            update(orderId, {
                status: 'pending',
                detailPaymentData: data,
                isPaid: true
            }).then(() => {
                navigate('/');
            });
            // update order status to pending
        } else {
            // update order status to fail paid
            update(orderId, {
                status: 'cancelled',
                detailPaymentData: data
            }).then(() => {
                navigate('/order/payment-fail');
            });
        }
    }, [orderId, navigate, searchParams]);

    return (
        <div className="absolute left-1/2 top-1/2 h-20 w-full -translate-x-1/2">
            <Spin
                tip="Đang xác thực..."
                size="large"
                style={{
                    margin: '0px'
                }}
            >
                <div className="content" />
            </Spin>
        </div>
    );
}

export default VNPayReturn;
