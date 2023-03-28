import React from 'react';
import MenuBar from '../navbar/Navbar';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './pages.scss';

const CampaignManage = () => {

  return (
    <div className="campaign-manage-container p-3">
        <MenuBar />
        <h2 className='text-center my-5'>Campaign Overview</h2>
        <div className="manage-table">
            <div className="content-headings d-flex justify-content-between p-2">
                <h4>Active Campaign</h4>
                <h4>Pending Campaign</h4>
            </div>
            <Row>
                <Col md={4}>     
                    <div className="details">
                        <h5>Camping Details</h5>
                        <div className="detail-box d-flex align-items-start justify-content-between p-3">
                            <p>At-Ele</p>
                            <div className="buttons d-flex flex-column">
                                <Link to='/' className="button button-blue">Edit</Link>
                                <Link to='/' className="button">Delete</Link>
                            </div>
                        </div>

                        <div className="detail-box d-flex align-items-start justify-content-between p-3">
                            <p>Queenou Jewelry</p>
                            <div className="buttons d-flex flex-column">
                                <Link to='/' className="button button-blue">Edit</Link>
                                <Link to='/' className="button">Delete</Link>
                            </div>
                        </div>

                        <div className="detail-box d-flex align-items-start justify-content-between p-3">
                            <p>SofG Fragrances</p>
                            <div className="buttons d-flex flex-column">
                                <Link to='/' className="button button-blue">Edit</Link>
                                <Link to='/' className="button">Delete</Link>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={4}>
                    <div className="details">
                        <h5></h5>
                        <div className="detail-box d-flex align-items-start justify-content-between p-3"></div>
                        <div className="detail-box d-flex align-items-start justify-content-between p-3"></div>
                        <div className="detail-box d-flex align-items-start justify-content-between p-3"></div>
                    </div>
                </Col>
                <Col md={4}>
                    <div className="details">
                        <h5></h5>
                        <div className="detail-box d-flex align-items-start justify-content-between p-3">
                            <p>At-Ele</p>
                            <div className="buttons d-flex flex-column">
                                <Link to='/' className="button button-blue">Edit</Link>
                                <Link to='/' className="button">Publish</Link>
                                <Link to='/' className="button">Delete</Link>
                            </div>
                        </div>

                        <div className="detail-box d-flex align-items-start justify-content-between p-3">
                            <p>Queenou Jewelry</p>
                            <div className="buttons d-flex flex-column">
                                <Link to='/' className="button button-blue">Edit</Link>
                                <Link to='/' className="button">Publish</Link>
                                <Link to='/' className="button">Delete</Link>
                            </div>
                        </div>

                        <div className="detail-box d-flex align-items-start justify-content-between p-3">
                            <p>SofG Fragrances</p>
                            <div className="buttons d-flex flex-column">
                                <Link to='/' className="button button-blue">Edit</Link>
                                <Link to='/' className="button">Publish</Link>
                                <Link to='/' className="button">Delete</Link>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
        <div className="manage-table mt-5">
            <div className="content-headings d-flex justify-content-between p-2">
                <h4>Content Request</h4>
            </div>
            <Row>
                <Col md={4}>     
                    <div className="details">
                        <h5>Camping Details</h5>
                        <div className="detail-box d-flex align-items-start justify-content-between p-3">
                            <p>SofG Fragrances</p>
                            <div className="buttons d-flex flex-column">
                                <Link to='/' className="button button-blue">View Content</Link>
                                <Link to='/' className="button">Approve</Link>
                                <Link to='/' className="button">Disapprove</Link>
                            </div>
                        </div>

                        <div className="detail-box d-flex align-items-start justify-content-between p-3">
                            <p>Queenou Jewelry</p>
                            <div className="buttons d-flex flex-column">
                            <Link to='/' className="button button-blue">View Content</Link>
                                <Link to='/' className="button">Approve</Link>
                                <Link to='/' className="button">Disapprove</Link>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={4}>
                    <div className="details">
                        <h5></h5>
                        <div className="detail-box d-flex align-items-start justify-content-between p-3"></div>
                        <div className="detail-box d-flex align-items-start justify-content-between p-3"></div>
                    </div>
                </Col>
                <Col md={4}>
                    <div className="details">
                        <h5></h5>
                        <div className="detail-box d-flex align-items-start justify-content-between p-3"></div>
                        <div className="detail-box d-flex align-items-start justify-content-between p-3"></div>
                    </div>
                </Col>
            </Row>
        </div>
    </div>
  );
}

export default CampaignManage;