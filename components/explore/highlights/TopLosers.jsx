/* eslint-disable @next/next/no-img-element */
import { GetCrypto } from '@/services/crypto.api';
import Link from 'next/link';
import { useState } from 'react';
import { TrimTitle } from '@/components/components.utils';

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
			<div className='flex justify-between items-center border-b py-2 mb-2 px-4'>
				<h1 className=''>Top Losers</h1>
				<div className='flex items-center'>
					<FilterChart title='1h' time='1h' />
					<FilterChart title='1d' time='24h' />
					<FilterChart title='1w' time='7d' />
				</div>
				<Link
					href='/highlights/losers'
					target='_blank'
					className='text-sm text-primary'
				>
					<em className='bi bi-box-arrow-up-right'></em>
				</Link>
			</div>

			{Losers &&
				Losers.map((loser, index) => (
					<div
						key={index}
						className={`grid grid-cols-3 py-3 px-4 items-center hover:bg-slate-100 dark:hover:bg-slate-800 dark:border-gray-800`}
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
		</>
	);
};

export default TopLosers;
