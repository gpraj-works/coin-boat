import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ScreenWidth } from '../utilities/ScreenSize';

const AuthButtons = () => {
	const router = useRouter();
	return (
		<>
			<Link href='/account/register' className='btn btn-primary-bordered'>
				Get start
			</Link>
			<Link
				href={{
					pathname: '/account/login',
					query: { from: router.pathname },
				}}
				className='btn btn-primary-filled ml-3'
			>
				LogIn
			</Link>
		</>
	);
};

const AccountButtons = () => {
	return (
		<>
			<Link
				href='/dashboard/'
				className='bg-primary hover:bg-blue-600 text-white ml-2 text-sm py-1.5 px-[9px] rounded-full mr-2'
			>
				<em className='bi bi-person-circle'></em>
			</Link>
			<Link
				href={{
					pathname: '/account/logout',
					query: { to: '/explore' },
				}}
				className='bg-primary hover:bg-blue-600 text-white mr-2 text-sm py-1.5 px-[9px] rounded-full'
			>
				<em className='bi bi-power'></em>
			</Link>
		</>
	);
};

const NavbarItems = ({ title, classProps, linkProps }) => {
	const NavLinks = ['/', '/explore', '/learn', '/about', '/support'];

	return (
		<li className={`mx-4 cursor-pointer hover:text-primary ${classProps}`}>
			<Link href={`${NavLinks[linkProps]}`}>{title}</Link>
		</li>
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

	return (
		<div className='flex items-center justify-between shadow-sm py-3 px-3 md:px-4 bg-white dark:bg-slate-700'>
			<div className='logo'>
				<Link href='/'>
					{ScreenWidth().value <= 640 ? (
						<Image
							src='/images/brand/logo.png'
							width={160}
							height={160}
							alt='CoinBoat | Logo'
							priority
						/>
					) : (
						<Image
							src='/images/brand/coinboat.png'
							width={40}
							height={40}
							alt='CoinBoat | Logo'
							priority
						/>
					)}
				</Link>
			</div>

			<div className='md:flex hidden'>
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

			<div className='flex items-center'>
				<div className='sm:flex md:hidden ml-3 mr-2 relative'>
					<span
						className='cursor-pointer text-3xl py-[5px] rounded-full'
						onClick={() => setToggle(true)}
					>
						<em className='bi bi-soundwave'></em>
					</span>
				</div>
				{ScreenWidth().value > 768 && (
					<>
						{loggedIn && <AccountButtons />}
						{!loggedIn && <AuthButtons />}
					</>
				)}
			</div>

			{toggle && (
				<div className='fixed z-50 bottom-0 top-0 left-0 w-screen text-blue-600 backdrop-blur-lg bg-white bg-opacity-60 dark:bg-slate-700 dark:bg-opacity-60 dark:text-white'>
					<div className='relative w-full flex justify-center'>
						<ul className='absolute text-center text-3xl uppercase p-20 z-20'>
							{['Home', 'Explore', 'Learn', 'About', 'Support'].map(
								(item, index) => (
									<NavbarItems
										key={item + index}
										title={item}
										classProps='my-6 text-md'
									/>
								)
							)}
							<li className='mx-4 my-6 cursor-pointer hover:text-primary'>
								<Link href=''>Get Start</Link>
							</li>
							<li className='mx-4 my-6 cursor-pointer hover:text-primary'>
								<Link href=''>Login</Link>
							</li>
						</ul>
						<span
							className='text-4xl absolute right-10 top-5 hover:rotate-90 z-20'
							onClick={() => setToggle(false)}
						>
							<em className='bi bi-x'></em>
						</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default Navbar;
