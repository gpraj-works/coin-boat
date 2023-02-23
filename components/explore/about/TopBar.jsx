/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { ToCurrency } from '@/components/components.utils';

const TopBar = ({ explore, defaultCurrency }) => {
	const change = explore.change;
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
						<ToCurrency price={explore.price} type={defaultCurrency.symbol} />
						<span className='ml-3'>
							{change.includes('-') ? (
								<span className='text-danger'>
									{change}
									<em className='bi bi-arrow-down'></em>
								</span>
							) : (
								<span className='text-green-400'>
									{change}
									<em className='bi bi-arrow-up'></em>
								</span>
							)}
						</span>
					</h3>
				</div>
			</div>
			<hr />
		</>
	);
};

export default TopBar;
