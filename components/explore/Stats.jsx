import { ToCurrency } from 'components/components.utils';
import { useGetCryptoStatsQuery } from 'services/crypto.api';
import { useSelector } from 'react-redux';

const ExploreStats = () => {
	const defaultCurrency = useSelector(
		(state) => state.currencyType.defaultCurrency
	);

	const { data: cryptoStats, isFetching } = useGetCryptoStatsQuery(
		defaultCurrency.id
	);

	return (
		<>
			{!isFetching && (
				<div className=' bg-slate-50 dark:bg-slate-800 py-2 flex flex-wrap items-center mx-3'>
					<p className='px-3 capitalize text-[13px]'>
						total coins&nbsp;:&nbsp;
						<span className='text-blue-700'>
							{cryptoStats?.data?.totalCoins}
						</span>
					</p>
					<p className='px-3 capitalize text-[13px]'>
						total exchanges&nbsp;:&nbsp;
						<span className='text-blue-700'>
							{cryptoStats?.data?.totalExchanges}
						</span>
					</p>
					<p className='px-3 capitalize text-[13px]'>
						total markets&nbsp;:&nbsp;
						<span className='text-blue-700'>
							{cryptoStats?.data?.totalMarkets}
						</span>
					</p>
					<p className='px-3 capitalize text-[13px]'>
						total market cap&nbsp;:&nbsp;
						<span className='text-blue-700'>
							<ToCurrency
								price={cryptoStats?.data?.totalMarketCap}
								type={defaultCurrency.symbol}
							/>
						</span>
					</p>
					<p className='px-3 capitalize text-[13px]'>
						24h Volume&nbsp;:&nbsp;
						<span className='text-blue-700'>
							<ToCurrency
								price={cryptoStats?.data?.total24hVolume}
								type={defaultCurrency.symbol}
							/>
						</span>
					</p>
					<p className='px-3 capitalize text-[13px]'>
						BTC Dominance&nbsp;:&nbsp;
						<span className='text-blue-700'>
							{(cryptoStats?.data?.btcDominance).toFixed(1) + '%'}
						</span>
					</p>
				</div>
			)}
		</>
	);
};

export default ExploreStats;
