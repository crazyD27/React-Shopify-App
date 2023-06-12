import { useEffect, useState, useContext } from 'react';
import UserContext from '../context/UserContext';
import { Link } from 'react-router-dom';
import MenuBar from '../navbar/Navbar';
import './pages.scss';
import axios from 'axios';
import { API } from '../../config/Api';
import SideBar from '../sidebar/Sidebar';

// Images
import Active from '../../assests/img/active-img.png';
import Pending from '../../assests/img/pending-img.png';
import Sales from '../../assests/img/total-img.png';
import Total from '../../assests/img/sales-img.png';
import Like from '../../assests/img/like.png';
import Date from '../../assests/img/date.png';
import Chat from '../../assests/img/chat.png';
import Join from '../../assests/img/join.png';
import Question from '../../assests/img/question.png';

const CampaignOver = () => {
    const {setUserToken, setInfluenceList, countCamp, setCountCamp,setName, setuserName} = useContext(UserContext);

    
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
            axios.get(API.BASE_URL + 'user/id/',{
                headers: {
                    Authorization: `Token ${localStorage.getItem('Token')}`
            }})
            .then(function (response) {
                console.log("User ID", response);
                localStorage.setItem("User_ID", response.data.user_id)
                localStorage.setItem("User_Name", response.data.username);
                setName(localStorage.getItem("User_Name"));
                setuserName(localStorage.getItem("User_Name"))
            })
            .catch(function (error) {
                console.log(error);
            })
        })
        .catch(function (error) {
            console.log(error);
        })
    }, 5500)

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
            <div className="overview-container w-100 p-4">
                <h3 className='mb-3'>Overview</h3>
                <div className="overview-list d-flex flex-wrap justify-content-between align-items-center">
                    <div className="overview-box d-flex align-items-center justify-content-center mb-4">
                        <div className="overview-content d-flex align-items-center">
                            <span><img src={Active} alt='campaign-img' /></span>
                            <h5>Active Campaigns</h5>
                            <h3 className="mb-0">{countCamp.active_campaign ? countCamp.active_campaign : 0}</h3>
                        </div>
                    </div>
                    <div className="overview-box d-flex align-items-center justify-content-center mb-4">
                        <div className="overview-content d-flex align-items-center">
                            <span><img src={Pending} alt='campaign-img' /></span>
                            <h5>Pending Campaigns</h5>
                            <h3 className="mb-0">{countCamp.pending_campaign ? countCamp.pending_campaign : 0}</h3>
                        </div>
                    </div>
                    <div className="overview-box d-flex align-items-center justify-content-center mb-4">
                        <div className="overview-content d-flex align-items-center">
                            <span><img src={Total} alt='campaign-img' /></span>
                            <h5>Total Campaigns</h5>
                            <h3 className="mb-0">{countCamp.total ? countCamp.total : 0}</h3>
                        </div>
                    </div>
                    <div className="overview-box d-flex align-items-center justify-content-center mb-4">
                        <div className="overview-content d-flex align-items-center">
                            <span><img src={Sales} alt='campaign-img' /></span>
                            <h5>Sales Campaigns</h5>
                            <h3 className="mb-0">0</h3>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="support-container mt-4 w-100 p-3">
                <h3 className='mb-4'>Get Support</h3>
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