import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { updateAccess } from '@/services/auth.utils';
const fetcher = (url) => fetch(url).then((res) => res.json());

const AuthGet = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const token = Cookies.get('token');
	const { data: authTest, isLoading: authTesting } = useSWR(
		`/api/account/auth?token=${token}`,
		fetcher
	);

	if (!token) {
		dispatch(updateAccess(false));
		return false;
	}

	if (authTest?.message?.name === 'TokenExpiredError') {
		dispatch(updateAccess(false));
		return false;
	} else {
		return authTest?.data?.user;
	}
};

export default AuthGet;
