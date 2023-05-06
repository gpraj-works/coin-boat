import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { loadState } from 'providers/storage';

const Verify = ({ email, routeFrom }) => {
	const loggedIn = loadState('auth');
	const router = useRouter();

	const [clientEmail, setClientEmail] = useState(email);
	const [clientOtp, setClientOtp] = useState('');
	const [err, setErr] = useState(false);
	const [validate, setValidate] = useState(false);
	const [loading, setLoading] = useState(false);
	const [verified, setVerified] = useState(false);

	useEffect(() => {
		if (loggedIn) {
			if (routeFrom !== null) {
				router.push(routeFrom);
			} else {
				router.push('/dashboard');
			}
		}
	}, [loggedIn, router, routeFrom]);

	const checkOtp = (otpCode) => {
		let reg = /^[0-9]+$/;
		otpCode === '' && setErr('Please enter one time password');
		if (otpCode.length > 6 || !reg.test(otpCode)) {
			setErr('Please enter valid OTP');
			setClientOtp('');
		} else {
			setErr(false);
			setClientOtp(otpCode);
		}
	};

	const handleSubmit = async () => {
		setLoading(true);

		const prepared = {
			email: clientEmail,
			otp: clientOtp,
		};

		const response = await fetch('/api/account/verify', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			mode: 'cors',
			cache: 'default',
			body: JSON.stringify(prepared),
		});

		const result = await response.json();
		if (response.status === 200) {
			setLoading(false);
			setValidate(false);
			setVerified(true);
		}
	};

	const GenerateOTP = async () => {
		setLoading(true);

		const prepared = {
			email: clientEmail,
		};

		const response = await fetch('/api/account/verify', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			mode: 'cors',
			cache: 'default',
			body: JSON.stringify(prepared),
		});
		const result = await response.json();
		if (response.status === 200) {
			setLoading(false);
			setValidate(true);
		}
	};

	return (
		<div className='h-screen flex justify-center items-center'>
			<div className='flex flex-col items-center shadow-md xl:w-[40%] lg:w-[50%] md:w-[70%] w-full py-12 px-10 border rounded-lg'>
				{verified && (
					<>
						<h3 className='flex items-center text-3xl heading'>
							<Image
								src={`/images/account/emoji/emoji_016.png`}
								alt="emoji's"
								width={35}
								height={35}
							/>
							&nbsp;Verified successfully
						</h3>
						<ul className='my-2'>
							<li className='text-lg'>
								<em className='bi bi-check2-all mr-2 text-success text-xl'></em>
								Account registration
							</li>
							<li className='text-lg'>
								<em className='bi bi-check2-all mr-2 text-success text-xl'></em>
								Account verification
							</li>
							<li className='text-lg'>
								<em className='bi bi-check2-all mr-2 text-gray-500 text-xl'></em>
								Complete Profile
							</li>
						</ul>
						<Link
							href='/account/login'
							className='text-white bg-primary hover:bg-blue-600 outline-none font-medium rounded-full w-full sm:w-auto px-6 py-2.5 text-center mt-2'
						>
							Go to Login
						</Link>
					</>
				)}
				{!verified && !validate && (
					<>
						<h3 className='flex items-center text-3xl heading'>
							<Image
								src={`/images/account/emoji/emoji_${
									routeFrom === '/register' ? '016' : '011'
								}.png`}
								alt="emoji's"
								width={35}
								height={35}
								className='mr-2'
							/>
							{routeFrom === '/register'
								? 'Registered Successfully'
								: 'Verify Your Account'}
						</h3>
						<ul className='mt-2'>
							<li className='text-lg'>
								<em className='bi bi-check2-all mr-2 text-success text-xl'></em>
								Account registration
							</li>
							<li className='text-lg'>
								<em className='bi bi-check2-all mr-2 text-gray-500 text-xl'></em>
								Account verification
							</li>
							<li className='text-lg'>
								<em className='bi bi-check2-all mr-2 text-gray-500 text-xl'></em>
								Complete Profile
							</li>
						</ul>
						{!loading ? (
							<button
								className='bg-primary hover:bg-blue-600 py-2.5 px-6 rounded-full text-white mt-4 mb-2'
								onClick={GenerateOTP}
							>
								Verify Account
							</button>
						) : (
							<div className='bg-primary hover:bg-blue-600 rounded-full mt-4 mb-2 px-2 py-1 w-36'>
								<span className='loader'></span>
							</div>
						)}
					</>
				)}

				{validate && (
					<>
						<h3
							className={`heading text-2xl mb-3 flex items-center ${
								err && 'text-danger'
							}`}
						>
							{err ? err : 'Enter one time password'}&nbsp;
							<Image
								src={`/images/account/emoji/emoji_${err ? '006' : '007'}.png`}
								alt="emoji's"
								width={35}
								height={35}
							/>
						</h3>
						<div className='mb-6'>
							<input
								type='text'
								className='bg-gray-50 border-b border-gray-300 text-gray-900 text-4xl font-bold outline-none text-center focus:border-b-blue-500 block w-56 py-2.5 px-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500'
								value={clientOtp}
								placeholder='OTP'
								onChange={(e) => checkOtp(e.target.value)}
							/>
						</div>

						<div className='flex items-center'>
							{!loading ? (
								<>
									<button className='border border-primary hover:bg-blue-600 hover:text-white px-6 py-2 mt-1 mx-2 text-primary rounded-full'>
										Resend
									</button>
									<button
										className='bg-primary border border-primary hover:bg-blue-600 px-6 py-2 mt-1 mx-2 text-white rounded-full'
										onClick={handleSubmit}
									>
										Verify OTP
									</button>
								</>
							) : (
								<div className='bg-primary hover:bg-blue-600 rounded-full px-2 py-1 w-36 mt-5'>
									<span className='loader'></span>
								</div>
							)}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Verify;

export async function getServerSideProps(context) {
	const { query } = context;
	const route = query.from;
	if (Object.keys(query).length === 0) {
		return {
			redirect: {
				destination: '/404',
				permanent: false,
			},
		};
	}

	return {
		props: { email: query.chips, routeFrom: route ? query.from : null },
	};
}
