import useSWR from 'swr';

const fetcher = async (url) => {
	const options = {
		headers: {
			'X-RapidAPI-Key': process.env.CRYPTO_API_KEY,
			'X-RapidAPI-Host': process.env.CRYPTO_API_HOST,
		},
	};
	return await fetch(url, options).then((res) => res.json());
};

export const CryptoFetch = (url) =>
	useSWR(url, fetcher, { refreshInterval: 1000 });
