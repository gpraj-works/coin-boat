/* eslint-disable @next/next/no-img-element */
import { GetCrypto } from '@/services/crypto.api';
import Link from 'next/link';
import { useState } from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { ToCurrency, TrimTitle } from '@/components/components.utils';

const TopLosers = ({ limit }) => {
	const [timePeriod, setTimePeriod] = useState('1h');
	const Crypto = new GetCrypto();
	const { data } = Crypto.TopLosers({ limit, timePeriod });
	const Losers = data && data.data.coins;

	const FilterChart = ({ time, title }) => {
		let classProps;
		if (timePeriod === time) {
			classProps = 'text-primary';
		} else {
			classProps = 'hover:text-primary';
		}
		return (
			<button
				className={`${classProps} px-[8.5px] py-[5px] mx-1 rounded-full outline-none uppercase text-xs`}
				onClick={() => setTimePeriod(time)}
			>
				{title}
			</button>
		);
	};

	return (
		<>
			<div className='flex justify-between items-center bg-white rounded-t-md py-3 px-7'>
				<h1 className=''>Top Losers</h1>
				<div className='flex items-center'>
					<FilterChart title='1h' time='1h' />
					<FilterChart title='1d' time='24h' />
					<FilterChart title='1w' time='7d' />
				</div>
			</div>

			<div className='grid grid-cols-5 gap-7 py-3 px-7 items-center bg-slate-100'>
				<h3 className='col-span-2'>Name</h3>
				<h3 className='text-right'>Price</h3>
				<h3 className='text-right'>Change</h3>
				<h3 className='text-right'>Chart</h3>
			</div>

			{Losers &&
				Losers.map((loser, index) => (
					<div
						key={index}
						className={`grid grid-cols-5 gap-7 py-3 px-7 items-center bg-slate-50 hover:bg-slate-100 dark:hover:bg-slate-800 dark:border-gray-800 ${
							index === 4 ? 'border-b-0' : 'border-b-[0.1px]'
						}`}
					>
						<div className='coin justify-start flex items-center col-span-2'>
							<img src={loser.iconUrl} width={23} height={0} alt='Coin image' />
							<div className='px-3'>
								<h3 className=''>
									<TrimTitle string={loser.name} length={15} />
								</h3>
								<p className='text-[12px] text-slate-600'>{loser.symbol}</p>
							</div>
						</div>
						<div className='price text-right col-auto'>
							<ToCurrency price={loser.price} type={'USD'} />
						</div>
						<div className='change text-right col-auto'>
							{loser.change !== null && (
								<span className='text-red-500'>{loser.change}&nbsp;%</span>
							)}
						</div>
						<div className='chart col-auto'>
							<Sparklines data={loser.sparkline} width={90} height={30}>
								<SparklinesLine
									style={{
										stroke: '#F05252',
										strokeWidth: '1',
										fill: 'none',
									}}
								/>
							</Sparklines>
						</div>
					</div>
				))}
		</>
	);
};

export default TopLosers;