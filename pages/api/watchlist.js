import dbConnect from '@/config/dbConnect';
import { ObjectId } from 'mongodb';

const watchlist = async (req, res) => {
	const { method } = req;
	const client = await dbConnect;
	const db = client.db('users');
	const collection = db.collection('watchlist');
	const query = req.body;
	const params = req.query;

	if (method === 'GET') {
		try {
			const exist = await collection.findOne({
				userId: new ObjectId(params.userId),
			});
			res.status(200).json({ success: true, data: exist });
		} catch (error) {
			res.status(200).json({ success: false, message: 'id not valid' });
		}
	}
	if (method === 'POST') {
		try {
			const existUser = await collection.findOne({
				userId: new ObjectId(query.userId),
			});
			if (existUser) {
				const updated = await collection.updateOne(
					{ _id: existUser._id },
					Object.keys(existUser)[Object.keys(existUser).indexOf(query.coinId)]
						? {
								$unset: {
									[query.coinId]: {
										symbol: query.coinSymbol,
										name: query.coinName,
									},
								},
						  }
						: {
								$set: {
									[query.coinId]: {
										symbol: query.coinSymbol,
										name: query.coinName,
									},
								},
						  }
				);
				if (updated.acknowledged) {
					res.status(200).json({ success: true, data: updated });
				} else {
					res.status(400).json({ success: false, message: 'not updated' });
				}
			} else {
				const inserted = await collection.insertOne({
					userId: new ObjectId(query.userId),
					[query.coinId]: {
						symbol: query.coinSymbol,
						name: query.coinName,
					},
				});
				if (inserted.acknowledged) {
					res.status(200).json({ success: true, data: inserted });
				} else {
					res.status(400).json({ success: false, message: 'not inserted' });
				}
			}
		} catch (error) {
			res.status(400).json({ success: false, message: 'not processed' });
		}
	}
};

export default watchlist;
