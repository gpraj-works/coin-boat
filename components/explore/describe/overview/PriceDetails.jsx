import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { ToCurrency } from '@/components/components.utils';
import { GetCrypto } from '@/services/crypto.api';

const PriceDetails = ({ uuid }) => {
	const Crypto = new GetCrypto();
	const theme = localStorage.getItem('theme');
	const defaultCurrency = useSelector(
		(state) => state.currencyUtils.defaultCurrency
	);
	const refCurrency = defaultCurrency.id;
	const [timePeriod, setTimePeriod] = useState('1h');
	const [trackingPrice, setTrackingPrice] = useState(false);
	const { data: history, isLoading } = Crypto.PriceHistory({
		coinId: uuid,
		refCurrency,
		timePeriod,
	});

	let cryptoHistory = history?.data?.history;
	// let cryptoChange = history?.data?.change;

	let preparedData = [];

	if (!isLoading) {
		cryptoHistory.map((item, index) => {
			// let toSplit = String(item.price).split('.');
			// let prepared = toSplit[0] + '.' + toSplit[1].slice(0, 2);
			let date = item.timestamp * 1000;
			// moment(date).format('DD.MM.YYYY h:m A');
			preparedData[index] = [date, item.price];
		});
	}

	let screenSize = window.screen.width;

	const options = {
		chart: {
			id: 'area-datetime',
			type: 'area',
			height: 350,
			zoom: {
				autoScaleYaxis: true,
			},
			toolbar: false,
		},
		dataLabels: {
			enabled: false,
		},
		markers: {
			// size: [0.2, 7],
			// style: 'hollow',
			// colors: ['#1C64F2'],
			// onClick: function (e) {
			// 	return console.log('vlaue');
			// },
		},
		xaxis: {
			type: 'datetime',
			tickAmount: 6,
		},
		yaxis: {
			show: false,
		},
		tooltip: {
			enabled: true,
			custom: function ({ series, seriesIndex, dataPointIndex }) {
				setTrackingPrice(series[seriesIndex][dataPointIndex]);
				return null;
			},
			x: {
				format: 'dd MMM yyyy',
			},
			// shared: false,
			// intersect: true,
		},
		fill: {
			colors: theme === 'dark' ? ['#233876'] : ['#E1EFFE'],
			type: 'pattern',
			pattern: {
				style: 'squares',
				width: 3,
				height: 3,
				strokeWidth: 1,
			},
		},
		grid: {
			show: false,
		},
		stroke: {
			show: true,
			curve: 'straight',
			lineCap: 'butt',
			colors: ['#1C64F2'],
			width: 2,
			dashArray: 0,
		},
	};

	const series = [
		{
			data: preparedData,
		},
	];

	const FilterChart = ({ time, title }) => {
		let classProps;
		if (timePeriod === time) {
			classProps = 'bg-primary text-white';
		} else {
			classProps = 'hover:bg-blue-500 hover:text-white';
		}
		return (
			<button
				className={`${classProps} border px-3 dark:border-primary py-0.5 mx-1 rounded-lg outline-none uppercase`}
				onClick={() => setTimePeriod(time)}
			>
				{title}
			</button>
		);
	};

	return (
		<div className='mb-12'>
			<div className='flex items-center justify-between px-2'>
				<p className='text-lg tracking-wide'>
					{/* {trackingChange.includes('-') ? (
						<span className='text-danger'>
							{cryptoChange}
							<em className='bi bi-chevron-down ml-1'></em>
						</span>
					) : (
						<span>{cryptoChange}</span>
					)} */}
					{trackingPrice && (
						<ToCurrency
							price={trackingPrice}
							type={defaultCurrency.symbol}
							digits={3}
						/>
					)}
				</p>
				<div>
					<FilterChart title='1h' time='1h' />
					<FilterChart title='1d' time='24h' />
					<FilterChart title='1w' time='7d' />
					<FilterChart title='1m' time='30d' />
					<FilterChart title='1y' time='1y' />
					<FilterChart title='all' time='5y' />
				</div>
			</div>
			<div onMouseLeave={() => setTrackingPrice(false)}>
				<Chart options={options} series={series} type='area' height={350} />
			</div>
		</div>
	);
};

export default PriceDetails;
