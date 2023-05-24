import axios from 'axios';
import useSWR from 'swr';
import Env from '@/config/envConfig';

const fetcher = async (url, headers) => {
	const { data } = await axios.get(url, { headers });
	return data;
};

export const CoinRanking = (url) => {
	const headers = {
		'Content-Type': 'application/json',
		'x-access-token': Env.Ranking.Key,
	};

	return useSWR(url, (url) => fetcher(url, headers), {
		refreshInterval: 30000,
	});
};

export const CryptoCompare = (url) => {
	const apiKey = '&api_key=' + Env.Compare.Key;
	return useSWR(url, (url) => fetcher(url + apiKey), {
		refreshInterval: 10000,
	});
};
