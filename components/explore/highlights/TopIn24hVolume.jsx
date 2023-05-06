/* eslint-disable @next/next/no-img-element */
import { ToCurrency, TrimTitle } from '@/components/components.utils';
import { GetCrypto } from '@/services/crypto.api';
import Link from 'next/link';

const TopIn24hVolume = ({ limit, refCurrency }) => {
	const Crypto = new GetCrypto();
	const { data } = Crypto.TopCoinsVolumeBased({
		limit,
		refCurrency: refCurrency.id,
	});
	const Volumes = data && data.data.coins;

	const Get24hVolume = (data) => {
		return Object.values(data)[Object.keys(data).indexOf('24hVolume')];
	};

	return (
		<>
			<div className='flex justify-between items-center py-2 px-4 border-b bg-white'>
				<h1 className=''>Top Coins</h1>
				<p className='text-sm text-slate-500'>Based on 24h Volume </p>
			</div>

			{Volumes &&
				Volumes.map((volume, index) => (
					<div
						key={index}
						className={`grid grid-cols-2 py-2 px-4 items-center hover:bg-slate-100 dark:hover:bg-slate-800 dark:border-gray-800 ${
							index === 2 ? 'border-b-0' : 'border-b-[0.1px]'
						}`}
					>
						<Link
							href={`/explore/${volume.uuid}`}
							target='_blank'
							className='coin justify-start flex items-center'
						>
							<img
								src={volume.iconUrl}
								width={23}
								height={0}
								alt='Coin image'
							/>
							<div className='px-3'>
								<h3 className=''>
									<TrimTitle string={volume.name} length={15} />
								</h3>
								<p className='text-[12px] text-slate-600'>{volume.symbol}</p>
							</div>
						</Link>
						<div className='price text-right'>
							<ToCurrency
								price={Get24hVolume(volume)}
								type={refCurrency.symbol}
								digits='0'
							/>
						</div>
					</div>
				))}

			<div className='pt-0.5 pb-1 text-right border-t bg-white'>
				<Link
					href='/highlights/24hvolume'
					target='_blank'
					className='mr-5 text-sm text-primary'
				>
					<em className='bi bi-box-arrow-up-right'></em>
				</Link>
			</div>
		</>
	);
};

export default TopIn24hVolume;
