import React, {useState, useContext, useEffect, useRef} from 'react';
import { Container } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import UserContext from '../context/UserContext';
import './sidebar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from "@fortawesome/free-solid-svg-icons";
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
    const [notifications, setNotifications] = useState([])
    const [shownotification, setShowNotification] = useState(false);
    const notificationsRef = useRef(null);
    const token = localStorage.getItem("Token");
    const profile_image = localStorage.getItem("Profile_Image")
    const handleLinkClick = (event) => {
        setActiveLink(event.target.getAttribute('data-nav-link'));
    };
    const {image, userName} = useContext(UserContext);
    const name = localStorage.getItem("User_Name");
    // console.log("Name in Sidebar", name)
    console.log("NAMEEEEE", localStorage.getItem("User_Name"))
    console.log("Image in SIdebar", image)

    const handleNotifications = () => {
        setShowNotification(!shownotification);
    }

    useEffect(() => {
        axios.get(API.BASE_URL + 'notification/list/',{
            headers: { 
                Authorization: `Token ${token}` 
            }
        })
        .then(function (response) {
            console.log("Notification", response.data)
            setNotifications(response.data.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    }, [])

    useEffect(() => {
        const intervalId = setInterval(() => {
        axios.get(API.BASE_URL + 'notification/list/',{
            headers: { 
                Authorization: `Token ${token}` 
            }
        })
        .then(function (response) {
            console.log("Notification", response.data)
            setNotifications(response.data.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    }, 5000);
    return () => clearInterval(intervalId);
    }, [])

    useEffect(() => {
        const handleOutsideClick = (event) => {
          if (
            notificationsRef.current &&
            !notificationsRef.current.contains(event.target)
          ) {
            setShowNotification(false);
          }
        };
        document.addEventListener("click", handleOutsideClick);
        return () => {
          document.removeEventListener("click", handleOutsideClick);
        };
      }, []);

    const handleClearNotifications = () => {
        axios.get(API.BASE_URL + 'change/status/',{
            headers: { 
                Authorization: `Token ${token}` 
            }
        })
        .then(function (response) {
            console.log("Status", response.data);
            setNotifications([])
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    console.log(localStorage.getItem("Image"))
  return (
    <div className="sidebar">
        <div className='notifications' style={{cursor: 'pointer'}} onClick={() => {handleNotifications()}} ref={notificationsRef}>
            <span>{notifications?.length ? notifications.length : 0}</span>
            <FontAwesomeIcon 
                icon={faBell}
                style={{
                    color: "#0d6efd",
                    width: "20px",
                    height: "20px",
                }}
            />
        </div>
        {shownotification === true && (
            notifications?.length > 0 ? (
                <ul className="notification-list">
                    <button onClick={(e) => {handleClearNotifications(e)}}>clear all</button>
                    {notifications?.map((data) => {
                    return <li>{data.message}</li>;
                    })}
                </ul>
            ) : <ul className="notification-list"><li style={{textAlign: 'center'}}>No Notifications</li></ul>
        )}
        <Navbar bg="light" expand="md" fixed="left">
            <Container fluid>

                <NavLink to="/" className='d-flex align-items-center px-3 user'>
                    {localStorage.getItem("Image") !=null ? (
                        <img src={image ? 'https://' + image : profile_image ? 'https://' + profile_image : 'https://' + localStorage.getItem("Image")} alt='notification' style={{width: 45}} />
                    ):
                    <img src={User} alt='notification' style={{width: 45}} />}
                    
                    <p className='text-white mb-0 ms-3'>Hello, {userName ? userName : 'User123'}</p>
                    
                </NavLink>
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                    activeKey="/dashboard"
                >
                    <NavLink to='/dashboard' className='text-white py-2'>
                        <img src={CampaignOverview} className="me-2" alt='menu-img' />
                        Campaign Overview
                    </NavLink>
                    <NavLink to='/manage' className='text-white py-2'>
                        <img src={Manage} className="me-2" alt='menu-img' />
                        Campaign Influencer
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