/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { updateCurrency } from 'services/crypto.utils';
import PriceCalculator from '../PriceCalculator';
import { GetCrypto } from '@/services/crypto.api';
import Menu from './Menu';

const CoinSidebar = ({ about, defaultCurrency }) => {
	const Crypto = new GetCrypto();
	const dispatch = useDispatch();
	const [refCurrency, setRefCurrency] = useState(defaultCurrency.symbol);

	const { data: refCurrencies, isLoading: refCurrencyFetching } =
		Crypto.RefCurrencies({ refCurrency });

	const [refAsset, setRefAsset] = useState('bitcoin');
	const { data: refAssets, isLoading: refAssetsFetching } = Crypto.RefAssets({
		refAsset,
	});

	const [modal, setModal] = useState(false);

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

			<Menu
				numberOfExchanges={about.numberOfExchanges}
				numberOfMarkets={about.numberOfMarkets}
				symbol={about.symbol}
			/>

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
											className=' text-slate-600 py-2 px-4 w-full text-left outline-none hover:bg-slate-100 rounded-md'
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
											href={`/explore/${item.uuid}`}
											key={index}
											className=' text-slate-600 py-2 px-4 w-full text-left outline-none hover:bg-slate-100 flex rounded-full'
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
