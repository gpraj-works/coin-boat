import AuthGet from '@/services/auth.get';
import useSWR from 'swr';
const fetcher = (url) => fetch(url).then((res) => res.json());

const UpdateList = async ({ WatchlistItem }) => {
	const response = await fetch('/api/watchlist', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		mode: 'cors',
		cache: 'default',
		body: JSON.stringify(WatchlistItem),
	});
	return await response.json();
};

const FetchWatchlist = () => {
	const User = AuthGet();
	const { data, isLoading } = useSWR(
		`/api/watchlist?userId=${User?._id}`,
		fetcher,
		{ refreshInterval: 1000 }
	);

	if (User && data !== undefined && data.data) {
		return Object.keys(data.data).splice(2);
	}
};

const HandleWatchlist = { UpdateList, FetchWatchlist };

export default HandleWatchlist;
