import localeString from 'components/components.utils';

const ExploreStats = ({
	totalCoins,
	totalExchanges,
	totalMarkets,
	totalMarketCap,
}) => {
	return (
		<>
			<div className='shadow-sm md:w-[25%] w-[45%] md:mx-3 px-5 py-3 my-3 bg-white rounded-md dark:bg-gray-700 dark:text-gray-400'>
				<h2 className='font-medium'>Total Coins</h2>
				<p>{localeString(totalCoins)}</p>
			</div>
			<div className='shadow-sm md:w-[25%] w-[45%] md:mx-3 px-5 py-3 my-3 bg-white rounded-md dark:bg-gray-700 dark:text-gray-400'>
				<h2 className='font-medium'>Total Exchanges</h2>
				<p>{localeString(totalExchanges)}</p>
			</div>
			<div className='shadow-sm md:w-[25%] w-[45%] md:mx-3 px-5 py-3 my-3 bg-white rounded-md dark:bg-gray-700 dark:text-gray-400'>
				<h2 className='font-medium'>Total MarketCap</h2>
				<p>{localeString(totalMarketCap)}</p>
			</div>
			<div className='shadow-sm md:w-[25%] w-[45%] md:mx-3 px-5 py-3 my-3 bg-white rounded-md dark:bg-gray-700 dark:text-gray-400'>
				<h2 className='font-medium'>Total Markets</h2>
				<p>{localeString(totalMarkets)}</p>
			</div>
		</>
	);
};

export default ExploreStats;
