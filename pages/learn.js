import useSWR from 'swr';
import axios from 'axios';

const fetcher = async (url) => {
	const response = await axios.get(url);
	return response.data;
};

const RelatedAssets = () => {
	const currency = 'BTC';
	const { data, error } = useSWR(
		`https://min-api.cryptocompare.com/data/top/related/coins?fsym=${currency}`,
		fetcher
	);

	if (error) return <div>Error loading data.</div>;
	if (!data) return <div>Loading data...</div>;

	const relatedAssets = data.Data;

	console.log(data);

	return (
		<div>
			<h1>Related Assets for {currency}</h1>
			<ul>
				{/* {relatedAssets &&
					relatedAssets.map((asset) => (
						<li key={asset.CoinInfo.Id}>{asset.CoinInfo.FullName}</li>
					))} */}
			</ul>
		</div>
	);
};

export default RelatedAssets;
