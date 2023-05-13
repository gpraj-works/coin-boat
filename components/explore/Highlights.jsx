import Newest from '@/components/explore/highlights/Newest';
import TopGainers from '@/components/explore/highlights/TopGainers';
import TopVolumeBased from '@/components/explore/highlights/TopIn24hVolume';
import TopInPrice from '@/components/explore/highlights/TopInPrice';
import TopLosers from '@/components/explore/highlights/TopLosers';
import { useSelector } from 'react-redux';

const Highlights = () => {
	const defaultCurrency = useSelector(
		(state) => state.currencyUtils.defaultCurrency
	);

	return (
		<div className='my-10 py-10 bg-slate-100'>
			<div className='mx-3 my-8 text-center'>
				<h2 className='mb-4 text-2xl font-extrabold leading-none text-gray-900 md:text-3xl lg:text-4xl dark:text-white'>
					Cryptocurrency Highlights
				</h2>
				<p className='mb-6 text-lg font-normal text-gray-500 sm:px-16 dark:text-gray-400'>
					Exploring the dynamic world of cryptocurrencies <br /> Latest trends,
					market updates, and future predictions.
				</p>
			</div>
			<div className='flex justify-center md:flex-row flex-wrap flex-col w-full'>
				<div className='md:w-[30%] w-full m-2 bg-white rounded-md shadow-md shadow-slate-200 p-2'>
					<TopGainers limit={3} />
				</div>
				<div className='md:w-[30%] w-full m-2 bg-white rounded-md shadow-md shadow-slate-200 p-2'>
					<TopLosers limit={3} />
				</div>
				<div className='md:w-[30%] w-full m-2 bg-white rounded-md shadow-md shadow-slate-200 p-2'>
					<TopVolumeBased limit={3} refCurrency={defaultCurrency} />
				</div>
				<div className='md:w-[30%] w-full m-2 bg-white rounded-md shadow-md shadow-slate-200 p-2'>
					<TopInPrice limit={3} refCurrency={defaultCurrency} />
				</div>
				<div className='md:w-[30%] w-full m-2 bg-white rounded-md shadow-md shadow-slate-200 p-2'>
					<Newest limit={3} />
				</div>
			</div>
		</div>
	);
};

export default Highlights;
