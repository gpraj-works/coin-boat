/* eslint-disable @next/next/no-img-element */
import { GetCrypto } from '@/services/crypto.api';
import Link from 'next/link';
import { ToCurrency } from '@/components/components.utils';
import { TrimTitle } from '@/components/components.utils';

const Newest = ({ limit }) => {
	const Crypto = new GetCrypto();
	const { data } = Crypto.Newest({ limit });
	const Newest = data && data.data.coins;

	return (
		<>
			<div className='flex justify-between items-center bg-white rounded-t-md py-3 px-7'>
				<h1 className=''>Recently Added</h1>
			</div>
			<div className='grid grid-cols-5 gap-5 py-3 px-7 items-center bg-slate-100'>
				<h3 className='col-span-2'>Name</h3>
				<h3 className='text-right'>Price</h3>
				<h3 className='text-center'>Rank</h3>
				<h3 className='text-left'>Listed At</h3>
			</div>

			{Newest &&
				Newest.map((newer, index) => (
					<div
						key={index}
						className={`grid grid-cols-5 gap-6 py-3 px-7 items-center bg-slate-50 hover:bg-slate-100 dark:hover:bg-slate-800 dark:border-gray-800 ${
							index === 4 ? ' border-b-0' : 'border-b-[0.1px]'
						}`}
					>
						<div className='coin justify-start flex items-center col-span-2'>
							<img src={newer.iconUrl} width={23} height={0} alt='Coin image' />
							<div className='px-3'>
								<h3 className=''>
									<TrimTitle string={newer.name} length={15} />
								</h3>
								<p className='text-[12px] text-slate-600'>{newer.symbol}</p>
							</div>
						</div>
						<div className='price text-right col-auto'>
							<ToCurrency price={newer.price} type={'USD'} />
						</div>
						<div className='text-center col-auto'>#{newer.rank}</div>
						<div className='chart col-auto'>
							{new Date().getDate() -
								new Date(newer.listedAt * 1000).getDate() >=
							1
								? new Date().getDate() -
								  new Date(newer.listedAt * 1000).getDate() +
								  'd Ago'
								: 'Added Today'}
						</div>
					</div>
				))}
		</>
	);
};

export default Newest;
