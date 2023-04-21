import { Routes, Route, redirect } from 'react-router-dom';
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
import CreateCampaign from '../components/pages/CreateCampaign';
import CreateInfluencer from '../components/pages/CreateInfluencer';

const Routing = () => {
  return (
      
    <div className="routes">
      <SideBar />
      <Routes>
        <Route path='/' element={<CampaignOver />} />
        <Route exact path='/dashboard' element={<CampaignOver />} />
        <Route path='/overview' element={<CampaignOver />} />
        <Route path='/create' element={<CampaignNew />} />
        <Route path='/manage' element={<CampaignManage />} />
        <Route path='/market' element={<CampaignMarket />} />
        <Route path='/create-coupon' element={<CouponList />} />
        <Route path='/analytics' element={<Analytics />} />
        <Route path='/sales' element={<Sales />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/create-campaign' element={<CreateCampaign />} />
        <Route path='/create-campaign/:id' element={<CreateCampaign />} />
        <Route path='/create-influencer' element={<CreateInfluencer />} />
        <Route path='/create-influencer/:id' element={<CreateInfluencer />} />
      </Routes>
    </div>
  );
}

export default Routing;