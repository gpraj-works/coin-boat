import useSWR from 'swr';
import axios from 'axios';
const fetcher = async (url) => {
	const response = await axios.get(url);
	return response.data;
};
const url = 'https://api.binance.com/api/v3/ticker/price';

const About = () => {
	const { data, error } = useSWR(url, fetcher, {
		refreshInterval: 5000,
	});

	if (error) return <div>Failed to load data</div>;
	if (!data) return <div>Loading...</div>;

	return (
		<div>
			{data.map((item) => (
				<div key={item.symbol}>
					{item.symbol}: {item.price}
				</div>
			))}
		</div>
	);
};

export default About;
