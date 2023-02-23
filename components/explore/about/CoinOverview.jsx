import { FindLink } from '@/components/components.utils';
import millify from 'millify';
import { CoinChart } from '@/components/index';
import ToSymbol from 'currency-symbol-map';
import moment from 'moment';

const CoinOverview = ({ about, defaultCurrency }) => {
	return (
		<>
			<CoinChart price={about.price} uuid={about.uuid} />
			<div className='p-2 rounded-lg dark:bg-slate-700' id='overview'>
				<h3 className='text-2xl my-3 heading'>About</h3>
				<div
					dangerouslySetInnerHTML={{ __html: about.description }}
					className='about-coin text-justify'
				/>
				<hr className='my-6' />
				<h3 className='text-2xl mt-3 mb-1'>Market Stats</h3>
				<div className='flex flex-wrap md:flex-row flex-col justify-between m-5'>
					<div className='my-2'>
						<h3 className='text-gray-600 uppercase'>Market Cap</h3>
						<span className='font-bold tracking-wider'>
							{ToSymbol(defaultCurrency.symbol) + millify(about.marketCap)}
						</span>
					</div>
					<div className='my-2'>
						<h3 className='text-gray-600 uppercase'>volume (24h)</h3>
						<span className='font-bold tracking-wider'>
							{ToSymbol(defaultCurrency.symbol) +
								millify(
									Object.values(about)[Object.keys(about).indexOf('24hVolume')]
								)}
						</span>
					</div>
					<div className='my-2'>
						<h3 className='text-gray-600 uppercase'>circulating supply</h3>
						<span className='font-bold tracking-wider'>
							{ToSymbol(defaultCurrency.symbol) +
								millify(about.supply.circulating)}
							&nbsp;
							{defaultCurrency.symbol}
						</span>
					</div>
					<div className='my-2'>
						<h3 className='text-gray-600 uppercase'>All time high</h3>
						<span className='font-bold tracking-wider'>
							{ToSymbol(defaultCurrency.symbol) +
								millify(about.allTimeHigh.price)}
						</span>
						<span className='ml-1'>
							[ {moment(about.allTimeHigh.timestamp * 1000).format('DD-MMM-YY')}{' '}
							]
						</span>
					</div>
					<div className='my-2'>
						<h3 className='text-gray-600 uppercase'>fully diluted</h3>
						<span className='font-bold tracking-wider'>
							{ToSymbol(defaultCurrency.symbol) +
								millify(about.fullyDilutedMarketCap)}
						</span>
					</div>
				</div>
				<hr className='my-6' />
				<FindLink links={about.links} />
			</div>
		</>
	);
};

export default CoinOverview;
