import PropTypes from 'prop-types';
import { useGetAllCryptoNewsQuery } from "../services/allCryptoNewsAPI";
import { useGetTopCryptoNewsQuery } from "../services/topCryptoNewsAPI"
import { useState } from "react";
import Loader from "./Loader";
import { Typography, Col, Card, Row, Select } from "antd"
import { formatDistanceToNow } from 'date-fns';

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
    const [selectedAuthor, setSelectedAuthor] = useState("");
    const { data: topCryptoNews, isFetching: fetchingTopCryptoNews } = useGetTopCryptoNewsQuery();
    const { data: allCryptoNews, isFetching: fetchingAllCryptoNews } = useGetAllCryptoNewsQuery();
    if (fetchingAllCryptoNews || fetchingTopCryptoNews) return <Loader />;
    const filteredNews = selectedAuthor
        ? allCryptoNews?.filter(news => news?.authors[0]?.name === selectedAuthor)
        : allCryptoNews;
    const uniqueAuthor = Array.from(new Set(allCryptoNews?.map(news => news?.authors[0]?.name)));

    return (
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        placeholder="Select a news author"
                        onChange={value => setSelectedAuthor(value)}
                        className="sm:!w-52 w-full mb-5"
                    >
                        {uniqueAuthor?.map((author, i) => (
                            <Option key={i} value={author}>
                                {author}
                            </Option>
                        ))}
                    </Select>
                </Col>
            )}
            {simplified ? (
                topCryptoNews.map((news, i) => (
                    <Col xs={24} sm={12} lg={8} key={i}>
                        <a href={news?.url} target="_blank">
                            <Card hoverable className="!min-h-[300px] relative">
                                <div className="!flex !justify-between">
                                    <Title level={4} className="line-clamp-2">{news?.title}</Title>
                                    <img src={news?.thumbnail} alt="news" className="size-[100px] rounded" />
                                </div>
                                <p className="text-black !mx-0 !my-3 line-clamp-3">{news?.description}</p>
                                <Text className="font-bold absolute bottom-[24px] left-[24px]">{news?.date ? formatDistanceToNow(new Date(news.date), { addSuffix: true }) : "Unknown date"}</Text>
                            </Card>
                        </a>
                    </Col>
                ))
            ) : (
                filteredNews.map((news, i) => (
                    <Col xs={24} sm={12} lg={8} key={i}>
                        <a href={news?.link} target="_blank">
                            <Card hoverable className="!min-h-[300px] relative">
                                <div className="!flex !justify-between">
                                    <Title level={4} className="line-clamp-2">{news?.title}</Title>
                                    <img src={news?.media} alt="news" className="size-[100px] rounded" />
                                </div>
                                <p className="text-black !mx-0 !my-3 line-clamp-4">{news?.summary}</p>
                                <div className="!flex sm:flex-row flex-col !justify-between sm:!items-center items-start sm:gap-0 gap-5 font-bold">
                                    <Text>{news?.authors[0]?.name}</Text>
                                    <Text>{news?.published ? formatDistanceToNow(new Date(news.published), { addSuffix: true }) : "Unknown date"}</Text>
                                </div>
                            </Card>
                        </a>
                    </Col>
                ))
            )}
        </Row>
    )
}

News.propTypes = {
    simplified: PropTypes.bool
}

export default News