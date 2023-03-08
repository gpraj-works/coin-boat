import { EatChips, RequestOtp } from '@/components/components.utils';
import dbConnect from '@/config/dbConnect';
import jwt from 'jsonwebtoken';
// import nodemailer from 'nodemailer';
const sgMail = require('@sendgrid/mail');

const verify = async (req, res) => {
	const { method } = req;
	const client = await dbConnect;
	const db = client.db('users');
	const collection = db.collection('accounts');
	const query = req.body;
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);

	const OTP = RequestOtp();

	if (method === 'PUT') {
		const msg = {
			to: 'work.gpraj@gmail.com',
			from: 'gpraj@outlook.in',
			subject: 'Sending with SendGrid is Fun',
			text: 'and easy to do anywhere, even with Node.js',
			html: `OTP:<strong>${OTP}</strong>`,
		};

		(async () => {
			try {
				await sgMail.send(msg);
				const exist = await collection.findOne({ email: query.email });
				const updated = await collection.updateOne(
					{ _id: exist._id },
					{ $set: { otpCode: OTP } }
				);
				res.status(200).json({ success: true, data: updated });
			} catch (error) {
				res.status(401).json({ success: false, message: error });
			}
		})();
	}

	if (method === 'POST') {
		try {
			const exist = await collection.findOne({ email: EatChips(query.email) });
			if (exist.otpCode === query.otp) {
				const updated = await collection.updateOne(
					{ _id: exist._id },
					{ $set: { isVerified: true }, $unset: { otpCode: exist.otpCode } }
				);
				if (updated.acknowledged) {
					const token = jwt.sign(
						{ userId: exist._id },
						process.env.SALT_FOR_CHIPS,
						{
							expiresIn: '1h',
						}
					);
					res.setHeader(
						'Set-Cookie',
						`token=${token}; HttpOnly; Path=/dashboard; Max-Age=${60 * 60}`
					);
					res.status(200).json({ success: true, data: 'Verified' });
				}
			} else {
				res.status(401).json({ success: false, message: 'Invalid OTP' });
			}
		} catch (error) {
			res.status(401).json({ success: false, message: error });
		}
	}
};

export default verify;

// const transporter = nodemailer.createTransport({
// 	// port: process.env.MAILER_PORT,
// 	// host: process.env.MAILER_HOST,
// 	// auth: {
// 	// 	user: process.env.MAILER_EMAIL,
// 	// 	pass: process.env.MAILER_PASSWORD,
// 	// },
// 	// secure: false,
// });

// const mailData = {
// 	from: `Coinboat <gprajutr2@gmail.com>`,
// 	to: 'work.gpraj@gmail.com',
// 	subject: `Message From GP RAJ`,
// 	text: 'Sent from: gpraj@outlook.in',
// 	html: `<div>${OTP}</div>`,
// };

// transporter.sendMail(mailData, async (err, info) => {
// 	err && res.status(500).json({ success: false, message: err });
// 	info && res.status(200).json({ success: true, data: OTP });
// 	// const exist = await collection.findOne({ email: query.email });
// 	// const updated = await collection.updateOne(
// 	// 	{ _id: exist._id },
// 	// 	{ $set: { otpCode: OTP } }
// 	// );
// });