import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router'
import ScrollToTop from '../components/ScrollToTop'

const Layout = () => {
    
  return (
    <div className="w-[100%] m-0 p-0 overflow-hidden">
        <Header />
        <ScrollToTop />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Layout