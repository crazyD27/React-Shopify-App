import React, {useState, useContext, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import UserContext from '../context/UserContext';
import './sidebar.scss';
import axios from 'axios';
import { API } from '../../config/Api';

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
    const token = localStorage.getItem("Token");
    const handleLinkClick = (event) => {
        setActiveLink(event.target.getAttribute('data-nav-link'));
    };
    const {name, image} = useContext(UserContext)

    console.log("Name in Sidebar", name)
    console.log("Image in SIdebar", image)

    // useEffect(() => {
    //     axios.get(API.BASE_URL + 'user/id/',  {
    //         headers: {
    //             Authorization: `Token ${token}`
    //         }
    //     })
    //     .then(function (response) {
    //         console.log("Profile Details", response);
    //         // setImage(response.data.url)
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
    // }, [token])
  return (
    <div className="sidebar">
        <Navbar bg="light" expand="md" fixed="left">
            <Container fluid>
                <NavLink to="/overview" className='d-flex align-items-center mb-3 px-3 user'>
                    {image != "" || localStorage.getItem("Image") != ""|| localStorage.getItem("Image") != undefined || localStorage.getItem("Image") != null || image != null || image != undefined ? (
                        <img src={image !="" ? 'https://' + image : 'https://' + localStorage.getItem("Image")} alt='notification' style={{width: 45}} />
                    ) :
                    <img src={User} alt='notification' style={{width: 45}} />}
                    
                    <p className='text-white mb-0 ms-3'>Hello, {name != "" ? name : localStorage.getItem("User_Name")}</p>
                </NavLink>
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                    activeKey="/overview"
                >
                    <NavLink to='/overview' className='text-white py-2'>
                        <img src={CampaignOverview} className="me-2" alt='menu-img' />
                        Campaign Overview
                    </NavLink>
                    <NavLink to='/manage' className='text-white py-2'>
                        <img src={Manage} className="me-2" alt='menu-img' />
                        Manage Campaign
                    </NavLink>
                    <NavLink to='/create' className='text-white py-2' exact>
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