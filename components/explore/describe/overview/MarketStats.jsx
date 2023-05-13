import { ToCurrency } from '@/components/components.utils';
import { GetCrypto } from '@/services/crypto.api';
import moment from 'moment';

const MarketStats = ({ defaultCurrency, about }) => {
	const Crypto = new GetCrypto();

	const { data, error } = Crypto.History24h({
		refSymbol: about.symbol,
		refCurrency: defaultCurrency && defaultCurrency.symbol,
	});

	const prices = data && data.Data.Data;

	const High24h = prices && Math.max(...prices.map((p) => p.high));
	const Low24h = prices && Math.min(...prices.map((p) => p.low));

	return (
		<div className='mb-12 w-full'>
			<h3 className='text-2xl font-medium'>#Market Stats</h3>
			<div className='relative overflow-x-auto mt-10'>
				<table className='w-full'>
					<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
						<tr>
							<th scope='col' className='px-6 py-3 text-left'>
								Category
							</th>
							<th scope='col' className='px-6 py-3 text-right'>
								Total Value
							</th>
						</tr>
					</thead>
					<tbody>
						<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
							<th
								scope='row'
								className='px-6 py-4 font-medium text-gray-600 whitespace-nowrap dark:text-white text-left'
							>
								Market Cap
							</th>
							<td className='px-6 py-4 text-right'>
								<ToCurrency
									price={about.marketCap}
									type={defaultCurrency.symbol}
								/>
							</td>
						</tr>
						<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
							<th
								scope='row'
								className='px-6 py-4 font-medium text-gray-600 whitespace-nowrap dark:text-white text-left'
							>
								Diluted marketCap
							</th>
							<td className='px-6 py-4 text-right'>
								<ToCurrency
									price={about.fullyDilutedMarketCap}
									type={defaultCurrency.symbol}
								/>
							</td>
						</tr>
						<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
							<th
								scope='row'
								className='px-6 py-4 font-medium text-gray-600 whitespace-nowrap dark:text-white text-left'
							>
								Volume (24h)
							</th>
							<td className='px-6 py-4 text-right'>
								<ToCurrency
									price={
										Object.values(about)[
											Object.keys(about).indexOf('24hVolume')
										]
									}
									type={defaultCurrency.symbol}
								/>
							</td>
						</tr>
						{about.supply.max && (
							<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
								<th
									scope='row'
									className='px-6 py-4 font-medium text-gray-600 whitespace-nowrap dark:text-white text-left'
								>
									Maximum supply
								</th>
								<td className='px-6 py-4 text-right'>
									<ToCurrency
										price={about.supply.max}
										type={defaultCurrency.symbol}
									/>
								</td>
							</tr>
						)}

						<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
							<th
								scope='row'
								className='px-6 py-4 font-medium text-gray-600 whitespace-nowrap dark:text-white text-left'
							>
								Circulating supply
							</th>
							<td className='px-6 py-4 text-right'>
								<ToCurrency
									price={about.supply.circulating}
									type={defaultCurrency.symbol}
								/>
							</td>
						</tr>
						{/* PAID-ENDPOINT */}
						<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-left'>
							<th
								scope='row'
								className='px-6 py-4 font-medium text-gray-600 whitespace-nowrap dark:text-white'
							>
								24h High
							</th>
							<td className='px-6 py-4 text-right'>
								<ToCurrency price={High24h} type={defaultCurrency.symbol} />
							</td>
						</tr>
						<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
							<th
								scope='row'
								className='px-6 py-4 font-medium text-gray-600 whitespace-nowrap dark:text-white text-left'
							>
								24h Low
							</th>
							<td className='px-6 py-4 text-right'>
								<ToCurrency price={Low24h} type={defaultCurrency.symbol} />
							</td>
						</tr>
						<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
							<th
								scope='row'
								className='px-6 py-4 font-medium text-gray-600 whitespace-nowrap dark:text-white text-left'
							>
								All time high
							</th>
							<td className='px-6 py-4 text-right'>
								<ToCurrency price={about.allTimeHigh.price} type={'USD'} />
								<span className='text-gray-500 pl-2'>
									&#x5B;
									{moment(about.allTimeHigh.timestamp * 1000).format(
										'DD-MMM-YY'
									)}
									&#x5D;
								</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default MarketStats;
