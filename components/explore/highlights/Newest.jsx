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
			<div className='flex justify-between items-center py-2 px-4 border-b bg-white'>
				<h1 className=''>Recently Added</h1>
			</div>

			{Newest &&
				Newest.map((newer, index) => (
					<div
						key={index}
						className={`grid grid-cols-3 py-2 px-4 items-center bg-slate-50 hover:bg-slate-100 dark:hover:bg-slate-800 dark:border-gray-800 ${
							index === 2 ? ' border-b-0' : 'border-b-[0.1px]'
						}`}
					>
						<Link
							href={`/explore/${newer.uuid}`}
							target='_blank'
							className='coin justify-start flex items-center col-span-2'
						>
							<img src={newer.iconUrl} width={23} height={0} alt='Coin image' />
							<div className='px-3'>
								<h3 className=''>
									<TrimTitle string={newer.name} length={15} />
								</h3>
								<p className='text-[12px] text-slate-600'>{newer.symbol}</p>
							</div>
						</Link>
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
			<div className='pt-0.5 pb-1 text-right border-t bg-white'>
				<Link
					href='/highlights/newest'
					target='_blank'
					className='mr-5 text-sm text-primary'
				>
					<em className='bi bi-box-arrow-up-right'></em>
				</Link>
			</div>
		</>
	);
};

export default Newest;
