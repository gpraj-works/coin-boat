import dbConnect from '@/config/dbConnect';

const watchlist = async (req, res) => {
	const { method } = req;
	const client = await dbConnect;
	const db = client.db('users');
	const collection = db.collection('accounts');
	const query = req.body;

	if (method === 'GET') {
		try {
			// const exist = await collection.findOne({ email: query.email });
			// const updated = await collection.updateOne(
			// 	{ _id: exist._id },
			// 	{ $set: { otpCode: OTP } }
			// );
			res.status(200).json({ success: true, data: 'updated' });
		} catch (error) {
			res.status(401).json({ success: false, message: error });
		}
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

export default watchlist;
