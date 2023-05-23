import React, { useState } from 'react';
import { GetCrypto } from '@/services/crypto.api';
import { ToCurrency } from '@/components/components.utils';
import Link from 'next/link';
import millify from 'millify';
import moment from 'moment';

const BeautifyChange = (data) => {
	let value = String(data).includes('-');
	let color = value ? 'text-red-500' : 'text-green-600';
	return (
		<>
			{data && <span className={color}>{data.toFixed(2)}&nbsp;%</span>}
			{!data && '0.00'}
		</>
	);
};

const Markets = ({ defaultCurrency, refSymbol }) => {
	const Crypto = new GetCrypto();
	const [limit, setLimit] = useState(50);
	const [pair, setPair] = useState('USDT');
	const [refCurrency, setRefCurrency] = useState(pair);

	const { data, error, isLoading } = Crypto.Markets({
		refSymbol,
		limit: limit,
		refCurrency: pair,
	});
	const totalExchanges =
		data !== undefined && data.Message.replace(/^\D+/g, '');

	const exchanges = data !== undefined && data.Data.Exchanges;

	const { data: refCurrencies } = Crypto.RefCurrencies({ refCurrency });
	const [modal, setModal] = useState(false);

	return (
		<div>
			<h3 className='text-2xl font-medium'>#Markets</h3>
			<div className='relative overflow-x-auto my-10'>
				<div className='mb-4'>
					<div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-full items-center'>
						<div className='flex items-center col-span-1 mb-6'>
							<label className='mr-6 font-bold'> FROM : </label>
							<input
								type='text'
								value={refSymbol}
								className='bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-56 px-3 py-2 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
								disabled
								readOnly
							/>
						</div>
						<div className='flex items-center col-span-1 mb-6'>
							<label className='mr-6 font-bold'> PAIR : </label>
							<button
								className='inline-flex justify-between bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none w-56 px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400'
								onClick={() => setModal('asset')}
							>
								{pair}
								<em className='bi bi-check2-square'></em>
							</button>
						</div>
						<div className='flex items-center col-span-1 mb-6'>
							<h3 className='uppercase'>
								Total Exchanges : <strong>{totalExchanges}</strong>
							</h3>
						</div>
					</div>
				</div>
				<table className='text-left w-full'>
					<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
						<tr>
							<th scope='col' className='pl-6 py-3 w-0 text-slate-400'>
								No
							</th>
							<th scope='col' className='px-6 py-3'>
								Name
							</th>
							<th scope='col' className='px-6 py-3'>
								Pair
							</th>
							<th scope='col' className='px-6 py-3'>
								Price
							</th>
							<th scope='col' className='px-6 py-3'>
								Change( 24h )
							</th>
							<th scope='col' className='px-6 py-3'>
								Volume( 24h )
							</th>
							<th scope='col' className='px-6 py-3'>
								Last update
							</th>
						</tr>
					</thead>
					<tbody>
						{!isLoading &&
							exchanges &&
							exchanges.map((item, index) => (
								<tr
									className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
									key={index}
								>
									<td className='pl-6 py-4 w-0 text-slate-400'>{index + 1}</td>
									<td className='px-6 py-4 capitalize'>
										<Link href='#'>{item.MARKET}</Link>
									</td>
									<td className='px-6 py-4'>
										{item.FROMSYMBOL}
										<span className='text-slate-600 text-lg'>/</span>
										{item.TOSYMBOL}
									</td>
									<td className='px-6 py-4'>
										{Number(item.PRICE).toFixed(3)}{' '}
										<span className='text-sm text-slate-500'>{pair}</span>
									</td>
									<td className='px-6 py-4'>
										{BeautifyChange(item.CHANGE24HOUR)}
									</td>
									<td className='px-6 py-4'>
										{millify(Number(item.VOLUME24HOUR))}
									</td>
									<td className='px-6 py-4'>{moment(item.LASTUPDATE * 1000).format('hh:mm A')}</td>
								</tr>
							))}
					</tbody>
				</table>
				{!exchanges && (
					<h3 className='mt-8 text-center text-xl text-slate-600'>
						Requested data not available!
					</h3>
				)}
				{totalExchanges > limit && (
					<div
						className='w-full text-center mt-10'
						onClick={() => setLimit(limit < totalExchanges && limit + 10)}
					>
						<button className='btn bg-primary text-white'>Load more</button>
					</div>
				)}
			</div>
			{modal && (
				<div className='fixed bg-black bg-opacity-20 backdrop-blur-sm w-screen h-screen z-20 top-0 left-0 flex justify-center items-center'>
					<div className='bg-white md:h-5/6 md:w-8/12 w-screen h-screen px-10 py-6 relative rounded-2xl'>
						<div className='relative mt-3'>
							<div className='absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none'>
								<em className='bi bi-search'></em>
							</div>
							<input
								type='search'
								className='block w-full pr-4 pl-12 py-2 text-md text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:outline-none focus:border-blue-500'
								placeholder={`Search currency`}
								onChange={(e) => setRefCurrency(e.target.value)}
							/>
						</div>
						<div className='flex flex-col my-6'>
							{refCurrencies?.data?.currencies.map((item, index) => (
								<button
									key={index}
									className=' text-slate-600 py-2 px-4 w-full text-left outline-none hover:bg-slate-100 rounded-md'
									onClick={() => {
										setModal(false);
										setPair(String(item.symbol));
									}}
								>
									<span className='text-black mr-2'>{item.symbol}</span>
									{item.name}
								</button>
							))}
						</div>
						<button
							className='bg-primary bg-opacity-40 hover:bg-primary text-white px-3 py-2 rounded-full absolute bottom-5 right-5'
							onClick={() => setModal(false)}
						>
							<em className='bi bi-x-lg'></em>
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
export default Markets;
