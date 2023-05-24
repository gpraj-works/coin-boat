import { updateAccess } from '@/services/auth.utils';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

const Logout = () => {
	const router = useRouter();
	// const to = router.query.to;
	const dispatch = useDispatch();
	Cookies.remove('token');
	dispatch(updateAccess(false));
	router.push('/');
};

export default Logout;
