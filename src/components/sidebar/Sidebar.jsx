import React, {useState, useContext, useEffect, useRef} from 'react';
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
import Notification from '../../assests/img/notification.png';
import NoNotification from '../../assests/img/no-notification.png';

const SideBar = () => {
    const [notifications, setNotifications] = useState([])
    const [shownotification, setShowNotification] = useState(false);
    const notificationsRef = useRef(null);
    const token = localStorage.getItem("Token");
    const name = localStorage.getItem("User_Name");
    // console.log("Name in Sidebar", name)
    console.log("NAMEEEEE", localStorage.getItem("User_Name"))

    const handleNotifications = () => {
        setShowNotification(!shownotification);
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
        axios.get(API.BASE_URL + 'notification/list/',{
            headers: { 
                Authorization: `Token ${localStorage.getItem("Token")}` 
            }
        })
        .then(function (response) {
            console.log("Notification", response.data)
            setNotifications(response.data.data);
        })
        .catch(function (error) {
            console.log(error);
        })
        axios.get(API.BASE_URL + 'user/id/',  {
            headers: { 
                Authorization: `Token ${localStorage.getItem("Token")}` 
            }
        }) 
        .then(function (response) {
            console.log("Profile Details in Sidebar", response);
            localStorage.setItem("Image", response.data.url);
            localStorage.setItem("User_Name", response.data.username);
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
                Authorization: `Token ${localStorage.getItem("Token")}` 
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
            {notifications?.length > 0 ?
                <img src={Notification} alt='notification' style={{height: 24, width: 24, objectFit: 'contain'}} />
             : <img src={NoNotification} alt='notification' style={{height: 24, width: 24, objectFit: 'contain'}} />}
        </div>
        <ul className= {shownotification === true ? "notification-list active" : "notification-list"}>
        {shownotification === true && (
            notifications?.length > 0 ? (
                    <>
                        <button onClick={(e) => {handleClearNotifications(e)}}>clear all</button>
                        {notifications?.map((data) => {
                        return <li>{data.message}</li>;
                        })}
                    </>
            ) : <li style={{textAlign: 'center'}}>No Notifications</li>
        )}
        </ul>
        <Navbar bg="light" expand="md" fixed="left">
            <Container fluid>

                <NavLink to="/" className='d-flex flex-column align-items-center px-3 user'>
                    <div className="user-img d-flex align-items-center justify-content-center">
                        {localStorage.getItem("Image") !=null ? (
                            <img src={'https://' + localStorage.getItem("Image")} alt='notification' />
                        ):
                        <img src={User} alt='notification' />}
                    </div>
                    
                    <p className='text-black mb-5 mt-3'>Hello, <strong>{name ? name : 'User'}</strong></p>
                    
                </NavLink>
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                        activeKey="/dashboard"
                    >
                        <NavLink to='/dashboard' className='text-black py-2'>
                            <img src={CampaignOverview} className="me-2" alt='menu-img' />
                            Campaign Overview
                        </NavLink>
                        <NavLink to='/manage' className='text-black py-2'>
                            <img src={Manage} className="me-2" alt='menu-img' />
                            Campaign Influencer
                        </NavLink>
                        <NavLink to='/create' className='text-black py-2' exact>
                            <img src={CampNew} className="me-2" alt='menu-img' />
                            Create new Campaign
                        </NavLink>
                        <NavLink to='/market' className='text-black py-2'>
                            <img src={MarketPlace} className="me-2" alt='menu-img' />
                            Campaign Marketplace
                        </NavLink>
                        <NavLink to='/create-coupon' className='text-black py-2'>
                            <img src={Coupon} className="me-2" alt='menu-img' />
                            Coupon
                        </NavLink>
                        <NavLink to='/analytics' className='text-black py-2'>
                            <img src={AnalyticsImg} className="me-2" alt='menu-img' />
                            Analytics
                        </NavLink>
                        <NavLink to='/sales' className='text-black py-2'>
                            <img src={SalesImg} className="me-2" alt='menu-img' />
                            Sales
                        </NavLink>
                        <NavLink to='/profile' className='text-black py-2'>
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