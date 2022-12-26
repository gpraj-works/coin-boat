import React from 'react';
import useSWR from 'swr';
const fetcher = (url) => fetch(url).then((res) => res.json());

const CoinChart = () => {
	const { data, error } = useSWR(
		`https://api.coinranking.com/v2/coin/Qwsogvtv82FCd?${process.env.COIN_API_KEY}`,
		fetcher
	);

	if (error) return 'An error has occurred.';
	if (!data) return 'Loading...';

	console.log(data);
	return <div>CoinChart</div>;
};

export default CoinChart;
