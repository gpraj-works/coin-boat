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
			<div className='flex justify-between items-center py-2 px-4 bg-white'>
				<h1 className=''>Top Losers</h1>
				<div className='flex items-center'>
					<FilterChart title='1h' time='1h' />
					<FilterChart title='1d' time='24h' />
					<FilterChart title='1w' time='7d' />
				</div>
			</div>

			{Losers &&
				Losers.map((loser, index) => (
					<div
						key={index}
						className={`grid grid-cols-3 py-2 px-4 items-center bg-slate-50 hover:bg-slate-100 dark:hover:bg-slate-800 dark:border-gray-800 ${
							index === 2 ? 'border-b-0' : 'border-b-[0.1px]'
						}`}
					>
						<Link
							href={`/explore/${loser.uuid}`}
							target='_blank'
							className='coin justify-start flex items-center col-span-2'
						>
							<img src={loser.iconUrl} width={23} height={0} alt='Coin image' />
							<div className='px-3'>
								<h3 className=''>
									<TrimTitle string={loser.name} length={15} />
								</h3>
								<p className='text-[12px] text-slate-600'>{loser.symbol}</p>
							</div>
						</Link>
						<div className='change text-right col-auto'>
							{loser.change !== null && (
								<span className='text-red-500'>{loser.change}&nbsp;%</span>
							)}
						</div>
					</div>
				))}
			<div className='pt-0.5 pb-1 text-right border-t bg-white'>
				<Link
					href='/highlights/losers'
					target='_blank'
					className='mr-5 text-sm text-primary'
				>
					<em className='bi bi-box-arrow-up-right'></em>
				</Link>
			</div>
		</>
	);
};

export default TopLosers;
