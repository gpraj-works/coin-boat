import useSWR from 'swr';
import axios from 'axios';

const fetcher = async (url) => {
	const response = await axios.get(url);
	return response.data;
};

const Historical = () => {
	const { data, error } = useSWR(
		'https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=7&aggregate=1&e=CCCAGG',
		fetcher
	);

	if (error) return <div>Error loading data</div>;
	if (!data) return <div>Loading data...</div>;

	const {
		Data: { Data: prices },
	} = data;

	const dateLabels = prices.map((p) =>
		new Date(p.time * 1000).toLocaleDateString()
	);
	const openPrices = prices.map((p) => p.open);
	const highPrices = prices.map((p) => p.high);
	const lowPrices = prices.map((p) => p.low);
	const closePrices = prices.map((p) => p.close);

	return (
		<div>
			<h2>Bitcoin Price History (Last 7 days)</h2>
			<table>
				<thead>
					<tr>
						<th>Date</th>
						<th>Open</th>
						<th>High</th>
						<th>Low</th>
						<th>Close</th>
					</tr>
				</thead>
				<tbody>
					{prices.map((p, i) => (
						<tr key={p.time}>
							<td>{dateLabels[i]}</td>
							<td>{openPrices[i]}</td>
							<td>{highPrices[i]}</td>
							<td>{lowPrices[i]}</td>
							<td>{closePrices[i]}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Historical;
