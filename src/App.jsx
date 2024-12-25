import { Routes, Route } from "react-router-dom"
import { Layout } from "antd"
import { Navbar, Home, Cryptocurrencies, CryptoDetails, News } from "./components"
import Footer from "./components/Footer"

const App = () => {
  return (
    <div className="flex overflow-hidden xl:flex-row flex-col">
      <div className="xl:flex-[0.2] flex-1 bg-darkBlue">
        <Navbar />
      </div>
      <div className="xl:flex-[0.8] flex-1 xl:w-full xl:mt-0 mt-20 ml-0">
        <Layout>
          <div className="p-5">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
              <Route path="/crypto/:coinId" element={<CryptoDetails />} />
              <Route path="/news" element={<News />} />
            </Routes>
          </div>
        </Layout>
        <Footer />
      </div>
    </div>
  )
}

export default App
