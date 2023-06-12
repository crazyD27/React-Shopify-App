import React from 'react';
import './home.scss';
import { Link } from 'react-router-dom';
import EventOne from '../../assests/img/events-1.png';
import EventTwo from '../../assests/img/events-2.png';

const Home = () => {
  return (
    <section className="home">
        <div className="container-fluid d-md-flex">
            <div className="home-container col">
                <div className="home-announcement d-flex px-3 px-md-4 px-lg-5">
                    <img src="" alt="" />
                    <p className="mb-0">UpPromote Affiliate & Referral</p>
                </div>
                <div className="home-content px-3 pt-4 px-md-4 px-lg-5">
                    <div className="content-box">
                       <h4 className="fw-bold">Home</h4>
                       <p>Promote your affiliate program and get quick response</p>
                       
                       <div className="content-list-container pt-3">
                        <p>Customer</p>
                        <div className="content-list pt-2 row flex-wrap justify-content-between w-100 mx-md-0">
                            <div className="customer-box col p-3 mb-4">
                                <div className="list-content">
                                    <h5>Home</h5>
                                    <p>Promote your affiliate programe and get quick support</p>
                                </div>
                                <div className="buttons mt-3 mt-lg-0">
                                    <Link to="/" className="button button-black">View Info</Link>
                                </div>
                            </div>
                            <div className="customer-box col p-3 mb-4">
                                <div className="list-content">
                                    <h5>Home</h5>
                                    <p>Promote your affiliate programe and get quick support</p>
                                </div>
                                <div className="buttons mt-3 mt-lg-0">
                                    <Link to="/" className="button button blue">View Info</Link>
                                </div>
                            </div>
                            <div className="customer-box col p-3 mb-md-4">
                                <div className="list-content">
                                    <h5>Home</h5>
                                    <p>Promote your affiliate programe and get quick support</p>
                                </div>
                                <div className="buttons mt-3 mt-lg-0">
                                    <Link to="/" className="button">View Info</Link>
                                </div>
                            </div>
                        </div>
                       </div>
                    </div>
                    <div className="content-box mt-4">
                        <h3>Management</h3>
                        <p>Manage your affiliate campaign with basic functions</p>
                        <div className="management-list mt-3 d-md-flex flex-md-wrap">
                            <div className="management-box">
                                <span>Management Programs</span>
                            </div>
                            <div className="management-box">
                                <span>Management Programs</span>
                            </div>
                            <div className="management-box">
                                <span>Management Programs</span>
                            </div>
                            <div className="management-box">
                                <span>Management Programs</span>
                            </div>
                            <div className="management-box">
                                <span>Management Programs</span>
                            </div>
                            <div className="management-box">
                                <span>Management Programs</span>
                            </div>
                        </div>
                    </div>
                    <div className="content-box mt-4">
                        <h3>Settings</h3>
                        <p>Manage your affiliate campaign with basic functions</p>
                        <div className="content-list pt-3 row justify-content-between w-100">
                            <div className="col mb-4 p-3 customer-box">
                                <div className="list-content">
                                    <h4>Home</h4>
                                    <p>Promote your affiliate programe and get quick support</p>
                                </div>
                                <div className="buttons mt-3">
                                    <Link to="/" className="button">View Info</Link>
                                </div>
                            </div>
                            <div className="col mb-4 p-3 customer-box">
                                <div className="list-content">
                                    <h4>Home</h4>
                                    <p>Promote your affiliate programe and get quick support</p>
                                </div>
                                <div className="buttons mt-3">
                                    <Link to="/" className="button">View Info</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-box mt-4">
                        
                        <div className="events-list mt-3 row justify-content-between w-100">
                            <div className="col mt-4 customer-box">
                                <h4 className="mb-3">Events</h4>
                                <img src={EventOne} alt="events" className="w-100" />
                            </div>
                            <div className="col mt-4 customer-box">
                                <h4 className="mb-3">Resources</h4>
                                <img src={EventTwo} alt="events" className="w-100" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Home