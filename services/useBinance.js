import useSWR from 'swr';
import axios from 'axios';
import { API_KEY, SECRET_KEY } from '@/config/binance';

const fetcher = async (url) => {
	const response = await axios.get(url);
	return response.data;
};

const useBinance = () => {
	const { data, error } = useSWR(
		'https://api.binance.com/api/v3/exchangeInfo',
		fetcher
	);

	return {
		symbols: data?.symbols,
		isLoading: !error && !data,
		isError: error,
	};
};

export default useBinance;
