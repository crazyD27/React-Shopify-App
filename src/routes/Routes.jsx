import { Routes, Route } from 'react-router-dom';
import Home from '../components/home/Home';
import SideBar from '../components/sidebar/Sidebar';
import CampaignOver from '../components/pages/CampaignOver';
import CampaignNew from '../components/pages/CampaignNew';
import CampaignManage from '../components/pages/CampaignManage';
import CampaignMarket from '../components/pages/CampaignMarket.jsx';
import CouponList from '../components/pages/CouponList';
import Analytics from '../components/pages/Analytics';
import Sales from '../components/pages/Sales';
import Profile from '../components/pages/Profile';

const Routing = () => {
  return (
      
    <div className="routes">
      <SideBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<CampaignOver />} />
        <Route path='/overview' element={<CampaignOver />} />
        <Route path='/create' element={<CampaignNew />} />
        <Route path='/manage' element={<CampaignManage />} />
        <Route path='/market' element={<CampaignMarket />} />
        <Route path='/create-coupon' element={<CouponList />} />
        <Route path='/analytics' element={<Analytics />} />
        <Route path='/sales' element={<Sales />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </div>
  );
}

export default Routing;