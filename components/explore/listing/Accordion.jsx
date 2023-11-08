/* eslint-disable @next/next/no-img-element */
import { ToCurrency } from '@/components/components.utils';
import AuthGet from '@/services/auth.get';
import { GetCrypto } from '@/services/crypto.api';
import ToSymbol from 'currency-symbol-map';
import millify from 'millify';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AddNew from './watchlist/AddNew';

const Accordion = ({ spreadData, info }) => {
	const Crypto = new GetCrypto();
	const [userId, setUserId] = useState();
	const User = AuthGet();
	useEffect(() => {
		if (User) {
			setUserId(User._id);
		}
	}, [User]);
	const [isOpen, setOpen] = useState(false);
	const smallScreen = screen.availWidth < 450;

	const Supply = ({ supply }) => {
		const { data: GetSupply } = Crypto.CirculatingSupply({
			coinId: 'Qwsogvtv82FCd',
			refCurrency: info.refCurrency,
		});

		if (supply === 'circulating') {
			return GetSupply?.data?.coin?.supply?.circulating;
		} else if (supply === 'max') {
			return GetSupply?.data?.coin?.supply?.max;
		} else {
			return GetSupply?.data?.coin?.supply?.total;
		}
	};

	return (
		<div className={`w-full pl-5 ${isOpen ? 'bg-white' : ''}`}>
			<div
				className={`border-b py-3 flex items-center ${isOpen && 'bg-white'}`}
			>
				<div className='coin justify-start flex items-center w-[40%]'>
					<img src={spreadData.img} width={23} height={0} alt='Coin image' />
					<div className='px-3'>
						<h3 className=''>{spreadData.name}</h3>
						<p className='text-[12px] text-slate-600'>{spreadData.symbol}</p>
					</div>
				</div>
				<div className='price text-right w-[35%]'>
					<ToCurrency price={spreadData.price} type={info.currencyType} />
				</div>
				{!smallScreen && (
					<div className='change text-right w-[20%]'>
						{spreadData.change !== null ? (
							spreadData.change.includes('-') ? (
								<span className='text-red-500'>{spreadData.change}&nbsp;%</span>
							) : (
								<span className='text-green-600'>
									&nbsp;{spreadData.change}&nbsp;%
								</span>
							)
						) : (
							'0.00'
						)}
					</div>
				)}

				<div
					className={`flex justify-end items-center ${
						smallScreen ? 'w-[20%]' : 'w-[20%] pr-6'
					}`}
				>
					<AddNew
						coinId={spreadData.uuid}
						coinSymbol={spreadData.symbol}
						coinName={spreadData.name}
						refSymbol={info.refSymbol}
						loggedIn={info.loggedIn}
						userId={userId}
					/>
					<span className='ml-5' onClick={() => setOpen(!isOpen)}>
						<em
							className={`bi bi-${
								isOpen ? 'arrows-collapse' : 'arrows-expand'
							}`}
						></em>
					</span>
				</div>
			</div>
			<div className={`py-3 ${!isOpen ? 'hidden' : ''}`}>
				<div className='flex gap-3 flex-wrap'>
					{smallScreen && (
						<div className='my-1 mx-2'>
							<h3 className='text-slate-500'>Change (1h)</h3>
							<span>
								{spreadData.change !== null ? (
									spreadData.change.includes('-') ? (
										<span className='text-red-500'>
											{spreadData.change}&nbsp;%
										</span>
									) : (
										<span className='text-green-600'>
											&nbsp;{spreadData.change}&nbsp;%
										</span>
									)
								) : (
									'0.00'
								)}
							</span>
						</div>
					)}

					<div className='my-1 mx-2'>
						<h3 className='text-slate-500'>Market cap</h3>
						<span>
							{ToSymbol(info.currencyType) +
								millify(
									spreadData.marketCap !== null ? spreadData.marketCap : '0',
									{
										precision: 4,
									}
								)}
						</span>
					</div>
					<div className='my-1 mx-2'>
						<h3 className='text-slate-500'>24h Volume</h3>
						<span>
							{ToSymbol(info.currencyType) +
								millify(spreadData.volume, { precision: 4 })}
						</span>
					</div>
					<div className='my-1 mx-2'>
						<h3 className='text-slate-500'>Circulating</h3>
						<span>
							{Supply({ coinId: spreadData.uuid, supply: 'circulating' })}
						</span>
					</div>
					<div className='my-1 mx-2'>
						<h3 className='text-slate-500'>Max Supply</h3>
						<span>{Supply({ coinId: spreadData.uuid, supply: 'max' })}</span>
					</div>
					<div className='my-auto mx-2'>
						<Link href='' className='btn bg-primary text-white'>
							Explore
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Accordion;
