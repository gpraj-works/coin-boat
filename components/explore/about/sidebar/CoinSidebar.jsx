/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import {
	useGetRefCurrencyQuery,
	useGetRefAssetQuery,
	useGetCryptoStatsQuery,
} from 'services/crypto.api';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { updateCurrency } from 'services/crypto.utils';
import PriceCalculator from '../PriceCalculator';

const CoinSidebar = ({ about, defaultCurrency }) => {
	const dispatch = useDispatch();
	const [refCurrency, setRefCurrency] = useState(defaultCurrency.symbol);

	const { data: refCurrencies, isFetching: refCurrencyFetching } =
		useGetRefCurrencyQuery(refCurrency);

	const [refAsset, setRefAsset] = useState('bitcoin');
	const { data: refAssets, isFetching: refAssetsFetching } =
		useGetRefAssetQuery(refAsset);
	const [modal, setModal] = useState(false);

	const { data: cryptoStats, isFetching: cryptoStatsFetching } =
		useGetCryptoStatsQuery(defaultCurrency.id);

	const newestCoins = cryptoStats?.data?.newestCoins;

	return (
		<>
			<div className='flex'>
				<button
					className='bg-white hover:bg-primary dark:bg-primary hover:text-white shadow-md rounded-full mx-2 px-4 py-1.5 uppercase'
					onClick={() => setModal('currency')}
				>
					{defaultCurrency.symbol}
					<em className='bi bi-chevron-down ml-1'></em>
				</button>
				<button
					className='bg-white hover:bg-primary dark:bg-primary hover:text-white shadow-md rounded-full mx-2 px-2.5 py-1.5'
					onClick={() => setModal('asset')}
				>
					<em className='bi bi-search'></em>
				</button>
				<button className='bg-white hover:bg-primary dark:bg-primary hover:text-white shadow-md rounded-full mx-2 px-2.5 py-1.5'>
					<em className='bi bi-star'></em>
				</button>
				<button className='bg-white hover:bg-primary dark:bg-primary hover:text-white shadow-md rounded-full mx-2 px-2.5 py-1.5'>
					<em className='bi bi-share'></em>
				</button>
			</div>
			<hr className='mt-5 mb-2' />
			<div className='px-2'>
				<Link href='#' className='inline-flex items-center m-2.5 text-md'>
					<em className='bi bi-box-arrow-up-right mr-3'></em>
					Total Exchanges
					<span className='inline-flex items-center justify-center ml-2 px-2 py-0.5 text-xs font-semibold text-blue-800 bg-blue-200 rounded-xl'>
						{about.numberOfExchanges}
					</span>
				</Link>
				<Link href='#' className='inline-flex items-center m-2.5 text-md'>
					<em className='bi bi-box-arrow-up-right mr-3'></em>
					Total Markets
					<span className='inline-flex items-center justify-center ml-2 px-2 py-0.5 text-xs font-semibold text-blue-800 bg-blue-200 rounded-xl'>
						{about.numberOfMarkets}
					</span>
				</Link>
			</div>
			<hr className='my-2' />
			<div className='mb-3'>
				<h3 className='text-2xl my-4 ml-1 heading uppercase'>Newest coins</h3>
				{!cryptoStatsFetching &&
					newestCoins.map((item, index) => (
						<Link
							href={item.coinrankingUrl}
							key={index}
							className='flex items-center m-3'
						>
							<img src={item.iconUrl} alt={item.name} className='w-[8%]' />
							&nbsp;{item.name}
						</Link>
					))}
			</div>
			<div className='px-1 flex flex-col items-start'>
				<PriceCalculator
					currencySymbol={defaultCurrency.symbol}
					coinSymbol={about.symbol}
				/>
			</div>
			<hr className='my-4' />

			<div className='mb-6'>
				<h3 className='text-2xl mt-4 mb-3 ml-1 heading uppercase'>
					Quick links
				</h3>
				<div className='px-2 flex flex-col'>
					<Link
						href='#'
						className='inline-flex items-center mx-2.5 my-1.5 text-md'
					>
						<em className='bi bi-box-arrow-up-left mr-3'></em>
						Go to Home
					</Link>
					<Link
						href='#'
						className='inline-flex items-center mx-2.5 my-1.5 text-md'
					>
						<em className='bi bi-box-arrow-up-left mr-3'></em>
						Explore Coins
					</Link>
					<Link
						href='#'
						className='inline-flex items-center mx-2.5 my-1.5 text-md'
					>
						<em className='bi bi-box-arrow-up-left mr-3'></em>
						Support Center
					</Link>
				</div>
			</div>
			{modal && (
				<div className='fixed bg-black bg-opacity-20 w-screen h-screen z-20 top-0 right-0 flex justify-end'>
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

export default CoinSidebar;
