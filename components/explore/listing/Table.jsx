/* eslint-disable @next/next/no-img-element */
import { ToCurrency } from 'components/components.utils';
import ToSymbol from 'currency-symbol-map';
import millify from 'millify';
import Link from 'next/link';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import Accordion from './Accordion';
import TableHeader from './TableHeader';
import AddNew from './watchlist/AddNew';
import Supply from './Supply';

// 'https://api.frankfurter.app/latest?amount=10&from=USD&to=INR'

const Table = ({ data }) => {
	let CoinData = data.coinsProps;
	const smallScreen = screen.availWidth > 250 && screen.availWidth < 650;

	return (
		<>
			{smallScreen &&
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
						info={{
							currencyType: data.currencyType,
							refSymbol: data.refSymbol,
							loggedIn: data.loggedIn,
							refCurrency: data.currencyId,
						}}
						key={index}
					/>
				))}

			{!smallScreen && (
				<>
					<TableHeader />
					{CoinData.map((coin, index) => (
						<div
							className={`grid md:grid-cols-10 grid-cols-7 md:gap-4 gap-10 py-4 w-auto items-center hover:bg-slate-100 dark:hover:bg-slate-800 border-[0.1px] dark:border-gray-800 ${
								!index && 'border-t-0'
							}`}
							key={index}
						>
							<div className='wishlist text-center col-auto'>
								<AddNew
									coinId={coin.uuid}
									coinSymbol={coin.symbol}
									coinName={coin.name}
									refSymbol={data.refSymbol}
									loggedIn={data.loggedIn}
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
								<ToCurrency price={coin.price} type={data.currencyType} />
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
								{ToSymbol(data.currencyType) +
									millify(coin.marketCap !== null ? coin.marketCap : '0', {
										precision: 4,
									})}
							</div>
							<div className='24h-volume text-right col-auto'>
								{ToSymbol(data.currencyType) +
									millify(
										Object.values(coin)[Object.keys(coin).indexOf('24hVolume')],
										{ precision: 4 }
									)}
							</div>
							<div className='col-auto text-center hidden md:block relative'>
								<Supply
									coinId={coin.uuid}
									refCurrency={data.currencyId}
									refSymbol={coin.symbol}
								/>
							</div>
							<div className='col-auto md:text-left pl-3 text-center'>
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
