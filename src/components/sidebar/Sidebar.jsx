import React from 'react';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import CampaignOver from '../pages/CampaignOver';
import CampaignNew from '../pages/CampaignNew';
import CampaignManage from '../pages/CampaignManage';
import CampaignMarket from '../pages/CampaignMarket.jsx';
import './sidebar.scss';

// Images
import CampaignOverview from '../../assests/img/campaign-new.png';
import Manage from '../../assests/img/manage.png';
import CampNew from '../../assests/img/campaign-new.png';
import MarketPlace from '../../assests/img/marketplace.png';
import Coupon from '../../assests/img/coupon.png';
import Analytics from '../../assests/img/analytics.png';
import Sales from '../../assests/img/sales.png';
import Profile from '../../assests/img/profile.png';
import DefaultUser from '../../assests/img/default-user.png';

const SideBar = () => {

  return (
    <div className="sidebar">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row className="justify-content-between tab-list m-0 sidebar-container">
                <Col className="side-tab mb-5 mb-md-0 py-4">
                    <div className="account-details p-2">
                        <span className="user d-flex justify-content-center align-items-center">
                            <img src={DefaultUser} alt="user" />
                        </span>
                        <h5 className="user-info text-white mt-3 mb-4 pb-4">
                            Web developer
                        </h5>
                    </div>
                    <Nav variant="pills" className="flex-column side-main bg-none ps-2 pt-2">
                        <Nav.Item>
                            <Nav.Link className="text-white py-3" eventKey="first">
                                <img src={CampaignOverview} className="me-2" alt='menu-img' />
                                Campaign Overview
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="text-white py-3" eventKey="second">
                                <img src={Manage} className="me-2" alt='menu-img' />
                                Manage Campaign
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="text-white py-3" eventKey="third">
                                <img src={CampNew} className="me-2" alt='menu-img' />
                                Create new Campaign
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="text-white py-3" eventKey="fourth">
                                <img src={MarketPlace} className="me-2" alt='menu-img' />
                                Campaign Marketplace
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="text-white py-3" eventKey="fifth">
                                <img src={Coupon} className="me-2" alt='menu-img' />
                                Coupon
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="text-white py-3" eventKey="sixth">
                                <img src={Analytics} className="me-2" alt='menu-img' />
                                Analytics
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="text-white py-3" eventKey="seventh">
                                <img src={Sales} className="me-2" alt='menu-img' />
                                Sales
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="text-white py-3" eventKey="eighth">
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
                </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    </div>
  )
}

export default SideBar;
