import Newest from '@/components/explore/banner/Newest';
import TopGainers from '@/components/explore/banner/TopGainers';
import TopVolumeBased from '@/components/explore/banner/TopIn24hVolume';
import TopInPrice from '@/components/explore/banner/TopInPrice';
import TopLosers from '@/components/explore/banner/TopLosers';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

const Banner = () => {
	return (
		<div className='my-10'>
			<div className='flex justify-center w-full'>
				<div className='mx-3 w-[65%] shadow-md shadow-slate-200 rounded-b-md'>
					<Swiper
						modules={[Pagination, Autoplay]}
						spaceBetween={30}
						pagination={{
							dynamicBullets: false,
							clickable: true,
						}}
						autoplay={{
							delay: 3500,
							disableOnInteraction: true,
						}}
						grabCursor={true}
						loop={true}
					>
						<SwiperSlide>
							<TopGainers limit={5} />
						</SwiperSlide>
						<SwiperSlide>
							<TopLosers limit={5} />
						</SwiperSlide>
						<SwiperSlide>
							<TopVolumeBased limit={5} />
						</SwiperSlide>
						<SwiperSlide>
							<TopInPrice limit={5} />
						</SwiperSlide>
						<SwiperSlide>
							<Newest limit={5} />
						</SwiperSlide>
					</Swiper>
				</div>
			</div>

			<div className='flex justify-center rounded-md my-6' role='group'>
				<button
					type='button'
					className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-green-500 hover:text-white'
				>
					<em className='bi bi-arrow-up-circle mr-2'></em>
					Top Gainers
				</button>
				<button
					type='button'
					className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-red-500 hover:text-white'
				>
					<em className='bi bi-arrow-down-circle mr-2'></em>
					Top Losers
				</button>
				<button
					type='button'
					className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-blue-500 hover:text-white'
				>
					<em className='bi bi-clock-history mr-2'></em>
					Top Coins (24h volume)
				</button>
				<button
					type='button'
					className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-blue-500 hover:text-white'
				>
					<em className='bi bi-clock-history mr-2'></em>
					Top Coins (Based price)
				</button>
				<button
					type='button'
					className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-blue-500 hover:text-white'
				>
					<em className='bi bi-clock mr-2'></em>
					Recently Added
				</button>
			</div>
		</div>
	);
};

export default Banner;
