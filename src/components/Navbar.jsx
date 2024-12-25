import { Avatar, Button, Menu, Typography } from "antd"
import { Link } from "react-router-dom"
import { HomeOutlined, BulbOutlined, FundOutlined, MenuOutlined } from "@ant-design/icons"
import icon from '../images/cryptocurrency.png'
import { useEffect, useState } from "react"

const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(undefined);
    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    useEffect(() => {
        if (screenSize <= 1024) {
            setActiveMenu(false);
        } else {
            setActiveMenu(true);
        }
    }, [screenSize]);
    const menuItems = [
        {
            key: 'home',
            icon: <HomeOutlined />,
            label: <Link to="/" className="hover:!text-pink">Home</Link>,
        },
        {
            key: 'cryptocurrencies',
            icon: <FundOutlined />,
            label: <Link to="/cryptocurrencies" className="hover:!text-pink">Cryptocurrencies</Link>,
        },
        {
            key: 'news',
            icon: <BulbOutlined />,
            label: <Link to="/news" className="hover:!text-pink">News</Link>,
        },
    ];

    return (
        <header className="fixed xl:left-0 m-0 xl:h-screen xl:bg-darkBlue xl:w-auto w-full z-50 bg-darkBlue top-0">
            <div className="flex p-5 items-center w-full">
                <Avatar src={icon} size="large" />
                <Typography.Title level={2} className="mb-0 ml-4 xl:text-3xl text-xl">
                    <Link to="/" className="text-white hover:!text-pink focus-visible:!outline-none">CryptoVerse</Link>
                </Typography.Title>
                <Button className="xl:!hidden !block !absolute !right-3 !top-6 !text-base !bg-bgSecondary !border-none" onClick={() => setActiveMenu(!activeMenu)}><MenuOutlined /></Button>
            </div>
            <nav>
                {activeMenu && (
                    <Menu className="xl:relative absolute xl:left-0 right-0 " theme="dark" items={menuItems} onClick={() => { if (screenSize <= 800) setActiveMenu(!activeMenu) }} />
                )}
            </nav>
        </header>
    )
}

export default Navbar