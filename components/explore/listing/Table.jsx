/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { ToCurrency } from 'components/components.utils';
import ToSymbol from 'currency-symbol-map';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import millify from 'millify';
import { toast } from 'react-toastify';
import AuthGet from '@/services/auth.get';
import HandleWatchlist from '@/services/handle.watchlist';
import { GetCrypto } from '@/services/crypto.api';
import TableHeader from './TableHeader';
import { useState } from 'react';
import ResTable from './ResTable';

// 'https://api.frankfurter.app/latest?amount=10&from=USD&to=INR'

const Table = ({
	coinsProps,
	currencyType,
	currencyId,
	loggedIn,
	refSymbol,
}) => {
	const User = AuthGet();
	const Crypto = new GetCrypto();
	let CoinData = coinsProps;

	const AddToWatchlist = async (coinId, coinSymbol, coinName) => {
		let element = document.getElementById(`watchlist${coinId}`).classList;
		!loggedIn && toast.warning('Login is required!');
		if (loggedIn) {
			const result = await HandleWatchlist.UpdateList({
				WatchlistItem: {
					userId: User._id,
					coinId,
					coinSymbol,
					coinName,
				},
			});

			if (result.success) {
				toast.success('Watchlist updated');
				element.contains('bi-star')
					? element.replace('bi-star', 'bi-star-fill')
					: element.replace('bi-star-fill', 'bi-star');
			}
			!result.success && toast.error('Watchlist not updated');
		}
	};

	const Supply = ({ coinId, supply }) => {
		const { data: GetSupply, isLoading } = Crypto.CirculatingSupply({
			coinId: 'Qwsogvtv82FCd',
			refCurrency: currencyId,
		});

		if (supply === 'circulating') {
			return GetSupply?.data?.coin?.supply?.circulating;
		} else if (supply === 'max') {
			return GetSupply?.data?.coin?.supply?.max;
		} else {
			return GetSupply?.data?.coin?.supply?.total;
		}
	};

	const WatchlistBtn = ({ uuId, Symbol, Name }) => {
		return (
			<>
				{refSymbol ? (
					<>
						{refSymbol.includes(uuId) ? (
							<button
								className='bi bi-star-fill'
								id={`watchlist${uuId}`}
								onClick={() => {
									AddToWatchlist(uuId, Symbol, Name);
								}}
							></button>
						) : (
							<button
								className='bi bi-star'
								id={`watchlist${uuId}`}
								onClick={() => {
									AddToWatchlist(uuId, Symbol, Name);
								}}
							></button>
						)}
					</>
				) : (
					<button
						className='bi bi-star'
						id={`watchlist${uuId}`}
						onClick={() => {
							AddToWatchlist(uuId, Symbol, Name);
						}}
					></button>
				)}
			</>
		);
	};

	const Accordion = ({ spreadData }) => {
		const [isOpen, setOpen] = useState(false);
		const smallScreen = screen.availWidth < 450;
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
						<ToCurrency price={spreadData.price} type={currencyType} />
					</div>
					{!smallScreen && (
						<div className='change text-right w-[20%]'>
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
						</div>
					)}

					<div
						className={`flex justify-end items-center ${
							smallScreen ? 'w-[20%]' : 'w-[20%] pr-6'
						}`}
					>
						<WatchlistBtn
							uuId={spreadData.uuid}
							Symbol={spreadData.symbol}
							Name={spreadData.name}
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
								{ToSymbol(currencyType) +
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
								{ToSymbol(currencyType) +
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

	return (
		<>
			{screen.availWidth > 250 && screen.availWidth < 650 ? (
				CoinData.map((item, index) => (
					<Accordion
						spreadData={{
							price: item.price,
							uuid: item.uuid,
							symbol: item.symbol,
							name: item.name,
							img: item.iconUrl,
							change: item.change,
							marketCap: item.marketCap,
							volume:
								Object.values(item)[Object.keys(item).indexOf('24hVolume')],
						}}
						key={index}
					/>
				))
			) : (
				<>
					<TableHeader />
					{CoinData.map((coin, index) => (
						<div
							className='grid md:grid-cols-10 grid-cols-7 md:gap-0 gap-10 py-4 w-auto items-center hover:bg-slate-100 dark:hover:bg-slate-800 border-[0.1px] dark:border-gray-800'
							key={index}
						>
							<div className='wishlist text-center col-auto'>
								<WatchlistBtn
									uuId={coin.uuid}
									Symbol={coin.symbol}
									Name={coin.name}
								/>
							</div>
							<div className='coin justify-start flex items-center col-span-2'>
								<img
									src={coin.iconUrl}
									width={23}
									height={0}
									alt='Coin image'
								/>
								<div className='px-3'>
									<h3 className=''>{coin.name}</h3>
									<p className='text-[12px] text-slate-600'>{coin.symbol}</p>
								</div>
							</div>
							<div className='price text-right col-auto'>
								<ToCurrency price={coin.price} type={currencyType} />
							</div>
							<div className='change text-right col-auto'>
								{coin.change !== null ? (
									coin.change.includes('-') ? (
										<span className='text-red-500'>{coin.change}&nbsp;%</span>
									) : (
										<span className='text-green-600'>
											&nbsp;{coin.change}&nbsp;%
										</span>
									)
								) : (
									'0.00'
								)}
							</div>
							<div className='chart pl-6 col-auto hidden md:block'>
								{coin.change !== null ? (
									coin.change.includes('-') ? (
										<Sparklines data={coin.sparkline} width={100} height={40}>
											<SparklinesLine
												style={{
													stroke: '#F05252',
													strokeWidth: '1.5',
													fill: 'none',
												}}
											/>
										</Sparklines>
									) : (
										<Sparklines data={coin.sparkline} width={100} height={40}>
											<SparklinesLine
												style={{
													stroke: '#0E9F6E',
													strokeWidth: '1.5',
													fill: 'none',
												}}
											/>
										</Sparklines>
									)
								) : (
									'0.00'
								)}
							</div>
							<div className='market-cap text-right col-auto hidden md:block'>
								{ToSymbol(currencyType) +
									millify(coin.marketCap !== null ? coin.marketCap : '0', {
										precision: 4,
									})}
							</div>
							<div className='24h-volume text-right col-auto'>
								{ToSymbol(currencyType) +
									millify(
										Object.values(coin)[Object.keys(coin).indexOf('24hVolume')],
										{ precision: 4 }
									)}
							</div>
							<div className='col-auto text-center hidden md:block'>
								<button className='text-blue-500'>
									<em className='bi bi-info-circle text-lg'></em>
								</button>
							</div>
							<div className='col-auto md:text-left text-center'>
								<Link
									href={`/explore/${coin.uuid}`}
									target='_blank'
									className='text-blue-500'
								>
									<em className='bi bi-arrow-90deg-right text-lg'></em>
								</Link>
							</div>
						</div>
					))}
				</>
			)}
		</>
	);
};

export default Table;
