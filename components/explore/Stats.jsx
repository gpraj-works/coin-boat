import { ToCurrency } from 'components/components.utils';
import { useGetCryptoStatsQuery } from 'services/crypto.api';
import { useSelector } from 'react-redux';

const MakeStats = ({ title, value }) => {
	return (
		<p className='px-3 capitalize text-[13px]'>
			{title} : <span className='text-blue-700'>{value}</span>
		</p>
	);
};

const ExploreStats = () => {
	const defaultCurrency = useSelector(
		(state) => state.currencyType.defaultCurrency
	);

	const { data: cryptoStats, isFetching } = useGetCryptoStatsQuery(
		defaultCurrency.id
	);

	return (
		!isFetching && (
			<div className=' bg-slate-50 dark:bg-slate-800 py-2 flex flex-wrap items-center mx-3'>
				<MakeStats title='total coins' value={cryptoStats?.data?.totalCoins} />
				<MakeStats
					title='total exchanges'
					value={cryptoStats?.data?.totalExchanges}
				/>
				<MakeStats
					title='total markets'
					value={cryptoStats?.data?.totalMarkets}
				/>
				<MakeStats
					title='total market cap'
					value={
						<ToCurrency
							price={cryptoStats?.data?.totalMarketCap}
							type={defaultCurrency.symbol}
						/>
					}
				/>
				<MakeStats
					title='24h Volume'
					value={
						<ToCurrency
							price={cryptoStats?.data?.total24hVolume}
							type={defaultCurrency.symbol}
						/>
					}
				/>
				<MakeStats
					title='BTC Dominance'
					value={(cryptoStats?.data?.btcDominance).toFixed(1) + '%'}
				/>
			</div>
		)
	);
};

export default ExploreStats;
