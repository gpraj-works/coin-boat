import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AccountBar = () => {
	return (
		<div className='w-96 bg-gray-50 p-3 h-screen rounded-xl ml-1 mr-2 my-2 border sticky top-0 flex flex-col justify-between'>
			<div className='mb-3 mt-1 rounded-lg'>
				<Link href='#' className='flex items-center'>
					<Image
						src='/images/account/avatar/profile_011.png'
						alt='avatar'
						width={50}
						height={50}
						priority
					/>
					<div className='inline-flex flex-col mx-1'>
						<span className='text-lg capitalize heading'>Pushparaj</span>
						<span className='text-xs text-gray-500'>work.gpraj@gmail.com</span>
					</div>
				</Link>
			</div>
			<button className='bg-primary text-white px-5 my-2 text-center py-3 rounded-xl'>
				Connect Wallet
			</button>
		</div>
	);
};

export default AccountBar;
