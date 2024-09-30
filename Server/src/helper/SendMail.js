const nodemailer = require("nodemailer");

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;

// use gmail to send mail
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user,
		pass,
	},
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail({ to, subject, text, html }) {
  if (!user || !pass) {
    console.error("Please provide email credentials in .env file");
    return;
  }
	// send mail with defined transport object
	const info = await transporter.sendMail({
		from: `"ShopFinder 👻" <${user}>`, // sender address
		to, // list of receivers
		subject, // Subject line
		text, // plain text body
		html, // html body
	});

	console.log("Message sent: %s", info.messageId);
}

exports.sendMail = sendMail;
