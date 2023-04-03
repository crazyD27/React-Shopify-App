import React, {useState, useEffect} from 'react';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import CampaignOver from '../pages/CampaignOver';
import CampaignNew from '../pages/CampaignNew';
import CampaignManage from '../pages/CampaignManage';
import CampaignMarket from '../pages/CampaignMarket.jsx';
import CouponList from '../pages/CouponList';
import Analytics from '../pages/Analytics';
import Sales from '../pages/Sales';
import './sidebar.scss';
import axios from 'axios';
import {useAppBridge} from "@shopify/app-bridge-react";

// Images
import CampaignOverview from '../../assests/img/campaign-over.png';
import Manage from '../../assests/img/manage.png';
import CampNew from '../../assests/img/campaign-new.png';
import MarketPlace from '../../assests/img/marketplace.png';
import Coupon from '../../assests/img/coupon.png';
import AnalyticsImg from '../../assests/img/analytics.png';
import SalesImg from '../../assests/img/sales.png';
import Profile from '../../assests/img/profile.png';

const SideBar = () => {

  useEffect(() => {
    axios.post('https://api.myrefera.com/campaign/get/token/', {
        shop_name: 'marketplacee-app.myshopify.com',
        },)
        .then(function (response) {
        console.log("Get Token", response);
        localStorage.setItem("token",response.data.token)
        })
        .catch(function (error) {
        console.log(error);
        })
  }, [])

  return (
    <div className="sidebar">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row className="justify-content-between tab-list m-0 sidebar-container">
                <Col className="side-tab mb-5 mb-md-0 py-4">
                    <Nav variant="pills" className="flex-column side-main bg-none pt-2">
                        <Nav.Item>
                            <Nav.Link className="text-white py-2 mb-2" eventKey="first">
                                <img src={CampaignOverview} className="me-2" alt='menu-img' />
                                Campaign Overview
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="text-white py-2 mb-2" eventKey="second">
                                <img src={Manage} className="me-2" alt='menu-img' />
                                Manage Campaign
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="text-white py-2 mb-2" eventKey="third">
                                <img src={CampNew} className="me-2" alt='menu-img' />
                                Create new Campaign
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="text-white py-2 mb-2" eventKey="fourth">
                                <img src={MarketPlace} className="me-2" alt='menu-img' />
                                Campaign Marketplace
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="text-white py-2 mb-2" eventKey="fifth">
                                <img src={Coupon} className="me-2" alt='menu-img' />
                                Coupon
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="text-white py-2 mb-2" eventKey="sixth">
                                <img src={AnalyticsImg} className="me-2" alt='menu-img' />
                                Analytics
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="text-white py-2 mb-2" eventKey="seventh">
                                <img src={SalesImg} className="me-2" alt='menu-img' />
                                Sales
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="text-white py-2 mb-2" eventKey="eighth">
                                <img src={Profile} className="me-2" alt='menu-img' />
                                Profile
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col className="tab-main p-0">
                <Tab.Content>
                    <Tab.Pane eventKey="first" className='bg-light'>
                        <CampaignOver />
                    </Tab.Pane>
                    <Tab.Pane eventKey="second" className='bg-light'>
                        <CampaignManage />
                    </Tab.Pane>
                    <Tab.Pane eventKey="third" className='bg-light'>
                        <CampaignNew />
                    </Tab.Pane>
                    <Tab.Pane eventKey="fourth" className='bg-light'>
                        <CampaignMarket />
                    </Tab.Pane>
                    <Tab.Pane eventKey="fifth" className='bg-light'>
                        <CouponList />
                    </Tab.Pane>
                    <Tab.Pane eventKey="sixth" className='bg-light'>
                        <Analytics />
                    </Tab.Pane>
                    <Tab.Pane eventKey="seventh" className='bg-light'>
                        <Sales />
                    </Tab.Pane>
                </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    </div>
  )
}

export default SideBar;
