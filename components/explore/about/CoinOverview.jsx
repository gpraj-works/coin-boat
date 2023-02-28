/* eslint-disable @next/next/no-img-element */
import { FindLink } from '@/components/components.utils';
import millify from 'millify';
import { CoinChart } from '@/components/index';
import ToSymbol from 'currency-symbol-map';
import moment from 'moment';
import useSWR from 'swr';
import Link from 'next/link';

const fetcher = (url) => fetch(url).then((res) => res.json());

const CoinOverview = ({ about, defaultCurrency }) => {
	const { data, error, isLoading } = useSWR(
		`${process.env.NEWS_API_BASE}${about.name}&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`,
		fetcher
	);

	const cryptoNews = data?.articles;

	const Simplify = (string, length) => {
		let prepare = string.substr(0, length);
		return (
			prepare.substr(0, Math.min(prepare.length, prepare.lastIndexOf(' '))) +
			'...'
		);
	};

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
						<h3 className='text-gray-600 dark:text-gray-400 uppercase'>
							Market Cap
						</h3>
						<span className='font-bold tracking-wider'>
							{ToSymbol(defaultCurrency.symbol) + millify(about.marketCap)}
						</span>
					</div>
					<div className='my-2'>
						<h3 className='text-gray-600 dark:text-gray-400 uppercase'>
							volume (24h)
						</h3>
						<span className='font-bold tracking-wider'>
							{ToSymbol(defaultCurrency.symbol) +
								millify(
									Object.values(about)[Object.keys(about).indexOf('24hVolume')]
								)}
						</span>
					</div>
					<div className='my-2'>
						<h3 className='text-gray-600 dark:text-gray-400 uppercase'>
							circulating supply
						</h3>
						<span className='font-bold tracking-wider'>
							{ToSymbol(defaultCurrency.symbol) +
								millify(about.supply.circulating)}
							&nbsp;
							{defaultCurrency.symbol}
						</span>
					</div>
					<div className='my-2'>
						<h3 className='text-gray-600 dark:text-gray-400 uppercase'>
							All time high
						</h3>
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
						<h3 className='text-gray-600 dark:text-gray-400 uppercase'>
							fully diluted
						</h3>
						<span className='font-bold tracking-wider'>
							{ToSymbol(defaultCurrency.symbol) +
								millify(about.fullyDilutedMarketCap)}
						</span>
					</div>
				</div>
				<hr className='my-6' />
				<FindLink links={about.links} />
			</div>
			<h3 className='text-2xl mt-3 mb-1 p-2'>Discover Latest News</h3>
			<div className='flex flex-wrap justify-evenly'>
				{!isLoading &&
					cryptoNews.slice(0, 6).map((item, index) => (
						<Link
							href={item.url}
							target='_blank'
							key={index}
							className='shadow-md w-[47%] m-2 p-4 rounded-lg flex justify-between'
						>
							<div className='w-[65%]'>
								<span className='uppercase text-sm text-slate-600 dark:text-slate-400'>
									{moment(item.publishedAt).format('DD-MM-YYYY h:m a')}
								</span>
								<h3 className='text-md my-1'>{Simplify(item.title, 35)}</h3>
								<p className='text-sm text-slate-800 dark:text-slate-400 text-justify'>
									{Simplify(item.description, 115)}
								</p>
							</div>
							<div className='w-[30%]'>
								<img
									src={item.urlToImage}
									alt=''
									className='h-full rounded-md'
								/>
							</div>
						</Link>
					))}
			</div>
		</>
	);
};

export default CoinOverview;
