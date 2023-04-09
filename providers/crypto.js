import axios from 'axios';
import useSWR from 'swr';

const headers = {
	'X-RapidAPI-Key': process.env.CRYPTO_API_KEY,
	'X-RapidAPI-Host': process.env.CRYPTO_API_HOST,
};

const fetcher = async (url, headers) => {
	const { data } = await axios.get(url, { headers });
	return data;
};

export const CryptoFetch = (url) => {
	return useSWR(url, (url) => fetcher(url, headers), {
		refreshInterval: 10000,
	});
};
