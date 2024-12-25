import { Typography } from "antd"

const Footer = () => {
    return (
        <footer className="bg-darkBlue flex flex-col p-5 items-center">
            <Typography.Title level={5} className="text-white text-center !mb-0">
                Cryptoverse | All rights reserved.
            </Typography.Title>
        </footer>
    )
}

export default Footer