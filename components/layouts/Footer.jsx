import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
	return (
		<div className='dark:bg-slate-800 bg-white py-2 px-4 text-sm flex items-center justify-between'>
			<p className='text-lg flex items-center'>
				<Image
					src='/images/brand/coinboat.png'
					width={25}
					height={25}
					alt='CoinBoat | Logo'
					className='mr-2'
					priority
				/>
				CoinBoat
			</p>
			<p>© 2023 Coinboat</p>
			<div className='text-slate-500'>
				<Link href='#' className='mx-1.5'>
					Privacy & policy
				</Link>
				<Link href='#' className='mx-1.5'>
					Support
				</Link>
			</div>
		</div>
	);
};

export default Footer;
