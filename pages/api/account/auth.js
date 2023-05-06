import { EatChips } from '@/components/utilities/Crypt';
const jwt = require('jsonwebtoken');

const auth = async (req, res) => {
	const { method } = req;
	const query = req.query;
	const secret = process.env.SALT_FOR_CHIPS;

	if (method === 'GET') {
		try {
			const user = jwt.verify(query.token, secret);
			res.status(200).json({ success: true, data: user });
		} catch (err) {
			res.status(200).json({ success: false, message: err });
		}
	}
};

export default auth;
