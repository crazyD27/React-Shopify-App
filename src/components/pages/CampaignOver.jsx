import { useEffect, useState, useContext } from 'react';
import UserContext from '../context/UserContext';
import { Link } from 'react-router-dom';
import MenuBar from '../navbar/Navbar';
import './pages.scss';
import axios from 'axios';
import { API } from '../../config/Api';
import SideBar from '../sidebar/Sidebar';

// Images
import Tracking from '../../assests/img/tracking.png';
import Recruit from '../../assests/img/recruit.png';
import Setting from '../../assests/img/settings.png';
import Payments from '../../assests/img/payments.png';
import Like from '../../assests/img/like.png';
import Date from '../../assests/img/date.png';
import Chat from '../../assests/img/chat.png';
import Join from '../../assests/img/join.png';
import Question from '../../assests/img/question.png';

const CampaignOver = () => {
    const {setUserToken, setInfluenceList, countCamp, setCountCamp} = useContext(UserContext);

    
    useEffect(() => {
        setTimeout(() => {
            console.log("TOKEN APIIII")
        axios.post(API.BASE_URL + 'get/token/', {
            shop_name: localStorage.getItem('shop_url')
        })
        .then(function (response) {
            console.log("Shop Token", response);
            setUserToken(response.data.user_token);
            localStorage.setItem("Token", response.data.user_token);

            axios.get(API.BASE_URL + 'influencer/list/',{
                headers: {
                    Authorization: `Token ${response.data.user_token}`
            }})
            .then(function (response) {
                console.log("Influencer List", response);
                setInfluenceList(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            })
        })
        .catch(function (error) {
            console.log(error);
        })
        axios.get(API.BASE_URL + 'user/id/',{
            headers: {
                Authorization: `Token ${token}`
        }})
        .then(function (response) {
            console.log("User ID", response);
            localStorage.setItem("User_ID", response.data.user_id)
            localStorage.setItem("User_Name", response.data.username)
        })
        .catch(function (error) {
            console.log(error);
        })
    }, 4000)

    }, [])


    const token = localStorage.getItem('Token')

    useEffect(() => {
        if(token && token !== "") {
            axios.get(API.BASE_URL + 'count/',{
                headers: {
                    Authorization: 'Token ' + localStorage.getItem('Token')
                }
            })
            .then(function (response) {
                console.log("Count List", response);
                setCountCamp(response.data);
                console.log(countCamp)
            })
            .catch(function (error) {
                console.log(error);
            })
        }
    }, [token])
    
  return (
    <>
    <div className="campaign-over p-3 page">
        <h2 className='text-left w-100 main-heading mt-3'>Welcome to <strong style={{color: '#2657b4'}}>Dashboard</strong></h2>
        {/* <MenuBar /> */}
        <div className="campaign-over-container d-flex flex-column justify-content-center align-items-center mt-4 w-100">
            <div className="overview-container w-100 bg-light p-4">
                <h3 className='mb-3'>Overview</h3>
                <div className="overview-list d-flex flex-wrap justify-content-between align-items-center">
                    <div className="overview-box d-flex align-items-start justify-content-between mb-4">
                        <div className="overview-content">
                            <h5>Active Campaigns</h5>
                            <h3 className="mb-0">{countCamp.active_campaign ? countCamp.active_campaign : 0}</h3>
                            {/* <button>View</button> */}
                        </div>
                        {/* <div className="overview-image">
                            <img src={People} alt="overview-img" />
                        </div> */}
                    </div>
                    <div className="overview-box d-flex align-items-start justify-content-between mb-4">
                        <div className="overview-content">
                            <h5>Pending Campaigns</h5>
                            <h3 className="mb-0">{countCamp.pending_campaign ? countCamp.pending_campaign : 0}</h3>
                            {/* <button>View</button> */}
                        </div>
                        {/* <div className="overview-image">
                            <img src={Cursor} alt="overview-img" />
                        </div> */}
                    </div>
                    <div className="overview-box d-flex align-items-start justify-content-between mb-4">
                        <div className="overview-content">
                            <h5>Total Campaigns</h5>
                            <h3 className="mb-0">{countCamp.total ? countCamp.total : 0}</h3>
                            {/* <button>View</button> */}
                        </div>
                        {/* <div className="overview-image">
                            <img src={Completed} alt="overview-img" />
                        </div> */}
                    </div>
                    <div className="overview-box d-flex align-items-start justify-content-between mb-4">
                        <div className="overview-content">
                            <h5>Sales Campaigns</h5>
                            <h3 className="mb-0">0</h3>
                            {/* <button>View</button> */}
                        </div>
                        {/* <div className="overview-image">
                            <img src={Money} alt="overview-img" />
                        </div> */}
                    </div>
                </div>
            </div>
            {/* <div className="recommendation-container w-100 mt-4">
                <h3 className='bg-light p-2 mb-0'>Recommendations</h3>
                <div className="recommendation-list d-flex justify-content-between p-4">
                    <div className="recommendation-box">
                        <h4>Suggestions</h4>
                        <ul>
                            <li>Assign coupons  to affiliates so they could promote by store discounts.</li>
                            <li>Upload media resources as marketing tools for affiliates.</li>
                            <li>Send gifts  as sample products to motivate affiliates.</li>
                            <li>Reward affiliates by bonuses  to encourage them to drive more sales.</li>
                        </ul>
                    </div>
                    <div className="recommendation-box">
                        <h2>UpPromote topic webinar</h2>
                        <p>Affiliate empowerment & motivation</p>
                        <div className="buttons">
                            <Link to="/" className="button button-blue">Join the webinar</Link>
                        </div>
                    </div>
                </div>
            </div> */}
            {/* <div className="feature-container mt-5 bg-light w-100">
                <h3 className='p-3'>Feature directory</h3>
                <div className="feature-list d-flex justify-content-between flex-wrap p-3">
                    <div className="feature-box px-3 py-4">
                        <div className="feature-heading d-flex justify-content-between align-items-start">
                            <h5>Offer & Tracking</h5>
                            <img src={Tracking} alt="feature-img" />
                        </div>
                        <ul>
                            <li> Add/edit a program</li>
                            <li> Commission on order value</li>
                            <li> Assign affiliate coupon</li>
                        </ul>
                        <div className="buttons">
                            <Link to='/' className="button button-blue">Popular</Link>
                        </div>
                    </div>
                    <div className="feature-box px-3 py-4">
                        <div className="feature-heading d-flex justify-content-between align-items-start">
                            <h5>Recruit affiliates</h5>
                            <img src={Recruit} alt="feature-img" />
                        </div>
                        <ul>
                            <li> Marketplace listing</li>
                            <li> Convert customers to affiliates <strong>*</strong></li>
                            <li> Customer referral</li>
                        </ul>
                        <div className="buttons">
                            <Link to='/' className="button button-blue">Popular</Link>
                        </div>
                    </div>
                    <div className="feature-box px-3 py-4">
                        <div className="feature-heading d-flex justify-content-between align-items-start">
                            <h5>Manage affiliates</h5>
                            <img src={Setting} alt="feature-img" />
                        </div>
                        <ul>
                            <li> Chat with affiliates <strong>*</strong></li>
                            <li> Affiliate registration form</li>
                            <li> Media gallery</li>
                        </ul>
                        <div className="buttons">
                            <Link to='/' className="button button-blue">Popular</Link>
                        </div>
                    </div>
                    <div className="feature-box px-3 py-4">
                        <div className="feature-heading d-flex justify-content-between align-items-start">
                            <h5>Conversion and payments </h5>
                            <img src={Payments} alt="feature-img" />
                        </div>
                        <ul>
                            <li> Approve/deny a referral</li>
                            <li> Payment method</li>
                            <li> PayPal integration <strong>*</strong></li>
                        </ul>
                        <div className="buttons">
                            <Link to='/' className="button button-blue">Popular</Link>
                        </div>
                    </div>
                </div>
                <div className="feature-bottom p-3 pt-4 mt-3 d-flex justify-content-between align-items-center">
                    <div className="buttons">
                        <Link to='/' className='button button-blue'>View All</Link>
                    </div>
                    <div className="feature-content d-flex justify-content-between">
                        <p className='text-dark me-4'>Do you find this feature directory helpful?</p>
                        <div className="react-icons ms-5">
                            <button><img src={Like} alt="like" /></button>
                            <button><img src={Like} alt="dislike" /></button>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="support-container mt-4 bg-light w-100 p-3">
                <h3>Get Support</h3>
                <div className="support-list d-flex justify-content-between flex-wrap">
                    <div className="support-box d-flex mb-5 p-4 align-items-start">
                        <img src={Chat} alt="support-img" className='me-3' />
                        <h5 className='mb-0'>Chat with support team</h5>
                    </div>
                    <div className="support-box d-flex mb-5 p-4 align-items-start">
                        <img src={Join} alt="support-img" className='me-3' />
                        <h5 className='mb-0'>Join our community</h5>
                    </div>
                    <div className="support-box d-flex mb-5 p-4 align-items-start">
                        <img src={Date} alt="support-img" className='me-3' />
                        <h5 className='mb-0'>Join our webinar training series</h5>
                    </div>
                    <div className="support-box d-flex mb-5 p-4 align-items-start">
                        <img src={Question} alt="support-img" className='me-3' />
                        <h5 className='mb-0'>View frequently asked questions</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  );
}

export default CampaignOver;