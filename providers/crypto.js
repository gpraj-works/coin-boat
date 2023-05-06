import axios from 'axios';
import useSWR from 'swr';

const fetcher = async (url, headers) => {
	const { data } = await axios.get(url, { headers });
	return data;
};

export const CoinRanking = (url) => {
	const headers = {
		// 'X-RapidAPI-Key': process.env.CRYPTO_API_KEY,
		// 'X-RapidAPI-Host': process.env.CRYPTO_API_HOST,
		'Content-Type': 'application/json',
		'x-access-token':
			'coinranking683a3800ea6b524245046cb1c56adcd942b7d11416e11eb0',
	};

	return useSWR(url, (url) => fetcher(url, headers), {
		refreshInterval: 30000,
	});
};

export const CryptoCompare = (url) => {
	const apiKey =
		'&api_key=954608c757c954c313e07c1afd191d26109f2c7a5c5048392ad5310110cd7cae';
	return useSWR(url, (url) => fetcher(url + apiKey), {
		refreshInterval: 30000,
	});
};
