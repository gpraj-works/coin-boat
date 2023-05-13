import PriceDetails from './overview/PriceDetails';
import MarketStats from './overview/MarketStats';
import Historical from './overview/Historical';
import Description from './about/Description';
import SocialMedia from './about/SocialMedia';
import News from './about/News';
import AssetDetails from './overview/AssetDetails';

const CoinOverview = ({ about, defaultCurrency }) => {
	return (
		<>
			<PriceDetails price={about.price} uuid={about.uuid} />
			<div className='flex justify-between md:flex-row flex-col'>
				<MarketStats defaultCurrency={defaultCurrency} about={about} />
				<div className='mx-8'></div>
				<AssetDetails defaultCurrency={defaultCurrency} symbol={about.symbol} />
			</div>
			{/* PAID-ENDPOINT */}
			<Historical defaultCurrency={defaultCurrency} symbol={about.symbol} />
			<Description
				defaultCurrency={defaultCurrency}
				symbol={about.symbol}
				githubLink={
					about.links.filter((link) => link.type === 'github' && link)[0]
				}
			/>
			<SocialMedia links={about.links} />
			<News coinName={about.name} />
		</>
	);
};

export default CoinOverview;
