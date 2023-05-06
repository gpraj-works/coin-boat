import { useEffect, useState } from 'react';
import Link from 'next/link';

//Add comma between numbers

const localeString = (value) => {
	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

//Convert number into currency

const ToCurrency = ({ price, type, lang, digits }) => {
	return new Intl.NumberFormat(lang ? lang : 'en-US', {
		style: 'currency',
		currency: type,
		minimumFractionDigits: digits ? digits : 2,
	}).format(price);
};

//Generate otp

const RequestOtp = () => {
	var digits = '0123456789';
	let OTP = '';
	for (let i = 0; i < 6; i++) {
		OTP += digits[Math.floor(Math.random() * 10)];
	}
	return OTP;
};

//Get Scroll Position

const GetScrollPosition = () => {
	const [scrollPosition, setScrollPosition] = useState(0);

	useEffect(() => {
		const updatePosition = () => {
			setScrollPosition(window.pageYOffset);
		};
		window.addEventListener('scroll', updatePosition);
		updatePosition();
		return () => window.removeEventListener('scroll', updatePosition);
	}, []);

	return scrollPosition;
};

//Guess social media from link

const FindLink = ({ links }) => {
	const communityNames = [
		['facebook', 'bi-facebook'],
		['github', 'bi-github'],
		['reddit', 'bi-reddit'],
		['telegram', 'bi-telegram'],
		['twitter', 'bi-twitter'],
		['instagram', 'bi-instagram'],
		['linkedin', 'bi-linkedin'],
		['discord', 'bi-discord'],
		['medium', 'bi-medium'],
		['wechat', 'bi-wechat'],
		['youtube', 'bi-youtube'],
	];

	let communityLinks = [];
	let websiteLinks = [];

	for (let i = 0; i < links.length; i++) {
		if (
			links[i].type === 'website' ||
			links[i].type === 'whitepaper' ||
			links[i].type === 'explorer' ||
			links[i].type === 'bitcointalk'
		) {
			websiteLinks[i] = links[i];
		}
		for (let j = 0; j < communityNames.length; j++) {
			if (links[i].type === communityNames[j][0]) {
				communityLinks[i] = [links[i], communityNames[j][1]];
			}
		}
	}

	communityLinks = communityLinks.filter((n) => n);
	websiteLinks = websiteLinks.filter((n) => n);

	return (
		<>
			<h3 className='text-2xl my-3'>Website Links</h3>
			<div className='flex items-center flex-wrap'>
				{websiteLinks.map((item, index) =>
					item.type === 'whitepaper' ? (
						<Link
							href={item.url}
							className='m-2 flex bg-slate-100 dark:bg-primary py-2 px-4 rounded-full capitalize'
							target='_blank'
							key={index}
						>
							<em className={`bi bi-download ml-1 mr-2`}></em>
							<span>{item.name}</span>
						</Link>
					) : (
						<Link
							href={item.url}
							className='m-2 flex bg-slate-100 dark:bg-primary py-2 px-4 rounded-full capitalize'
							target='_blank'
							key={index}
						>
							<em className={`bi bi-box-arrow-up-right ml-1 mr-2`}></em>
							<span>{item.name}</span>
						</Link>
					)
				)}
			</div>
			<h3 className='text-2xl my-3'>Community Links</h3>
			<div className='flex items-center flex-wrap'>
				{communityLinks.map((item, index) => (
					<Link
						href={item[0].url}
						className='m-2 flex items-center bg-slate-100 dark:bg-primary py-2 px-4 rounded-full capitalize'
						target='_blank'
						key={index}
					>
						<em className={`bi ${item[1]} text-xl ml-1 mr-2`}></em>
						<span>{item[0].name}</span>
					</Link>
				))}
			</div>
		</>
	);
};

const TrimTitle = ({ string, length }) => {
	if (string.length > length) {
		return string.substr(0, length + 1) + '...';
	} else {
		return string;
	}
};

export {
	localeString,
	ToCurrency,
	FindLink,
	RequestOtp,
	GetScrollPosition,
	TrimTitle,
};
