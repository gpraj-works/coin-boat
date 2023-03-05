/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const MenuBar = () => {
	const MenuList = ({ title, icon, classProps }) => {
		return (
			<Link href='#'>
				<li
					className={`px-4 py-3 my-1 rounded-lg ${classProps} hover:bg-primary hover:text-white`}
				>
					<em className={`bi bi-${icon} mr-2`}></em>
					{title}
				</li>
			</Link>
		);
	};

	return (
		<div className='w-96 bg-gray-50 p-3 h-screen flex flex-col items-start justify-between rounded-xl my-2 ml-2 mr-1 border sticky top-0'>
			<div className='mb-3'>
				<img src='/images/brand/logo.png' className='w-[80%]' alt='logo' />
				<ul className='my-6'>
					<MenuList
						title='Dashboard'
						icon='grid'
						classProps='bg-primary text-white'
					/>
					<MenuList title='Profile' icon='person-gear' />
					<MenuList title='Wallet' icon='wallet2' />
					<MenuList title='Watchlist' icon='star' />
					<MenuList title='Notifications' icon='bell' />
					<MenuList title='Trade' icon='activity' />
					<MenuList title='Exchange' icon='arrow-left-right' />
				</ul>
			</div>
			<Link
				href={{
					pathname: '/account/logout',
					query: { to: '/account/login' },
				}}
				className='px-4 py-3 my-1 cursor-pointer rounded-lg w-full hover:bg-primary hover:text-white'
			>
				<em className='bi bi-power mr-2'></em>
				Logout
			</Link>
		</div>
	);
};

export default MenuBar;
