import { GetCrypto } from '@/services/crypto.api';
import moment from 'moment';
import { ToCurrency } from '@/components/components.utils';

const Historical = ({ defaultCurrency, symbol }) => {
	const Crypto = new GetCrypto();

	const { data, isLoading, error } = Crypto.Historical({
		limit: '',
		refSymbol: symbol,
		refCurrency: defaultCurrency && defaultCurrency.symbol,
	});

	const prices = data && data.Data.Data;

	const sortedPrices = prices && prices.sort((a, b) => b.time - a.time);

	const dateLabels =
		sortedPrices &&
		sortedPrices.map((p) => moment(p.time * 1000).format('MMM D, YYYY'));
	const openPrices = sortedPrices && sortedPrices.map((p) => p.open);
	const highPrices = sortedPrices && sortedPrices.map((p) => p.high);
	const lowPrices = sortedPrices && sortedPrices.map((p) => p.low);
	const closePrices = sortedPrices && sortedPrices.map((p) => p.close);

	return (
		<div>
			<h3 className='text-2xl font-medium'>#Historical (Last 7 days)</h3>
			<div className='relative overflow-x-auto mt-10'>
				<table className='text-left w-full'>
					<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
						<tr>
							<th scope='col' className='px-6 py-3'>
								Date
							</th>
							<th scope='col' className='px-6 py-3'>
								Open
							</th>
							<th scope='col' className='px-6 py-3'>
								High
							</th>
							<th scope='col' className='px-6 py-3'>
								Low
							</th>
							<th scope='col' className='px-6 py-3'>
								Close
							</th>
						</tr>
					</thead>
					<tbody>
						{prices &&
							prices.map((p, i) => (
								<tr
									className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
									key={p.time}
								>
									<td className='px-6 py-4'>{dateLabels[i]}</td>
									<td className='px-6 py-4'>
										<ToCurrency
											price={openPrices[i]}
											type={defaultCurrency.symbol}
										/>
									</td>
									<td className='px-6 py-4'>
										<ToCurrency
											price={highPrices[i]}
											type={defaultCurrency.symbol}
										/>
									</td>
									<td className='px-6 py-4'>
										<ToCurrency
											price={lowPrices[i]}
											type={defaultCurrency.symbol}
										/>
									</td>
									<td className='px-6 py-4'>
										<ToCurrency
											price={closePrices[i]}
											type={defaultCurrency.symbol}
										/>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Historical;
