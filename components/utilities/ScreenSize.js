import { useState, useEffect } from 'react';

export const ScreenWidth = () => {
	const [windowWidth, setWindowWidth] = useState();

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setWindowWidth(window.screen.availWidth);
		}
	}, [setWindowWidth]);

	if (windowWidth <= 320) {
		return { unit: '2xs', value: 320 };
	} else if (windowWidth <= 480) {
		return { unit: 'xs', value: 480 };
	} else if (windowWidth <= 640) {
		return { unit: 'sm', value: 640 };
	} else if (windowWidth <= 768) {
		return { unit: 'md', value: 768 };
	} else if (windowWidth <= 1024) {
		return { unit: 'lg', value: 1024 };
	} else if (windowWidth <= 1280) {
		return { unit: 'xl', value: 1280 };
	} else if (windowWidth <= 1536) {
		return { unit: '2xl', value: 1536 };
	} else {
		return { unit: '3xl', value: 1536 };
	}
};
