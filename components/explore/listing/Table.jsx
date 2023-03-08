/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { ToCurrency } from 'components/components.utils';
import ToSymbol from 'currency-symbol-map';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import millify from 'millify';
import { toast } from 'react-toastify';
import { useState } from 'react';
import useSWR from 'swr';
import TableHeader from './TableHeader';
// 'https://api.frankfurter.app/latest?amount=10&from=USD&to=INR'

const Cryptos = ({ coinsProps, currencyType, loggedIn }) => {
	let CoinData = coinsProps;
	const AddToWatchlist = async (coinId, coinSymbol, coinName) => {
		let el = document.getElementById(`watchlist${coinId}`);
		!loggedIn && toast.warning('Login is required!');
		if (loggedIn) {
			if (el.classList.contains('bi-star')) {
				el.classList.replace('bi-star', 'bi-star-fill');
			} else {
				el.classList.replace('bi-star-fill', 'bi-star');
			}
			// const response = await fetch();
		}
	};

	return (
		<div className='container-fluid my-1'>
			<TableHeader />
			{CoinData.map((coin, index) => (
				<div
					className='flex md:flex-row sm:flex-col flex-wrap py-4 px-3 w-full items-center hover:bg-slate-200 dark:hover:bg-slate-800 border-[0.3px] dark:border-gray-800'
					key={index}
				>
					<div className='wishlist text-center w-[5%] hidden md:block'>
						<button
							className='bi bi-star'
							id={`watchlist${coin.uuid}`}
							onClick={() => {
								AddToWatchlist(coin.uuid, coin.symbol, coin.name);
							}}
						></button>
					</div>
					<div className='coin justify-start flex items-center md:w-[30%] w-[45%]'>
						<img src={coin.iconUrl} width={25} height={0} alt='Coin image' />
						<div className='px-3'>
							<h3>{coin.name}</h3>
							<p className='text-[12px] font-light'>{coin.symbol}</p>
						</div>
					</div>
					<div className='price md:w-[10%] w-[30%]'>
						<ToCurrency price={coin.price} type={currencyType} />
					</div>
					<div className='chart w-[10%] mx-6 hidden md:block'>
						<Sparklines data={coin.sparkline} width={30} height={10}>
							<SparklinesLine
								style={{
									stroke: `${coin.color}`,
									strokeWidth: '0.7',
									fill: 'none',
								}}
							/>
						</Sparklines>
					</div>
					<div className='change md:w-[10%]'>
						{coin.change !== null ? (
							coin.change.includes('-') ? (
								<span className='text-red-500'>{coin.change}</span>
							) : (
								<span className='text-green-500'>&nbsp;{coin.change}</span>
							)
						) : (
							'0.00'
						)}
					</div>
					<div className='market-cap w-[15%] hidden lg:block'>
						{ToSymbol(currencyType) +
							millify(coin.marketCap !== null ? coin.marketCap : '0')}
					</div>
					<div className='buttons w-[10%] px-4 flex'>
						<Link
							href={`/explore/${coin.uuid}`}
							target='_blank'
							className='px-3 text-blue-500'
						>
							<em className='bi bi-arrow-90deg-right text-lg'></em>
						</Link>
					</div>
				</div>
			))}
		</div>
	);
};

export default Cryptos;