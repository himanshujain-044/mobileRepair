const nodemailer = require("nodemailer");

module.exports.sendMail = async (mailTo, mailSubject, mailMessage) => {
	try {
		const Transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 587,
			secure: false,
			requireTLS: true,
			auth: {
				user: process.env.MAIL_ACCOUNT_USER,
				pass: process.env.MAIL_ACCOUNT_PASSWORD,
			},
			tls: {
				rejectUnauthorized: true,
			},
		});
		const Message = {
			from: 'himanshujain044@gmail.com',
			to: mailTo,
			subject: mailSubject,
			html: mailMessage,
		};
		await Transporter.sendMail(Message);
	} catch (err) {
		throw new Error(err.message);
	}
};
