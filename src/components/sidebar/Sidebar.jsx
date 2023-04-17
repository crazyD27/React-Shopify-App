import React, {useState} from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './sidebar.scss';

// Images
import CampaignOverview from '../../assests/img/campaign-over.png';
import Manage from '../../assests/img/manage.png';
import CampNew from '../../assests/img/campaign-new.png';
import MarketPlace from '../../assests/img/marketplace.png';
import Coupon from '../../assests/img/coupon.png';
import AnalyticsImg from '../../assests/img/analytics.png';
import SalesImg from '../../assests/img/sales.png';
import ProfileImg from '../../assests/img/profile.png';
import User from '../../assests/img/user.png';

const SideBar = () => {
    const [activeLink, setActiveLink] = useState('overview');

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

const userName = localStorage.getItem("User_Name")
  return (
    <div className="sidebar">
        <Navbar bg="light" expand="md" fixed="left">
            <Container fluid>
                <Link to="/overview" className='px-4 d-flex align-items-center mb-3 user'>
                    <img src={User} alt='notification' style={{width: 45}} />
                    <p className='text-white mb-0 ms-3'>Hello, {userName}</p>
                </Link>
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                    defaultActiveKey="1"
                >
                    <Link to='/overview' className="text-white py-2 mb-2">
                        <img src={CampaignOverview} className="me-2" alt='menu-img' />
                        Campaign Overview
                    </Link><Link to='/manage' className="text-white py-2 mb-2">
                        <img src={Manage} className="me-2" alt='menu-img' />
                        Manage Campaign
                    </Link><Link to='/create' className="text-white py-2 mb-2">
                        <img src={CampNew} className="me-2" alt='menu-img' />
                        Create new Campaign
                    </Link>
                    <Link to='/market' className="text-white py-2 mb-2">
                        <img src={MarketPlace} className="me-2" alt='menu-img' />
                        Campaign Marketplace
                    </Link>
                    <Link to='/create-coupon' className="text-white py-2 mb-2">
                        <img src={Coupon} className="me-2" alt='menu-img' />
                        Coupon
                    </Link>
                    <Link to='/analytics' className="text-white py-2 mb-2">
                        <img src={AnalyticsImg} className="me-2" alt='menu-img' />
                        Analytics
                    </Link>
                    <Link to='/sales' className="text-white py-2 mb-2">
                        <img src={SalesImg} className="me-2" alt='menu-img' />
                        Sales
                    </Link>
                    <Link to='/profile' className="text-white py-2 mb-2">
                        <img src={ProfileImg} className="me-2" alt='menu-img' />
                        Profile
                    </Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}

export default SideBar;
