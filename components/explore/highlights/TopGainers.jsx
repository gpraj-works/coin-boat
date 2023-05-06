/* eslint-disable @next/next/no-img-element */
import { GetCrypto } from '@/services/crypto.api';
import Link from 'next/link';
import { useState } from 'react';
import { TrimTitle } from '@/components/components.utils';

const TopGainers = ({ limit }) => {
	const [timePeriod, setTimePeriod] = useState('1h');
	const Crypto = new GetCrypto();
	const { data } = Crypto.TopGainers({ limit, timePeriod });
	const Gainers = data && data.data.coins;

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
			<div className='flex justify-between items-center py-2 px-4 border-b bg-white'>
				<h1 className=''>Top Gainers</h1>
				<div className='flex items-center'>
					<FilterChart title='1h' time='1h' />
					<FilterChart title='1d' time='24h' />
					<FilterChart title='1w' time='7d' />
				</div>
			</div>

			{Gainers &&
				Gainers.map((gainer, index) => (
					<div
						key={index}
						className={`grid grid-cols-3 py-2 px-4 items-center hover:bg-slate-100 dark:hover:bg-slate-800 dark:border-gray-800 ${
							index === 2 ? 'border-b-0' : 'border-b-[0.1px]'
						}`}
					>
						<Link
							href={`/explore/${gainer.uuid}`}
							target='_blank'
							className='coin justify-start flex items-center col-span-2'
						>
							<img
								src={gainer.iconUrl}
								width={23}
								height={0}
								alt='Coin image'
							/>
							<div className='px-3'>
								<h3 className=''>
									<TrimTitle string={gainer.name} length={15} />
								</h3>
								<p className='text-[12px] text-slate-600'>{gainer.symbol}</p>
							</div>
						</Link>
						<div className='change text-right col-auto'>
							{gainer.change !== null && (
								<span className='text-green-600'>
									&nbsp;{gainer.change}&nbsp;%
								</span>
							)}
						</div>
					</div>
				))}
			<div className='pt-0.5 pb-1 text-right border-t bg-white'>
				<Link
					href='/highlights/gainers'
					target='_blank'
					className='mr-5 text-sm text-primary'
				>
					<em className='bi bi-box-arrow-up-right'></em>
				</Link>
			</div>
		</>
	);
};

export default TopGainers;
