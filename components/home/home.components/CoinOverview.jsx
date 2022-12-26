import { CoinChart } from './home.components';

const CoinOverview = () => {
	return (
		<div
			className='p-4 bg-gray-50 rounded-lg dark:bg-gray-800'
			id='overview'
			role='tabpanel'
			aria-labelledby='overview-tab'
		>
			<CoinChart />
		</div>
	);
};

export default CoinOverview;
