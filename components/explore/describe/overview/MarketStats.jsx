import millify from 'millify';
import moment from 'moment';
import React from 'react';
import ToSymbol from 'currency-symbol-map';
import { GetCrypto } from '@/services/crypto.api';
import { ToCurrency } from '@/components/components.utils';

const MarketStats = ({ defaultCurrency, about }) => {
	const Crypto = new GetCrypto();

	const { data, error } = Crypto.History24h({
		limit: '',
		refCurrency: defaultCurrency && defaultCurrency.symbol,
	});

	const prices = data && data.Data.Data;

	const High24h = Math.max(...prices.map((p) => p.high));
	const Low24h = Math.min(...prices.map((p) => p.low));

	return (
		<div className='mb-12'>
			<h3 className='text-2xl font-medium'>#Market Stats</h3>

			<div className='relative overflow-x-auto mt-10'>
				<table className=' w-3/4 text-left'>
					<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
						<tr>
							<th scope='col' className='px-6 py-3'>
								Category
							</th>
							<th scope='col' className='px-6 py-3'>
								Total Value
							</th>
							<th scope='col' className='px-6 py-3'>
								In Short scale
							</th>
						</tr>
					</thead>
					<tbody>
						<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
							<th
								scope='row'
								className='px-6 py-4 font-medium text-gray-600 whitespace-nowrap dark:text-white'
							>
								Market Cap
							</th>
							<td className='px-6 py-4'>
								{ToCurrency({
									price: about.marketCap,
									type: defaultCurrency.symbol,
								})}
							</td>
							<td className='px-6 py-4'>
								{ToSymbol(defaultCurrency.symbol) + millify(about.marketCap)}
							</td>
						</tr>
						<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
							<th
								scope='row'
								className='px-6 py-4 font-medium text-gray-600 whitespace-nowrap dark:text-white'
							>
								Diluted marketCap
							</th>
							<td className='px-6 py-4'>
								{ToCurrency({
									price: about.fullyDilutedMarketCap,
									type: defaultCurrency.symbol,
								})}
							</td>
							<td className='px-6 py-4'>
								{ToSymbol(defaultCurrency.symbol) +
									millify(about.fullyDilutedMarketCap)}
							</td>
						</tr>
						<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
							<th
								scope='row'
								className='px-6 py-4 font-medium text-gray-600 whitespace-nowrap dark:text-white'
							>
								Volume (24h)
							</th>
							<td className='px-6 py-4'>
								{ToCurrency({
									price:
										Object.values(about)[
											Object.keys(about).indexOf('24hVolume')
										],
									type: defaultCurrency.symbol,
								})}
							</td>
							<td className='px-6 py-4'>
								{ToSymbol(defaultCurrency.symbol) +
									millify(
										Object.values(about)[
											Object.keys(about).indexOf('24hVolume')
										]
									)}
							</td>
						</tr>
						<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
							<th
								scope='row'
								className='px-6 py-4 font-medium text-gray-600 whitespace-nowrap dark:text-white'
							>
								Maximum supply
							</th>
							<td className='px-6 py-4'>
								{ToCurrency({
									price: about.supply.max,
									type: defaultCurrency.symbol,
								})}
							</td>
							<td className='px-6 py-4'>
								{ToSymbol(defaultCurrency.symbol) + millify(about.supply.max)}
							</td>
						</tr>
						<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
							<th
								scope='row'
								className='px-6 py-4 font-medium text-gray-600 whitespace-nowrap dark:text-white'
							>
								Circulating supply
							</th>
							<td className='px-6 py-4'>
								{ToCurrency({
									price: about.supply.circulating,
									type: defaultCurrency.symbol,
								})}
							</td>
							<td className='px-6 py-4'>
								{ToSymbol(defaultCurrency.symbol) +
									millify(about.supply.circulating)}
							</td>
						</tr>
						{/* PAID-ENDPOINT */}
						<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
							<th
								scope='row'
								className='px-6 py-4 font-medium text-gray-600 whitespace-nowrap dark:text-white'
							>
								24h High
							</th>
							<td className='px-6 py-4'>
								<ToCurrency price={High24h} type={defaultCurrency.symbol} />
							</td>
							<td className='px-6 py-4'>
								{ToSymbol(defaultCurrency.symbol) + millify(High24h)}
							</td>
						</tr>
						<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
							<th
								scope='row'
								className='px-6 py-4 font-medium text-gray-600 whitespace-nowrap dark:text-white'
							>
								24h Low
							</th>
							<td className='px-6 py-4'>
								<ToCurrency price={Low24h} type={defaultCurrency.symbol} />
							</td>
							<td className='px-6 py-4'>
								{ToSymbol(defaultCurrency.symbol) + millify(Low24h)}
							</td>
						</tr>
						<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
							<th
								scope='row'
								className='px-6 py-4 font-medium text-gray-600 whitespace-nowrap dark:text-white'
							>
								All time high
							</th>
							<td className='px-6 py-4'>
								{`${ToCurrency({
									price: about.allTimeHigh.price,
									type: 'USD',
								})}`}
								<span className='text-gray-500 pl-2'>
									&#x5B;
									{moment(about.allTimeHigh.timestamp * 1000).format(
										'DD-MMM-YY'
									)}
									&#x5D;
								</span>
							</td>
							<td className='px-6 py-4'>
								{ToSymbol('USD') + millify(about.allTimeHigh.price)}
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
