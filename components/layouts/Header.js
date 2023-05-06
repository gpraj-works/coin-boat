import { Navbar } from '@/components/index';
import Image from 'next/image';
import Link from 'next/link';
import { GetScrollPosition } from '../components.utils';

const Header = () => {
	return (
		<div>
			<Navbar />
			<div className='header_items flex sm:flex-col lg:flex-row items-center px-20 py-10'>
				<div className='header_content'>
					<h1 className='text-6xl sm:text-5xl xs-text-2xl leading-[1.1] font-bold text-gray-700 dark:text-white uppercase'>
						Track Market Price!
					</h1>
					<h3 className='text-3xl my-4'>
						With<span className='text-blue-500'> #CoinBoat</span> Explorer.
					</h3>
					<p className='text-lg mb-8 font-normal text-gray-500 lg:text-xl dark:text-gray-400'>
						Lorem Ipsum is simply dummy text of the printing and typesetting
						industry. Lorem Ipsum has been the industry standard dummy text ever
						since the 1500s,
					</p>
					<Link href='#' className='py-4 px-8 hover:bg-blue-600 bg-primary rounded-full text-white'>
						View Market <em className='bi bi-arrow-right ml-2'></em>
					</Link>
				</div>
				<div className='header_image bg-transparent py-20 md:px-20'>
					<Image
						src='/bg/trade.svg'
						alt='CoinBoat | Header Image'
						width={1300}
						height={0}
						priority
					/>
				</div>
			</div>
		</div>
	);
};

export default Header;
