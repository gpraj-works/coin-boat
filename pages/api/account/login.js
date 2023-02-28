import { EatChips } from '@/components/components.utils';
import dbConnect from '@/config/dbConnect';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
	const { method } = req;
	const client = await dbConnect;
	const db = client.db('users');
	const collection = db.collection('accounts');
	const query = req.body;

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
					const user = await collection.find().toArray();
					const token = jwt.sign(
						{ userId: user[0]._id },
						process.env.SALT_FOR_CHIPS,
						{
							expiresIn: '1h',
						}
					);
					res.status(200).json({ success: true, data: token });
				}
			}
		} catch (error) {
			res.status(400).json({ success: false });
		}
	}
};

export default login;
