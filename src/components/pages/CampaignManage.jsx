import React, {useEffect, useState, useContext} from 'react';
import MenuBar from '../navbar/Navbar';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import UserContext from '../context/UserContext';
import axios from 'axios';
import { API } from '../../config/Api';

import Edit from '../../assests/img/edit.png';
import Delete from '../../assests/img/delete.svg'
import './pages.scss';

const CampaignManage = () => {
    const {userToken} = useContext(UserContext);
    const [campList, setCampList] = useState([])
    const [campListPending, setCampListPending] = useState([])
    const token = localStorage.getItem('Token');
    console.log("User Token", userToken)
    console.log("localStorage.getItem('Token')", localStorage.getItem('Token'))

    useEffect(() => {
        axios.get(API.BASE_URL + 'list/',{
            headers: {
                Authorization: `Token 7e6170e28da6350da0ecdb0d08813cc9fc7e7980`
            }
        })
        .then(function (response) {
            console.log("Campaign List", response);
            setCampList(response.data.data);
            console.log(campList)
        })
        .catch(function (error) {
            console.log(error);
        })

        axios.get(API.BASE_URL + 'pending/',{
            headers: {
                Authorization: `Token 7e6170e28da6350da0ecdb0d08813cc9fc7e7980`
            }
        })
        .then(function (response) {
            console.log("Campaign List", response);
            setCampListPending(response.data.data);
            console.log(campListPending)
        })
        .catch(function (error) {
            console.log(error);
        })
    }, [token])

    function deleteCampaign(value) {
        console.log("Test" ,value)
        axios.delete(API.BASE_URL + 'update/' + value,{
            headers: {
                Authorization: `Token 7e6170e28da6350da0ecdb0d08813cc9fc7e7980`
            }
        })
        .then(function (response) {
            console.log("Delete List", response);
        })
        .catch(function (error) {
            console.log(error);
        })
    }

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
                            {campList?.length > 0 ? (
                                campList?.map((name, i) => {
                                    return(
                                        <tr>
                                            <td>{name.product}</td>
                                            <td>{name.offer}</td>
                                            <td className='category'>{name.product_discount}</td>
                                            <td>
                                                <button className='me-3'><img src={Edit} alt='edit' />Edit</button>
                                                <button onClick={()=> {deleteCampaign(name.id)}}><img src={Delete} alt='delete' />Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                                
                            )
                            :
                            (
                                <h4 className='mt-4'>No Active Campaigns right now</h4>
                            )}
                        
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
                            {campListPending?.length > 0 ? (
                                campListPending?.map((name, i) => {
                                    return(
                                        <tr>
                                            <td>{name.product}</td>
                                            <td>{name.offer}</td>
                                            <td className='category'>{name.product_discount}</td>
                                            <td>
                                                <button className='me-3'><img src={Edit} alt='edit' />Edit</button>
                                                <button onClick={()=> {deleteCampaign(name.id)}}><img src={Delete} alt='delete' />Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                                
                            )
                            :
                            (
                                <h4 className='mt-4'>No Pending Campaigns right now</h4>
                            )}
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