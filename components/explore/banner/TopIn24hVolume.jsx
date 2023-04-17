/* eslint-disable @next/next/no-img-element */
import { ToCurrency, TrimTitle } from '@/components/components.utils';
import { GetCrypto } from '@/services/crypto.api';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import Link from 'next/link';

const TopIn24hVolume = ({ limit }) => {
	const Crypto = new GetCrypto();
	const { data } = Crypto.TopCoinsVolumeBased({ limit });
	const Volumes = data && data.data.coins;

	const Get24hVolume = (data) => {
		return Object.values(data)[Object.keys(data).indexOf('24hVolume')];
	};

	const BeautifyChange = (data) => {
		return (
			<>
				{data.change !== null &&
					(data.change.includes('-') ? (
						<span className='text-red-500'>{data.change}&nbsp;%</span>
					) : (
						<span className='text-green-600'>&nbsp;{data.change}&nbsp;%</span>
					))}
			</>
		);
	};

	return (
		<>
			<div className='flex justify-between items-center py-3 px-7 bg-white rounded-t-md'>
				<h1 className=''>Top Coins</h1>
				<p className='text-sm text-slate-500'>Based on 24h Volume </p>
			</div>

			<div className='grid grid-cols-5 gap-7 py-3 px-7 items-center bg-slate-100'>
				<h3 className='col-span-2'>Name</h3>
				<h3 className='text-right'>24h Volume</h3>
				<h3 className='text-right'>Change(24h)</h3>
				<h3 className='text-right'>Chart(24h)</h3>
			</div>

			{Volumes &&
				Volumes.map((volume, index) => (
					<div
						key={index}
						className={`grid grid-cols-5 gap-7 py-3 px-7 items-center hover:bg-slate-100 dark:hover:bg-slate-800 dark:border-gray-800 ${
							index === 4 ? 'border-b-0' : 'border-b-[0.1px]'
						}`}
					>
						<div className='coin justify-start flex items-center col-span-2'>
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
						</div>
						<div className='price text-right col-auto'>
							<ToCurrency price={Get24hVolume(volume)} type='USD' digits='0' />
						</div>
						<div className='change text-right col-auto'>
							{BeautifyChange(volume)}
						</div>
						{/* <div className='price text-right col-auto'>
							<ToCurrency price={volume.price} type={'USD'} />
						</div> */}
						<div className='chart col-auto'>
							{volume.change.includes('-') ? (
								<Sparklines data={volume.sparkline} width={90} height={30}>
									<SparklinesLine
										style={{
											stroke: '#F05252',
											strokeWidth: '1',
											fill: 'none',
										}}
									/>
								</Sparklines>
							) : (
								<Sparklines data={volume.sparkline} width={90} height={30}>
									<SparklinesLine
										style={{
											stroke: '#0E9F6E',
											strokeWidth: '1',
											fill: 'none',
										}}
									/>
								</Sparklines>
							)}
						</div>
					</div>
				))}
		</>
	);
};

export default TopIn24hVolume;
