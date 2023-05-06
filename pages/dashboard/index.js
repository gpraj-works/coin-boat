import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import moment from 'moment';
import { AccountBar, MenuBar } from '@/components/index';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { updateAccess } from '@/services/auth.utils';
const fetcher = (url) => fetch(url).then((res) => res.json());

const Dashboard = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	// const access = useSelector((state) => state.authUtils.loggedIn);
	const token = Cookies.get('token');
	const { data: authTest, isLoading: authTesting } = useSWR(
		`/api/account/auth?token=${token}`,
		fetcher
	);

	useEffect(() => {
		if (!token) {
			dispatch(updateAccess(false));
			router.push('/account/login');
		}
	}, [token, router, dispatch]);

	let expiredIn = moment(authTest?.data?.exp * 1000).diff(
		new Date(),
		'minutes'
	);

	if (expiredIn <= 10) {
		console.log(`Login will expire in ${expiredIn} minutes`);
	}

	return (
		<>
			<Head>
				<title>Dashboard | CoinBoat</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/images/brand/favicon.ico' />
			</Head>

			{!authTesting && authTest?.message?.name === 'TokenExpiredError' && (
				<div className='flex justify-center items-center fixed left-0 right-0 top-0 bottom-0 bg-black bg-opacity-40 z-30 backdrop-blur-sm'>
					<div className='shadow-md xl:w-[30%] lg:w-[50%] md:w-[70%] w-full py-6 px-10 border rounded-lg bg-white'>
						<div className='flex flex-col items-center py-8'>
							<h3 className='flex text-3xl heading'>
								<Image
									src='/images/account/emoji/emoji_006.png'
									alt="emoji's"
									width={40}
									height={40}
									className='mr-2 w-auto h-auto'
								/>
								Session Expired!
							</h3>
							<p className='text-center my-2 text-lg'>
								Your login session has expired! please login again to continue
							</p>
							<Link
								href={{
									pathname: '/account/login',
									query: { from: router.pathname },
								}}
								className='bg-primary hover:bg-blue-600 py-2.5 px-6 rounded-full text-white mt-4 mb-2'
							>
								Login Again
							</Link>
						</div>
					</div>
				</div>
			)}
			<div className='flex justify-between'>
				<MenuBar />
				<div className='w-full bg-slate-50 p-5 h-screen flex flex-col justify-between rounded-xl mx-1 border my-2'>
					<div className='flex justify-between items-center'>
						<div>
							<Link
								href='#'
								className='rounded-lg hover:bg-slate-200 px-3 py-2'
							>
								USD
								<em className='bi bi-caret-down text-slate-700 text-sm ml-1'></em>
							</Link>
							<Link
								href='#'
								className='rounded-lg hover:bg-slate-200 px-3 py-2'
							>
								<em className='bi bi-search'></em>
							</Link>
						</div>
						<div>
							<Link
								href='#'
								className='rounded-lg hover:bg-slate-200 px-3 py-2'
							>
								<em className='bi bi-star'></em> &nbsp;
								<span className='text-slate-700'>345</span>
							</Link>
							<Link
								href='#'
								className='rounded-lg hover:bg-slate-200 px-3 py-2'
							>
								<em className='bi bi-arrow-up'></em>&nbsp;
								<span className='text-slate-700'>345</span>
							</Link>
							<Link
								href='#'
								className='rounded-lg hover:bg-slate-200 px-3 py-2'
							>
								<em className='bi bi-arrow-down'></em>&nbsp;
								<span className='text-slate-700'>134</span>
							</Link>
						</div>
						<div>
							<Link
								href='#'
								className='rounded-lg hover:bg-slate-200 px-3 py-2'
							>
								<em className='bi bi-bell'></em>
							</Link>
							<span className='rounded-lg hover:bg-slate-200 px-3 py-2 cursor-pointer'>
								<em className='bi bi-moon-stars'></em>
							</span>
							<Link
								href='#'
								className='rounded-lg hover:bg-slate-200 px-3 py-2'
							>
								<em className='bi bi-person-plus'></em>
							</Link>
						</div>
					</div>
				</div>
				<AccountBar />
			</div>
		</>
	);
};

export default Dashboard;
