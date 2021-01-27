const nodemailer = require('nodemailer')

exports.transporter = async (to, cc, subject, text) => {

	let mailConfig = {
		host: process.env.MAIL_HOST,
		port: process.env.MAIL_PORT,
		secure: false,
		requireTLC: true,
		auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_PASS,
		}
	}

	let mailOptions = {
		from: process.env.MAIL_USER,
		to: to,
		cc: cc,
		subject: subject,
		text: text
	}

	let transporter = nodemailer.createTransport(mailConfig)

	await transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			return console.log(error)
		}
		console.log('Message sent: ' + info.response)
	})

}