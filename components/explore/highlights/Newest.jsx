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
			<div className='flex justify-between items-center py-2 mb-2 px-4 border-b'>
				<h1 className=''>Recently Added</h1>
				<Link
					href='/highlights/newest'
					target='_blank'
					className='text-sm text-primary'
				>
					<em className='bi bi-box-arrow-up-right'></em>
				</Link>
			</div>

			{Newest &&
				Newest.map((newer, index) => (
					<div
						key={index}
						className={`grid grid-cols-3 py-3 px-4 items-center hover:bg-slate-100 dark:hover:bg-slate-800 dark:border-gray-800`}
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
		</>
	);
};

export default Newest;
