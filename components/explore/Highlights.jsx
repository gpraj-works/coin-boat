import Newest from '@/components/explore/highlights/Newest';
import TopGainers from '@/components/explore/highlights/TopGainers';
import TopVolumeBased from '@/components/explore/highlights/TopIn24hVolume';
import TopInPrice from '@/components/explore/highlights/TopInPrice';
import TopLosers from '@/components/explore/highlights/TopLosers';
import { useSelector } from 'react-redux';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

const Highlights = () => {
	const defaultCurrency = useSelector(
		(state) => state.currencyUtils.defaultCurrency
	);

	return (
		<div className='my-10'>
			<div className='flex justify-center md:flex-row flex-col w-full'>
				<div className='mx-2 md:mb-0 mb-4 w-[98%] md:w-[32%] shadow-slate-200 shadow-lg rounded-lg border'>
					<Swiper
						modules={[Pagination, Autoplay]}
						pagination={{
							clickable: true,
						}}
						autoplay={{
							delay: 3500,
							disableOnInteraction: true,
						}}
						grabCursor={true}
						loop={true}
						className='rounded-lg'
					>
						<SwiperSlide>
							<TopGainers limit={3} />
						</SwiperSlide>
						<SwiperSlide>
							<TopLosers limit={3} />
						</SwiperSlide>
					</Swiper>
				</div>
				<div className='mx-2 md:mb-0 mb-4 w-[98%] md:w-[32%] shadow-slate-200 shadow-lg rounded-lg border'>
					<Swiper
						modules={[Pagination, Autoplay]}
						pagination={{
							clickable: true,
						}}
						autoplay={{
							delay: 3500,
							disableOnInteraction: true,
						}}
						grabCursor={true}
						loop={true}
						className='rounded-lg'
					>
						<SwiperSlide>
							<TopVolumeBased limit={3} refCurrency={defaultCurrency} />
						</SwiperSlide>
						<SwiperSlide>
							<TopInPrice limit={3} refCurrency={defaultCurrency} />
						</SwiperSlide>
					</Swiper>
				</div>
				<div className='mx-2 md:mb-0 mb-4 w-[98%] md:w-[32%] shadow-slate-200 shadow-lg rounded-lg border'>
					<Swiper
						modules={[Pagination, Autoplay]}
						pagination={{
							clickable: true,
						}}
						autoplay={{
							delay: 3500,
							disableOnInteraction: true,
						}}
						grabCursor={true}
						loop={true}
						className='rounded-lg'
					>
						<SwiperSlide>
							<Newest limit={3} />
						</SwiperSlide>
					</Swiper>
				</div>
			</div>
		</div>
	);
};

export default Highlights;
