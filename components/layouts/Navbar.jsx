import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const NavbarItems = ({ title, classProps, linkProps }) => {
	const NavLinks = ['/', '/explore', '/learn', '/about', '/support'];
	return (
		<li className={`mx-4 cursor-pointer hover:text-primary ${classProps}`}>
			<Link href={`${NavLinks[linkProps]}`}>{title}</Link>
		</li>
	);
};

const AuthButtons = () => {
	return (
		<>
			<Link
				href='/account/login'
				className='px-6 py-2 mx-3 hover:bg-blue-700 bg-blue-500 rounded-full text-white'
			>
				LogIn
			</Link>
			<Link
				href='/account/register'
				className='px-6 py-2 hover:bg-blue-700 bg-blue-500 rounded-full text-white'
			>
				Get start
			</Link>
		</>
	);
};

const AccountButtons = () => {
	return (
		<>
			<Link
				href='/dashboard/'
				className='bg-blue-500 hover:bg-blue-600 text-white py-2 ml-2 px-[12px] rounded-full mr-2'
			>
				<em className='bi bi-person-circle'></em>
			</Link>
			<Link
				href={{
					pathname: '/account/logout',
					query: { to: '/explore' },
				}}
				className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-[12px] rounded-full'
			>
				<em className='bi bi-power'></em>
			</Link>
		</>
	);
};

const Navbar = ({ classProps }) => {
	let access = useSelector((state) => state.authUtils.loggedIn);
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		if (access) {
			setLoggedIn(true);
		} else {
			setLoggedIn(false);
		}
	}, [access]);

	const [toggle, setToggle] = useState(false);
	const { systemTheme, theme, setTheme } = useTheme();
	const renderThemeChanger = () => {
		const currentTheme = theme === 'system' ? systemTheme : theme;
		if (currentTheme === 'dark') {
			return (
				<span
					className='cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 p-[12px] rounded-full'
					onClick={() => setTheme('light')}
				>
					<em className='bi bi-sun'></em>
				</span>
			);
		} else {
			return (
				<span
					className='cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-[12px] rounded-full'
					onClick={() => setTheme('dark')}
				>
					<em className='bi bi-moon-stars'></em>
				</span>
			);
		}
	};

	return (
		<div
			className={`navbar flex items-center justify-between shadow-sm py-3 md:px-4 px-2 bg-white dark:bg-slate-700 ${classProps}`}
		>
			<div className='logo'>
				<Link href='#'>
					<Image
						src='/images/brand/coinboat.png'
						width={40}
						height={40}
						alt='CoinBoat | Logo'
						className='hidden md:flex'
						priority
					/>
					<Image
						src='/images/brand/logo.png'
						width={150}
						height={150}
						alt='CoinBoat | Logo'
						className='md:hidden flex'
						priority
					/>
				</Link>
			</div>
			<div className='navbar_item md:flex hidden'>
				<ul className='inline-flex'>
					{['Home', 'Explore', 'Learn', 'About', 'Support'].map(
						(item, index) => (
							<NavbarItems
								key={item + index}
								title={item}
								classProps='my-2 text-md'
								linkProps={index}
							/>
						)
					)}
				</ul>
			</div>
			<div className='nav_buttons flex items-center'>
				{renderThemeChanger()}
				<div className='sm:flex md:hidden ml-3 mr-2 relative'>
					<span
						className='cursor-pointer text-2xl bg-blue-500 text-white px-[8px] py-[5px] rounded-full'
						onClick={() => setToggle(true)}
					>
						<em className='bi bi-activity'></em>
					</span>
				</div>
				{loggedIn && <AccountButtons />}
				{!loggedIn && <AuthButtons />}
			</div>
			{toggle && (
				<div className='fixed z-10 flex-col bg-section-light flex items-center py-8 text-blue-600 top-0 left-0 right-0 bottom-0'>
					<span
						className='text-2xl cursor-pointer'
						onClick={() => setToggle(false)}
					>
						<em className='bi bi-x-circle'></em>
					</span>
					<ul className='text-center text-3xl uppercase pt-20'>
						{['Market', 'Exchange', 'Tutorials', 'Wallets'].map(
							(item, index) => (
								<NavbarItems
									key={item + index}
									title={item}
									classProps='my-6 text-md'
								/>
							)
						)}
					</ul>
					<div className='mt-20'>
						<Link
							href='/account/login'
							className='px-6 py-2 mx-3 hover:bg-blue-700 bg-blue-500 rounded-full text-white'
						>
							LogIn
						</Link>
						<Link
							href='/account/register'
							className='px-6 py-2 hover:bg-blue-700 bg-blue-500 rounded-full text-white'
						>
							Get start
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};

export default Navbar;
