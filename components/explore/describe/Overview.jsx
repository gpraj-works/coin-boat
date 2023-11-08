import PriceDetails from './overview/PriceDetails';
import MarketStats from './overview/MarketStats';
import Historical from './overview/Historical';
import Description from './about/Description';
import SocialMedia from './about/SocialMedia';
import News from './about/News';
import AssetDetails from './overview/AssetDetails';
import Markets from './Markets';
import { useSelector } from 'react-redux';
import { GetScrollPosition, ScrollTo } from '@/components/components.utils';
import Exchanges from './Exchanges';

const CoinOverview = ({ about, defaultCurrency }) => {
	const parentTab = useSelector((state) => state.currencyUtils.tabNames.parent);
	const childTab = useSelector((state) => state.currencyUtils.tabNames.child);

	switch (childTab) {
		case 'price_details':
			ScrollTo(0);
			break;

		case 'market_stats':
			ScrollTo(650);
			break;

		case 'historical':
			ScrollTo(1300);
			break;

		case 'social_media':
			ScrollTo(700);
			break;

		default:
			ScrollTo(0);
	}

	return (
		<>
			{parentTab === 'overview' && (
				<>
					<PriceDetails price={about.price} uuid={about.uuid} />
					<div className='flex justify-between md:flex-row flex-col'>
						<MarketStats defaultCurrency={defaultCurrency} about={about} />
						<div className='mx-8'></div>
						<AssetDetails
							defaultCurrency={defaultCurrency}
							symbol={about.symbol}
						/>
					</div>
					<Historical defaultCurrency={defaultCurrency} symbol={about.symbol} />
				</>
			)}
			{parentTab === 'about' && (
				<>
					<Description
						defaultCurrency={defaultCurrency}
						symbol={about.symbol}
						githubLink={
							about.links.filter((link) => link.type === 'github' && link)[0]
						}
					/>
					<SocialMedia links={about.links} />
				</>
			)}
			{parentTab === 'markets' && (
				<>
					<Markets defaultCurrency={defaultCurrency} refSymbol={about.symbol} />
				</>
			)}
			{parentTab === 'exchanges' && (
				<>
					<Exchanges
						defaultCurrency={defaultCurrency}
						refSymbol={about.symbol}
					/>
				</>
			)}
			{parentTab === 'latest_news' && (
				<>
					<News refSymbol={about.symbol} />
				</>
			)}
		</>
	);
};

export default CoinOverview;
