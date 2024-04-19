const nodemailer = require('nodemailer');
const user = 'marcelino.pouros37@ethereal.email';
const pass = 'MEq8t87Uwm6QGbHJ3N';

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: user,
        pass: pass,
    },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail({ to, subject, text, html }) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: `"ShopFinder 👻" <${user}>`, // sender address
        to, // list of receivers
        subject, // Subject line
        text, // plain text body
        html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

exports.sendMail = sendMail;
