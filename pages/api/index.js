import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/', async (req, res) => {
	const symbol = req.query.symbol || 'BTC-USDT';
	try {
		const response = await axios.get(
			`https://api.kucoin.com/api/v1/market/stats?symbol=${symbol}`
		);
		res.json(response.data);
	} catch (error) {
		console.error(error);
		res.status(error.response.status).json({ error: error.message });
	}
});

export default app;
