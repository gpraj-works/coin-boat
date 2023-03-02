import { EatChips } from '@/components/components.utils';
import dbConnect from '@/config/dbConnect';
// import { getToken } from 'next-auth/jwt';

const login = async (req, res) => {
	const { method } = req;
	const client = await dbConnect;
	const db = client.db('users');
	const collection = db.collection('accounts');
	const query = req.body;
	const secret = process.env.SALT_FOR_CHIPS;

	if (method === 'POST') {
		try {
			const exist = await collection.findOne({ email: query.email });
			if (!exist || EatChips(exist.password) !== query.password) {
				res.status(401).json({
					success: false,
					message: 'Invalid email or password',
				});
			} else {
				if (!exist.isVerified) {
					res.status(400).json({
						success: false,
						message: 'Account not verified',
					});
				} else {
					try {
						res.status(200).json({ success: true, data: exist });
					} catch (error) {
						res.status(401).json({ success: false, data: error });
					}
				}
			}
		} catch (error) {
			res.status(400).json({ success: false, message: error });
		}
	}
};

export default login;
