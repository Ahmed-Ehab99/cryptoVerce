import millify from "millify"
import { Typography, Row, Col, Statistic } from "antd"
import { Link } from "react-router-dom"
import { useGetCryptoCoinsQuery } from "../services/cryptoCoinsAPI"
import { Cryptocurrencies, News } from "../components"
import Loader from "./Loader"

const { Title } = Typography;

const Home = () => {
    const { data: cryptoStats, isFetching } = useGetCryptoCoinsQuery(12);
    const globalStats = cryptoStats?.data?.stats;
    if (isFetching) return <Loader />;

    return (
        <section>
            <Title level={2} className="heading">Global Crypto Stats</Title>
            <Row>
                <Col xs={24} md={12}><Statistic title="Total Cryptocurrencies" value={millify(globalStats.total)} /></Col>
                <Col xs={24} md={12}><Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)} /></Col>
                <Col xs={24} md={12}><Statistic title="Total 24h Volume" value={millify(globalStats.totalCoins)} /></Col>
                <Col xs={24} md={12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} /></Col>
                <Col xs={24} md={12}><Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)} /></Col>
                <Col xs={24} md={12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} /></Col>
            </Row>
            <div className="flex sm:flex-row flex-col justify-between sm:items-center items-start mt-10">
                <Title level={2} className="sm:text-3xl text-xl">Top 12 Cryptos In The World</Title>
                <Title level={3} className="!mt-0 sm:!text-2xl !text-xl"><Link to="/cryptocurrencies" className="hover:!text-pink">Show More</Link></Title>
            </div>
            <Cryptocurrencies simplified />
            <div className="flex sm:flex-row flex-col justify-between sm:items-center items-start mt-10">
                <Title level={2} className="sm:text-3xl text-xl">Latest Crypto News</Title>
                <Title level={3} className="!mt-0 sm:!text-2xl !text-xl"><Link to="/news" className="hover:!text-pink ">Show More</Link></Title>
            </div>
            <News simplified />
        </section>
    )
}

export default Home