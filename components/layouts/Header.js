import { Navbar } from '@/components/index';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
	return (
		<div>
			<Navbar />
			<div className='header_items flex sm:flex-col lg:flex-row items-center px-20 py-10'>
				<div className='header_content'>
					<h1 className='text-6xl sm:text-5xl xs-text-2xl leading-[1.1] font-bold text-gray-700 dark:text-white'>
						ARE YOU CONFUSE <br /> TO TRADE?
					</h1>
					<h3 className='text-3xl my-4'>
						<span className='text-blue-500'>#CoinBoat</span> provides the best
						solution.
					</h3>
					<p className='text-lg mb-8 font-normal text-gray-500 lg:text-xl dark:text-gray-400'>
						Lorem Ipsum is simply dummy text of the printing and typesetting
						industry. Lorem Ipsum has been the industry standard dummy text ever
						since the 1500s,
					</p>
					<Link
						href='#'
						className='px-8 py-4 hover:bg-blue-700 bg-blue-500 rounded-full text-white'
					>
						View Market
					</Link>
				</div>
				<div className='header_image bg-transparent sm:py-20 md:py-20'>
					<Image
						src='/bg/header_bg.png'
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
