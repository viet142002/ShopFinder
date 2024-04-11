const DetailPayment = require('../models/detailPaymentModel');

const detailPaymentController = {
    create: async data => {
        const {
            price,
            bank_code,
            bank_tran_no,
            card_type,
            pay_date,
            responseCode,
            transactionNo,
        } = data;
        if (
            !price ||
            !bank_code ||
            !card_type ||
            !pay_date ||
            !responseCode ||
            !transactionNo
        ) {
            throw new Error('Missing required fields');
        }
        const detailPayment = new DetailPayment({
            price,
            bank_code,
            bank_tran_no,
            card_type,
            pay_date,
            response_code: responseCode,
            transaction_no: transactionNo,
        });
        await detailPayment.save();
        return detailPayment;
    },
};

module.exports = detailPaymentController;
