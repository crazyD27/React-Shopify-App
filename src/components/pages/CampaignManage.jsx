import React from 'react';
import MenuBar from '../navbar/Navbar';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

import Edit from '../../assests/img/edit.png';
import Delete from '../../assests/img/delete.svg'
import './pages.scss';

const CampaignManage = () => {

  return (
    <div className="campaign-manage-container p-3">
        <MenuBar />
        <h2 className='text-center my-5'>Manage Campaign</h2>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Col sm={12}>
            <Nav variant="pills" className="flex-row mb-4 tab-header">
                <Nav.Item>
                <Nav.Link eventKey="first">Active Campaigns</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link eventKey="second">Pending Campaigns</Nav.Link>
                </Nav.Item>
            </Nav>
            </Col>
            <Col sm={12}>
            <Tab.Content>
                <Tab.Pane eventKey="first">
                    <table className='w-100 campaign'>
                        <tbody className='w-100'>
                            <tr className='headings'>
                                <th>Product Name</th>
                                <th>Offer</th>
                                <th>Categories</th>
                                <th>Actions</th>
                            </tr>
                        <tr>
                            <td>FME Organizations Ltd</td>
                            <td>Percent Of Sale: 15.00%</td>
                            <td className='category'>#Fashion</td>
                            <td>
                                <button className='me-3'><img src={Edit} alt='edit' />Edit</button>
                                <button><img src={Delete} alt='delete' />Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Nesta Technologies</td>
                            <td>Percent Of Sale: 10.00%</td>
                            <td className='category'>#Fashion</td>
                            <td>
                                <button className='me-3'><img src={Edit} alt='edit' />Edit</button>
                                <button><img src={Delete} alt='delete' />Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>FME Organizations Ltd</td>
                            <td>Percent Of Sale: 20.00%</td>
                            <td className='category'>#Fashion</td>
                            <td>
                                <button className='me-3'><img src={Edit} alt='edit' />Edit</button>
                                <button><img src={Delete} alt='delete' />Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>FME Organizations Ltd</td>
                            <td>Percent Of Sale: 10.00%</td>
                            <td className='category'>#Fashion</td>
                            <td>
                                <button className='me-3'><img src={Edit} alt='edit' />Edit</button>
                                <button><img src={Delete} alt='delete' />Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>FME Organizations Ltd</td>
                            <td>Percent Of Sale: 12.00%</td>
                            <td className='category'>#Fashion</td>
                            <td>
                                <button className='me-3'><img src={Edit} alt='edit' />Edit</button>
                                <button><img src={Delete} alt='delete' />Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>FME Organizations Ltd</td>
                            <td>Percent Of Sale: 25.00%</td>
                            <td className='category'>#Fashion</td>
                            <td>
                                <button className='me-3'><img src={Edit} alt='edit' />Edit</button>
                                <button><img src={Delete} alt='delete' />Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>FME Organizations Ltd</td>
                            <td>Percent Of Sale: 15.00%</td>
                            <td className='category'>#Fashion</td>
                            <td>
                                <button className='me-3'><img src={Edit} alt='edit' />Edit</button>
                                <button><img src={Delete} alt='delete' />Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>FME Organizations Ltd</td>
                            <td>Percent Of Sale: 22.00%</td>
                            <td className='category'>#Fashion</td>
                            <td>
                                <button className='me-3'><img src={Edit} alt='edit' />Edit</button>
                                <button><img src={Delete} alt='delete' />Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>FME Organizations Ltd</td>
                            <td>Percent Of Sale: 5.00%</td>
                            <td className='category'>#Fashion</td>
                            <td>
                                <button className='me-3'><img src={Edit} alt='edit' />Edit</button>
                                <button><img src={Delete} alt='delete' />Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>FME Organizations Ltd</td>
                            <td>Percent Of Sale: 15.00%</td>
                            <td className='category'>#Fashion</td>
                            <td>
                                <button className='me-3'><img src={Edit} alt='edit' />Edit</button>
                                <button><img src={Delete} alt='delete' />Delete</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </Tab.Pane>
                <Tab.Pane eventKey="second" className='campaign'>
                    <table className='w-100'>
                        <tbody className='w-100'>
                            <tr className='headings'>
                                <th>Product Name</th>
                                <th>Offer</th>
                                <th>Categories</th>
                                <th>Actions</th>
                            </tr>
                        <tr>
                            <td>FME Organizations Ltd</td>
                            <td>Percent Of Sale: 15.00%</td>
                            <td className='category'>#Fashion</td>
                            <td>
                                <button className='me-3'><img src={Edit} alt='edit' />Edit</button>
                                <button><img src={Delete} alt='delete' />Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Nesta Technologies</td>
                            <td>Percent Of Sale: 10.00%</td>
                            <td className='category'>#Fashion</td>
                            <td>
                                <button className='me-3'><img src={Edit} alt='edit' />Edit</button>
                                <button><img src={Delete} alt='delete' />Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>FME Organizations Ltd</td>
                            <td>Percent Of Sale: 20.00%</td>
                            <td className='category'>#Fashion</td>
                            <td>
                                <button className='me-3'><img src={Edit} alt='edit' />Edit</button>
                                <button><img src={Delete} alt='delete' />Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>FME Organizations Ltd</td>
                            <td>Percent Of Sale: 10.00%</td>
                            <td className='category'>#Fashion</td>
                            <td>
                                <button className='me-3'><img src={Edit} alt='edit' />Edit</button>
                                <button><img src={Delete} alt='delete' />Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>FME Organizations Ltd</td>
                            <td>Percent Of Sale: 12.00%</td>
                            <td className='category'>#Fashion</td>
                            <td>
                                <button className='me-3'><img src={Edit} alt='edit' />Edit</button>
                                <button><img src={Delete} alt='delete' />Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>FME Organizations Ltd</td>
                            <td>Percent Of Sale: 25.00%</td>
                            <td className='category'>#Fashion</td>
                            <td>
                                <button className='me-3'><img src={Edit} alt='edit' />Edit</button>
                                <button><img src={Delete} alt='delete' />Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>FME Organizations Ltd</td>
                            <td>Percent Of Sale: 15.00%</td>
                            <td className='category'>#Fashion</td>
                            <td>
                                <button className='me-3'><img src={Edit} alt='edit' />Edit</button>
                                <button><img src={Delete} alt='delete' />Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>FME Organizations Ltd</td>
                            <td>Percent Of Sale: 22.00%</td>
                            <td className='category'>#Fashion</td>
                            <td>
                                <button className='me-3'><img src={Edit} alt='edit' />Edit</button>
                                <button><img src={Delete} alt='delete' />Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>FME Organizations Ltd</td>
                            <td>Percent Of Sale: 5.00%</td>
                            <td className='category'>#Fashion</td>
                            <td>
                                <button className='me-3'><img src={Edit} alt='edit' />Edit</button>
                                <button><img src={Delete} alt='delete' />Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>FME Organizations Ltd</td>
                            <td>Percent Of Sale: 15.00%</td>
                            <td className='category'>#Fashion</td>
                            <td>
                                <button className='me-3'><img src={Edit} alt='edit' />Edit</button>
                                <button><img src={Delete} alt='delete' />Delete</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </Tab.Pane>
            </Tab.Content>
            </Col>
        </Tab.Container>
    </div>
  );
}

export default CampaignManage;