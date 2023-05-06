/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { ToCurrency } from '@/components/components.utils';
import millify from 'millify';

const TopBar = ({ explore, defaultCurrency }) => {
	const change = explore.change;
	const price = explore.price;

	const BeautifyChange = (data) => {
		return (
			<>
				{data !== null ? (
					data.includes('-') ? (
						<span className='text-red-500'>{data}&nbsp;%</span>
					) : (
						<span className='text-green-600'>&nbsp;{data}&nbsp;%</span>
					)
				) : (
					'0.00'
				)}
			</>
		);
	};

	return (
		<>
			<div className='flex justify-between items-center mb-4'>
				<div className='flex space-x-2'>
					<img src={explore.iconUrl} alt='' width={35} height={10} />
					<h1 className='text-3xl'>
						{explore.name}
						<span style={{ color: explore.color }}> {explore.symbol}</span>
					</h1>
					<span className='text-[0.8rem] text-slate-400'>#{explore.rank}</span>
				</div>
				<div>
					<h3 className='text-2xl'>
						<ToCurrency
							price={price ? price : explore.price}
							type={defaultCurrency.symbol}
							digits='3'
						/>
						<span className='ml-3'>{BeautifyChange(change)}</span>
					</h3>
				</div>
			</div>
			<hr />
		</>
	);
};

export default TopBar;
