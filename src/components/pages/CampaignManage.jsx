import React from 'react';
import MenuBar from '../navbar/Navbar';

import Edit from '../../assests/img/edit.png';
import Delete from '../../assests/img/delete.svg'
import './pages.scss';

const CampaignManage = () => {

  return (
    <div className="campaign-manage-container p-3">
        <MenuBar />
        <h2 className='text-center my-5'>Manage Campaign</h2>
        <div className="buttons mb-5 d-flex align-items-center">
            <button>Active Campaigns</button>
            <button>Pending Campaigns</button>
        </div>
        {/* <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    <div className="content-headings d-flex justify-content-between p-2 w-100">
                        <h4>Active Campaign</h4>
                        <h4>Pending Campaign</h4>
                    </div>
                </Accordion.Header>
                <Accordion.Body>
                <div className="manage-table">
                    
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
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>
                    <div className="content-headings d-flex justify-content-between w-100 p-2">
                        <h4>Content Request</h4>
                    </div>
                </Accordion.Header>
                <Accordion.Body>
                <div className="manage-table">
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
                </Accordion.Body>
            </Accordion.Item>
        </Accordion> */}

        <table className='w-100'>
            <tbody className='w-100'>
            <tr>
                <td>1</td>
                <td>FME Organizations Ltd</td>
                <td>
                    <button><img src={Edit} alt='edit' />Edit</button>
                    <button><img src={Delete} alt='delete' />Delete</button>
                </td>
            </tr>
            <tr>
                <td>2</td>
                <td>Nesta Technologies</td>
                <td>
                    <button><img src={Edit} alt='edit' />Edit</button>
                    <button><img src={Delete} alt='delete' />Delete</button>
                </td>
            </tr>
            <tr>
                <td>3</td>
                <td>FME Organizations Ltd</td>
                <td>
                    <button><img src={Edit} alt='edit' />Edit</button>
                    <button><img src={Delete} alt='delete' />Delete</button>
                </td>
            </tr>
            <tr>
                <td>4</td>
                <td>FME Organizations Ltd</td>
                <td>
                    <button><img src={Edit} alt='edit' />Edit</button>
                    <button><img src={Delete} alt='delete' />Delete</button>
                </td>
            </tr>
            <tr>
                <td>5</td>
                <td>FME Organizations Ltd</td>
                <td>
                    <button><img src={Edit} alt='edit' />Edit</button>
                    <button><img src={Delete} alt='delete' />Delete</button>
                </td>
            </tr>
            <tr>
                <td>6</td>
                <td>FME Organizations Ltd</td>
                <td>
                    <button><img src={Edit} alt='edit' />Edit</button>
                    <button><img src={Delete} alt='delete' />Delete</button>
                </td>
            </tr>
            <tr>
                <td>7</td>
                <td>FME Organizations Ltd</td>
                <td>
                    <button><img src={Edit} alt='edit' />Edit</button>
                    <button><img src={Delete} alt='delete' />Delete</button>
                </td>
            </tr>
            <tr>
                <td>8</td>
                <td>FME Organizations Ltd</td>
                <td>
                    <button><img src={Edit} alt='edit' />Edit</button>
                    <button><img src={Delete} alt='delete' />Delete</button>
                </td>
            </tr>
            <tr>
                <td>9</td>
                <td>FME Organizations Ltd</td>
                <td>
                    <button><img src={Edit} alt='edit' />Edit</button>
                    <button><img src={Delete} alt='delete' />Delete</button>
                </td>
            </tr>
            <tr>
                <td>10</td>
                <td>FME Organizations Ltd</td>
                <td>
                    <button><img src={Edit} alt='edit' />Edit</button>
                    <button><img src={Delete} alt='delete' />Delete</button>
                </td>
            </tr>
            </tbody>
        </table>
       
        
    </div>
  );
}

export default CampaignManage;