import { GetCrypto } from '@/services/crypto.api';
import { ToCurrency } from 'components/components.utils';
import { useTheme } from 'next-themes';
import { useSelector } from 'react-redux';
import { HoldTable } from '../layouts/placeholder/HoldExplore';

const ExploreStats = () => {
	const Crypto = new GetCrypto();
	const { systemTheme, theme, setTheme } = useTheme();
	const renderThemeChanger = () => {
		const currentTheme = theme === 'system' ? systemTheme : theme;
		if (currentTheme === 'dark') {
			return (
				<span
					className='cursor-pointer text-sm'
					onClick={() => setTheme('light')}
				>
					<em className='bi bi-sun'></em>
				</span>
			);
		} else {
			return (
				<span
					className='cursor-pointer text-sm'
					onClick={() => setTheme('dark')}
				>
					<em className='bi bi-moon-stars'></em>
				</span>
			);
		}
	};

	const defaultCurrency = useSelector(
		(state) => state.currencyUtils.defaultCurrency
	);

	const { data: cryptoStats, isLoading } = Crypto.Stats({
		refCurrency: defaultCurrency.id,
	});

	return (
		<>
			{!isLoading ? (
				<div className='flex flex-wrap justify-center py-1.5'>
					<p className='pr-1 py-0.5 capitalize text-[13px] dark:text-slate-400'>
						Cryptos&nbsp;:&nbsp;
						<span className='text-blue-700 dark:text-slate-200'>
							{cryptoStats?.data?.totalCoins}
						</span>
					</p>
					<p className='px-1 py-0.5 capitalize text-[13px] dark:text-slate-400'>
						Exchanges&nbsp;:&nbsp;
						<span className='text-blue-700 dark:text-slate-200'>
							{cryptoStats?.data?.totalExchanges}
						</span>
					</p>
					<p className='px-1 py-0.5 capitalize text-[13px] dark:text-slate-400'>
						Markets&nbsp;:&nbsp;
						<span className='text-blue-700 dark:text-slate-200'>
							{cryptoStats?.data?.totalMarkets}
						</span>
					</p>
					<p className='px-1 py-0.5 capitalize text-[13px] dark:text-slate-400'>
						Market cap&nbsp;:&nbsp;
						<span className='text-blue-700 dark:text-slate-200'>
							<ToCurrency
								price={cryptoStats?.data?.totalMarketCap}
								type={defaultCurrency.symbol}
							/>
						</span>
					</p>
					<p className='px-1 py-0.5 capitalize text-[13px] dark:text-slate-400'>
						24h Volume&nbsp;:&nbsp;
						<span className='text-blue-700 dark:text-slate-200'>
							<ToCurrency
								price={cryptoStats?.data?.total24hVolume}
								type={defaultCurrency.symbol}
							/>
						</span>
					</p>
					<p className='px-1 py-0.5 capitalize text-[13px] dark:text-slate-400'>
						BTC Dominance&nbsp;:&nbsp;
						<span className='text-blue-700 dark:text-slate-200'>
							{(cryptoStats?.data?.btcDominance).toFixed(1) + '%'}
						</span>
					</p>

					<div className=''>
						<span className='text-slate-500 mx-3'>|</span>
						{renderThemeChanger()}
					</div>
				</div>
			) : (
				<HoldTable classProps='py-3' />
			)}
		</>
	);
};

export default ExploreStats;
