import { useNavigate, useSearchParams } from 'react-router-dom';

import { addDetailPayment } from '@api/orderApi';
import { useEffect } from 'react';

const update = async (id, data) => {
    await addDetailPayment(id, data);
};

function VNPayReturn() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const orderId = searchParams.get('orderId');

    useEffect(() => {
        const data = {
            price: searchParams.get('vnp_Amount'),
            bank_code: searchParams.get('vnp_BankCode'),
            bank_tran_no: searchParams.get('vnp_BankTranNo'),
            card_type: searchParams.get('vnp_CardType'),
            pay_date: searchParams.get('vnp_PayDate'),
            responseCode: searchParams.get('vnp_ResponseCode'),
            transactionNo: searchParams.get('vnp_TransactionNo')
        };
        if (searchParams.get('vnp_ResponseCode') === '00') {
            update(orderId, {
                status: 'pending',
                detailPaymentData: data
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
        <>
            <h1>VNPay return</h1>
            <h1>hello</h1>
        </>
    );
}

export default VNPayReturn;
