const mongoose = require('mongoose');

const DetailPayment = new mongoose.Schema({
    // price in VND
    price: {
        type: Number,
        require,
    },
    // bank code of the bank that the customer used to pay
    bank_code: {
        type: String,
        require,
    },
    // bank transaction number
    bank_tran_no: {
        type: String,
    },
    // card type of the card that the customer used to pay
    card_type: {
        type: String,
        require,
    },
    // response code from VNPay
    response_code: {
        type: String,
        require,
    },
    // transaction number from VNPay
    transaction_no: {
        type: String,
        require,
    },
    // yyyyMMddHHmmss
    pay_date: {
        type: Number,
        require,
    },
});

const DetailPaymentModel = mongoose.model('DetailPayment', DetailPayment);

module.exports = DetailPaymentModel;
