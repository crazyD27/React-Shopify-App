import React, {useState} from 'react';
import { Container } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
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
    const [activeLink, setActiveLink] = useState('1');
    const userName = localStorage.getItem('User_Name');

    const handleLinkClick = (event) => {
        setActiveLink(event.target.getAttribute('data-nav-link'));
    };
  return (
    <div className="sidebar">
        <Navbar bg="light" expand="md" fixed="left">
            <Container fluid>
                <NavLink to="/overview" className='d-flex align-items-center mb-3 px-3 user'>
                    <img src={User} alt='notification' style={{width: 45}} />
                    <p className='text-white mb-0 ms-3'>Hello, {userName}</p>
                </NavLink>
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                    defaultActiveKey="1"
                >
                    <NavLink to='/overview' className='text-white py-2'>
                        <img src={CampaignOverview} className="me-2" alt='menu-img' />
                        Campaign Overview
                    </NavLink>
                    <NavLink to='/manage' className='text-white py-2'>
                        <img src={Manage} className="me-2" alt='menu-img' />
                        Manage Campaign
                    </NavLink>
                    <NavLink to='/create' className='text-white py-2'>
                        <img src={CampNew} className="me-2" alt='menu-img' />
                        Create new Campaign
                    </NavLink>
                    <NavLink to='/market' className='text-white py-2'>
                        <img src={MarketPlace} className="me-2" alt='menu-img' />
                        Campaign Marketplace
                    </NavLink>
                    <NavLink to='/create-coupon' className='text-white py-2'>
                        <img src={Coupon} className="me-2" alt='menu-img' />
                        Coupon
                    </NavLink>
                    <NavLink to='/analytics' className='text-white py-2'>
                        <img src={AnalyticsImg} className="me-2" alt='menu-img' />
                        Analytics
                    </NavLink>
                    <NavLink to='/sales' className='text-white py-2'>
                        <img src={SalesImg} className="me-2" alt='menu-img' />
                        Sales
                    </NavLink>
                    <NavLink to='/profile' className='text-white py-2'>
                        <img src={ProfileImg} className="me-2" alt='menu-img' />
                        Profile
                    </NavLink>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}
export default SideBar;