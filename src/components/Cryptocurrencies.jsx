import { Card, Row, Col, Input } from "antd"
import millify from "millify"
import { Link } from "react-router-dom"
import { useGetCryptoCoinsQuery } from "../services/cryptoCoinsAPI"
import { useEffect, useState } from "react"
import  PropTypes  from 'prop-types';
import Loader from "./Loader"

const Cryptocurrencies = ({ simplified }) => {
    const count = simplified ? 12 : 100;
    const { data: cryptoCoinsList, isFetching } = useGetCryptoCoinsQuery(count);
    const [cryptoCoins, setCryptoCoins] = useState();
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        const filteredData = cryptoCoinsList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setCryptoCoins(filteredData);
    }, [cryptoCoinsList, searchTerm])
    if (isFetching) return <Loader/>;

    return (
        <section>
            {!simplified && (
                <div className="mx-auto mt-5 mb-8 w-64">
                    <Input placeholder="Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
            )}
            <Row gutter={[32, 32]} className="!min-h-[65vh]">
                {cryptoCoins?.map((currency) => (
                    <Col xs={24} sm={12} lg={6} className="min-w-[250px]" key={currency.uuid}>
                        <Link to={`/crypto/${currency.uuid}`}>
                            <Card title={`${currency.rank}. ${currency.name}`} extra={<img className="w-9" src={currency.iconUrl} alt={currency.name} />} hoverable>
                                <p>Price: {millify(currency.price)}</p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                <p>Daily Change: {millify(currency.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </section>
    )
}

Cryptocurrencies.propTypes = {
    simplified: PropTypes.bool
}

export default Cryptocurrencies