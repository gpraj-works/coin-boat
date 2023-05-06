import useSWR from 'swr';
import axios from 'axios';
import { GetCrypto } from '@/services/crypto.api';

const fetcher = async (url) => {
	const response = await axios.get(url);
	return response.data;
};

const CryptoPrices = () => {
	const Crypto = new GetCrypto();

	const { data, error } = Crypto.History24h({ limit: '', refCurrency: '' });

	if (error) return <div>Error loading data</div>;
	if (!data) return <div>Loading data...</div>;

	console.log(error);

	const {
		Data: { Data: prices },
	} = data;

	const high = Math.max(...prices.map((p) => p.high));
	const low = Math.min(...prices.map((p) => p.low));

	return (
		<div>
			<p>24-hour high: {high}</p>
			<p>24-hour low: {low}</p>
		</div>
	);
};

export default CryptoPrices;
