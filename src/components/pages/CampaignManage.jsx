import React, {useEffect, useState, useContext} from 'react';
import MenuBar from '../navbar/Navbar';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import UserContext from '../context/UserContext';
import axios from 'axios';

import Edit from '../../assests/img/edit.png';
import Delete from '../../assests/img/delete.svg'
import './pages.scss';

const CampaignManage = () => {
    const {userToken} = useContext(UserContext);
    const [campList, setCampList] = useState('')
    console.log("User Token", userToken)
    console.log("localStorage.getItem('Token')", localStorage.getItem('Token'))

    useEffect(() => {
        setTimeout(() => {
            axios.get('https://api.myrefera.com/campaign/list/',{
                headers: {
                    Authorization: 'Token' + localStorage.getItem('Token')
                }
            })
            .then(function (response) {
                console.log("Campaign List", response);
                setCampList(response.data.data)
            })
            .catch(function (error) {
                console.log(error);
            })
        }, 3000)
    }, [])

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
                            {campList?.map((campData, i) => {
                                return(
                                    <tr key={i}>
                                        <td>{campData.product}</td>
                                        <td>{campData.offer}</td>
                                        <td className='category'>{campData.product_discount}</td>
                                        <td>
                                            <button className='me-3'><img src={Edit} alt='edit' />Edit</button>
                                            <button><img src={Delete} alt='delete' />Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </Tab.Pane>
                <Tab.Pane eventKey="second" className='campaign'>
                    <table className='w-100 campaign'>
                        <tbody className='w-100'>
                            <tr className='headings'>
                                <th>Product Name</th>
                                <th>Offer</th>
                                <th>Categories</th>
                                <th>Actions</th>
                            </tr>
                            {campList?.map((campData, i) => {
                                return(
                                    <tr key={i}>
                                        <td>{campData.product}</td>
                                        <td>{campData.offer}</td>
                                        <td className='category'>{campData.product_discount}</td>
                                        <td>
                                            <button className='me-3'><img src={Edit} alt='edit' />Edit</button>
                                            <button><img src={Delete} alt='delete' />Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
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