import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useGetCryptoCoinDetailsQuery } from '../services/cryptoCoinsAPI';
import Loader from './Loader';

const { Title, Text } = Typography;

const CryptoDetails = () => {
    const { coinId } = useParams();
    const { data, isFetching } = useGetCryptoCoinDetailsQuery(coinId);
    const cryptoDetails = data?.data?.coin;
    if (isFetching) return <Loader />;
    const stats = [
        { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${cryptoDetails?.["24hVolume"] && millify(cryptoDetails?.["24hVolume"])}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
    ];
    const genericStats = [
        { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
    ];

    return (
        <Col className="m-7">
            <Col className="flex justify-center md:items-center items-start flex-col border-b border-solid border-border pt-5 pb-5 gap-3">
                <Title level={2} className="font-black text-pink md:text-3xl text-xl">
                    {data?.data?.coin.name} ({data?.data?.coin.symbol}) Price
                </Title>
                <p className='text-base opacity-90 mb-5'>{cryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
            </Col>
            <Col className="grid lg:grid-cols-2 grid-cols-1 gap-10">
                <Col>
                    <Col>
                        <Title level={3} className="!font-bold md:text-3xl text-xl !mt-5 !text-pink">{cryptoDetails.name} Value Statistics</Title>
                        <p className='text-base opacity-90'>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
                    </Col>
                    {stats.map(({ icon, title, value }) => (
                        <Col className="flex sm:flex-row flex-col sm:gap-0 gap-5 justify-between border-b border-solid border-border text-base opacity-90 p-5 pl-0 hover:bg-bgSecondary" key={title}>
                            <Col className="flex gap-3 text-base">
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className="font-extrabold">{value}</Text>
                        </Col>
                    ))}
                </Col>
                <Col>
                    <Col>
                        <Title level={3} className="!font-bold md:text-3xl text-xl !mt-5 !text-pink">Other Stats Info</Title>
                        <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
                    </Col>
                    {genericStats.map(({ icon, title, value }) => (
                        <Col className="flex sm:flex-row flex-col sm:gap-0 gap-5 justify-between border-b border-solid border-border text-base opacity-90 p-5 pl-0 hover:bg-bgSecondary" key={title}>
                            <Col className="flex gap-3 text-base">
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className="font-extrabold">{value}</Text>
                        </Col>
                    ))}
                </Col>
            </Col>
            <Col className="grid lg:grid-cols-2 grid-cols-1 gap-10 mt-10 pt-5">
                <Col className="flex flex-col gap-5">
                    <Title level={3} className="!font-bold !mt-5 md:text-3xl text-xl !text-pink">What is {cryptoDetails.name}?</Title>
                    <p className='text-base opacity-90'>{cryptoDetails.description}</p>
                </Col>
                <Col>
                    <Title level={3} className="!font-bold md:text-3xl text-xl !mt-5 !text-pink">{cryptoDetails.name} Links</Title>
                    {cryptoDetails.links?.map((link, index) => (
                        <Row className="flex sm:flex-row flex-col sm:gap-0 gap-5 justify-between sm:items-center items-start border-b border-solid border-border p-5 pl-0 hover:bg-bgSecondary" key={`${link.type}-${index}`}>
                            <Title level={5} className="capitalize text-base">{link.type}</Title>
                            <a href={link.url} target="_blank" rel="noreferrer" className='text-pink hover:!text-pink font-bold text-base'>{link.name}</a>
                        </Row>
                    ))}
                </Col>
            </Col>
        </Col>
    )
}

export default CryptoDetails