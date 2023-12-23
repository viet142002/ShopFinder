const router = require('express').Router();
const nodemailer = require('nodemailer');

const { authentication } = require('../../middlewares/authMiddleware');

router.use('/products', require('./productRouter'));
router.use('/cart', authentication, require('./cartRouter'));
router.use('/rate', require('./rateRouter'));
router.use('/comment', require('./commentRouter'));
router.use('/order', authentication, require('./orderRouter'));
router.use('/profile', authentication, require('./profileRouter'));
router.use('/home', require('./homeRouter'));

router.post('/email', async (req, res) => {
  const order = req.body.order;
  console.log(req.body.order);

  if (!order) return res.json({ msg: 'fail' });

  const htmlEmail = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333;">Clothing Shop</h1>
      <img src="https://i.pinimg.com/564x/5d/dd/5b/5ddd5bbd53f9e0b4dc367e0d938b565b.jpg">
      <h1 style="color: #333;">Cám ơn bạn đã mua hàng của chúng tôi</h1>
      <p style="color: #555;">Chúng tôi chuẩn bị và giao hàng đến bạn sơm nhất có thể.</p>

       <h2>Thông tin người nhận</h2>
      <table>
        <tr>
          <td style="text-align: right;">Họ tên:</td>
          <td style="padding-left: 20px;">${order.full_name}</td>
        </tr>
        <tr>
          <td style="text-align: right;">Số điện thoại:</td>
          <td style="padding-left: 20px;">${order.phone}</td>
        </tr>
        <tr>
          <td style="text-align: right;">Địa chỉ giao hàng:</td>
          <td style="padding-left: 20px;">${order.address}</td>
        </tr>
        <tr>
          <td style="text-align: right;">Phương thức thanh toán:</td>
          <td style="padding-left: 20px;">${
            order.payment === 'COD'
              ? 'Thanh toán khi nhận hàng'
              : 'Thanh toán qua VNPay'
          }</td>
        </tr>
      </table>
      <h2 style="color: #333;">Đơn hàng của bạn</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr style="background-color: #EBE3D5">
            <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Tên sản phẩm</th>
            <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Số lượng</th>
            <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Khuyến mãi</th>
            <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Giá</th>
            <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Tổng</th>
          </tr>
        </thead>
        <tbody>
          ${order.detail
            .map(
              (item, index) => `
            <tr ${index % 2 === 0 ? `style="background-color: #F3EEEA"` : ``}>
              <td style="border: 1px solid #ddd; padding: 10px;">${
                item.product.title
              }</td>
              <td style="border: 1px solid #ddd; padding: 10px;">${
                item.quantity
              }</td>
              <td style="border: 1px solid #ddd; padding: 10px;">${
                item.sale
              }%</td>
              <td style="border: 1px solid #ddd; padding: 10px;">${item.price.toLocaleString(
                'vi-VN'
              )}</td>
              <td style="border: 1px solid #ddd; padding: 10px;">${(
                item.price *
                item.quantity *
                (1 - item.sale / 100)
              ).toLocaleString('vi-VN')}</td>
            </tr>
          `
            )
            .join('')}
          <tr>
            <td colspan="4" style="border: 1px solid #ddd; padding: 10px; text-align: right; border-right: none;">Tổng tiền</td>
            <td style="border: 1px solid #ddd; padding: 10px; border-left: none;">${order.price.toLocaleString(
              'vi-VN'
            )}</td>
          </tr>
        </tbody>
      </table>
    </div> 
`;

  // Step 1
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  // Step 2
  const mailOptions = {
    from: process.env.EMAIL,
    to: req.body.email,
    subject: 'Cảm ơn đã mua hàng của chúng tôi',
    text: 'Cảm ơn bạn đã mua hàng của chúng tôi',
    html: htmlEmail,
  };

  // Step 3
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log({ err });
      return res.json({ msg: 'fail' });
    }
    return res.json({ msg: 'success' });
  });
});

module.exports = router;
