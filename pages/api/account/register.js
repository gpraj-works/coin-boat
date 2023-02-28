import dbConnect from '@/config/dbConnect';

const register = async (req, res) => {
	const { method } = req;
	const client = await dbConnect;
	const db = client.db('users');
	const collection = db.collection('accounts');
	const query = req.body;

	switch (method) {
		case 'GET':
			try {
				const exist = await collection.findOne({ email: query.email });
				if (!exist || exist.password !== query.password) {
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
						res.status(200).json({ success: true, data: user });
					}
				}
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case 'POST':
			try {
				const exist = await collection.findOne({ email: query.email });
				if (!exist) {
					const result = await collection.insertOne(req.body);
					if (result.acknowledged) {
						res.status(200).json({ success: true, data: result });
					} else {
						res.status(500).json({
							success: false,
							message: 'Account registration failed. ',
						});
					}
				} else {
					res.status(409).json({
						success: false,
						message: 'Email id already exist!',
					});
				}
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		default:
			res.status(400).json({ success: false });
	}
};

export default register;
