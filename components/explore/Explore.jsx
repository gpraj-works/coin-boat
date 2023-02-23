/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import Cryptos from './categories/Cryptos';
import {
	useGetCryptosQuery,
	useGetRefCurrencyQuery,
	useGetRefAssetQuery,
} from 'services/crypto.api';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrency } from 'services/crypto.utils';

const TableHolder = () => {
	return (
		<div role='status' className='animate-pulse py-10'>
			<div className='h-4 bg-gray-300 rounded-full dark:bg-gray-600 max-w-[75%] my-2.5 mx-auto'></div>
			<div className='h-3 mx-auto my-1.5 bg-gray-300 rounded-full dark:bg-gray-600 max-w-[50%]'></div>
			<div className='h-3 mx-auto my-1.5 bg-gray-300 rounded-full dark:bg-gray-600 max-w-[25%]'></div>
			<span className='sr-only'>Loading...</span>
		</div>
	);
};

const ExploreTable = () => {
	const defaultCurrency = useSelector(
		(state) => state.currencyType.defaultCurrency
	);

	const dispatch = useDispatch();

	const [currency, setCurrency] = useState(defaultCurrency.id);

	const [page, setPage] = useState(1);
	let offset = page * 50 - 50;
	const { data: cryptosList, isFetching: cryptoFetching } = useGetCryptosQuery({
		offset,
		currency,
	});

	const [refCurrency, setRefCurrency] = useState(defaultCurrency.symbol);

	const { data: refCurrencies, isFetching: refCurrencyFetching } =
		useGetRefCurrencyQuery(refCurrency);

	const [refAsset, setRefAsset] = useState('bitcoin');
	const { data: refAssets, isFetching: refAssetsFetching } =
		useGetRefAssetQuery(refAsset);

	const [modal, setModal] = useState(false);

	const [openTab, setOpenTab] = useState('cryptocurrency');
	const tabs = [
		{
			name: 'watchlist',
			content: 'watchlist',
		},
		{
			name: 'cryptocurrency',
			content: cryptoFetching ? (
				<>
					<TableHolder />
					<TableHolder />
					<TableHolder />
				</>
			) : (
				<Cryptos
					coinsProps={cryptosList?.data?.coins}
					currencyType={defaultCurrency.symbol}
				/>
			),
		},
		{
			name: 'defi',
			content: 'defi',
		},
		{
			name: 'dex',
			content: 'dex',
		},
		{
			name: 'exchange',
			content: 'exchange',
		},
		{
			name: 'metaverse',
			content: 'metaverse',
		},
		{
			name: 'nft',
			content: 'nft',
		},
		{
			name: 'stacking',
			content: 'stacking',
		},
		{
			name: 'stablecoin',
			content: 'stablecoin',
		},
	];

	return (
		<>
			<div className='my-5 mx-3 flex justify-between'>
				<div>
					{tabs.map((tab, index) => (
						<button
							key={tab.name}
							onClick={() => setOpenTab(tab.name)}
							className={`${
								tab.name === openTab
									? 'bg-primary text-white'
									: 'bg-white hover:bg-primary hover:text-white'
							} shadow-md rounded-full mx-2 px-4 py-1.5 capitalize`}
						>
							{tab.name === 'watchlist' ? (
								<>
									<em className='bi bi-star mr-2'></em>
									{tab.name}
								</>
							) : (
								tab.name
							)}
						</button>
					))}
				</div>
				<div className='flex'>
					<button
						className='bg-white hover:bg-primary hover:text-white shadow-md rounded-full mx-2 px-2.5 py-1.5'
						onClick={() => setModal('asset')}
					>
						<em className='bi bi-search'></em>
					</button>
					<button
						className='bg-white hover:bg-primary hover:text-white shadow-md rounded-full mx-2 px-4 py-1.5 uppercase'
						onClick={() => setModal('currency')}
					>
						{!cryptoFetching && defaultCurrency.symbol}
						<em className='bi bi-chevron-down ml-1'></em>
					</button>
				</div>
			</div>
			{tabs.map((tab) => (
				<div
					key={tab.name}
					className={tab.name === openTab ? 'block' : 'hidden'}
				>
					{tab.content}
				</div>
			))}

			<div className='text-center my-6'>
				<p className='my-2 text-[12px] text-slate-700 font-sans'>
					{page} / {Math.round(cryptosList?.data?.stats?.totalCoins / 50)}
				</p>
				<div className='flex justify-center items-center'>
					<button
						className={`rounded-l-full text-white px-5 py-1 mx-0.5 outline-none ${
							page < 2 ? 'cursor-not-allowed bg-blue-300' : 'bg-blue-500'
						}`}
						onClick={() => setPage(page > 1 && page - 1)}
					>
						Prev
					</button>
					<button
						className='bg-blue-500 rounded-r-full text-white px-5 py-1 mx-0.5 outline-none'
						onClick={() => setPage(page + 1)}
					>
						Next
					</button>
				</div>
			</div>

			{modal && (
				<div className='fixed bg-black bg-opacity-20 w-screen h-screen z-30 top-0 right-0 flex justify-end'>
					<div className='bg-white h-screen w-96 px-6 py-6 relative'>
						<div className='relative'>
							<div className='absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none'>
								<em className='bi bi-search'></em>
							</div>
							<input
								type='search'
								className='block w-full pr-4 pl-12 py-2 text-md text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:outline-none focus:border-blue-500'
								placeholder={`Search ${
									modal === 'currency' ? 'Currency' : 'Asset'
								}`}
								onChange={(e) =>
									modal === 'currency'
										? setRefCurrency(e.target.value)
										: setRefAsset(e.target.value)
								}
							/>
						</div>
						<div className='flex flex-col my-6'>
							{modal === 'currency'
								? refCurrencies?.data?.currencies.map((item, index) => (
										<button
											key={index}
											className=' text-slate-600 py-2 px-4 w-full text-left outline-none hover:bg-slate-100'
											onClick={() => {
												setModal(false);
												setCurrency(item.uuid);
												dispatch(
													updateCurrency({ id: item.uuid, symbol: item.symbol })
												);
											}}
										>
											<span className='text-black mr-2'>{item.symbol}</span>
											{item.name}
										</button>
								  ))
								: refAssets?.data?.coins.map((item, index) => (
										<Link
											href='#'
											key={index}
											className=' text-slate-600 py-2 px-4 w-full text-left outline-none hover:bg-slate-100 flex'
										>
											<img
												src={item.iconUrl}
												alt={item.name}
												className='mt-0.5 w-5 h-5'
											/>
											<span className='text-black mx-2'>{item.symbol}</span>
											{item.name}
										</Link>
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
		</>
	);
};

export default ExploreTable;
