import Head from 'next/head';
import { Header } from 'components';

export default function Home() {
	return (
		<>
			<Head>
				<title>CoinBoat | The Coin Market</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/images/brand/favicon.ico' />
			</Head>
			<Header />
		</>
	);
}
