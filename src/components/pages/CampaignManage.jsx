import React, {useEffect, useState, useContext} from 'react';
import MenuBar from '../navbar/Navbar';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import UserContext from '../context/UserContext';
import axios from 'axios';
import { API } from '../../config/Api';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

import Edit from '../../assests/img/edit.png';
import Delete from '../../assests/img/delete.svg';
import './pages.scss';

const CampaignManage = () => {
    const {userToken, campList, setCampList, campListPending, setCampListPending} = useContext(UserContext);
    const [campName, setCampName] = useState('');
    const [influenceVisit, setInfluenceVisit] = useState('');
    const [prodDiscount, setProdDiscount] = useState('');
    const [prodOffer, setProdOffer] = useState('');
    const [getMarketInfo, setGetMarketInfo] = useState([]);
    const [getMarket, setGetMarket] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const token = localStorage.getItem('Token');
    console.log("User Token", userToken)
    console.log("localStorage.getItem('Token')", localStorage.getItem('Token'))

    const handleCampName = (event) => {
        setCampName(event.target.value);
    }

    const handleInfluenceVisit = (event) => {
        setInfluenceVisit(event.target.value);
    }

    const handleProdDiscount = (event) => {
        setProdDiscount(event.target.value);
    }

    const handleProdOffer = (event) => {
        setProdOffer(event.target.value);
    }

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleDoneClick = () => {
        setIsEditing(false);
    };

    useEffect(() => {
        axios.get(API.BASE_URL + 'active/',{
            headers: {
                Authorization: `Token ${token}`
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
                Authorization: `Token ${token}`
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
        setLoading(true);
        console.log("Test" ,value)
        axios.delete(API.BASE_URL + 'delete/' + value + '/',{
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(function (response) {
            console.log("Delete List", response);
            toast.success("Campaign Deleted!");
            // Update the state of the campaign lists
            setCampList(campList.filter(campaign => campaign.id !== value));
            setCampListPending(campListPending.filter(campaign => campaign.id !== value));
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(() => setLoading(false));
    }

    const getSingleMarket = (value, event) => {
        event.preventDefault();
        setLoading(true);
        console.log(value)
        axios.get(API.BASE_URL +  'single/' + value + '/', {
            headers: {
                Authorization: `Token ${token}`
        }})
        .then(function (response) {
            console.log("Single Market", response.data);
            setGetMarketInfo(response.data.data)
            setGetMarket(true);
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(() => setLoading(false));
    }


    const editCampaign = (value, event) => {
        event.preventDefault();
        setLoading(true);
        console.log("Test" ,value)
        axios.put(API.BASE_URL + 'update/' + value + '/',{
            campaign_name: campName,
            influencer_visit: influenceVisit,
            offer: prodOffer,
            product_discount: prodDiscount
        },{
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(function (response) {
            console.log("Edited", response);
            couponCross();
            toast.success("Campaign Edited!");
            axios.get(API.BASE_URL + 'active/',{
                headers: {
                    Authorization: `Token ${token}`
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
                    Authorization: `Token ${token}`
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
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(() => setLoading(false));
    }

    const couponCross = () => {
        setGetMarket(false)
    }

    console.log("isEditing", isEditing)

  return (
    <div className="campaign-manage-container p-3">
        <MenuBar />
        {loading && <div className='loader'><span></span></div>} {/* Conditionally render the loader */}
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
                                        <tr key={i}>
                                            <td className={isEditing ? 'edit-mode' : ''}>
                                                {isEditing ? <input type="text" value={name.campaign_name} /> : name.campaign_name}
                                            </td>
                                            <td className={isEditing ? 'edit-mode' : ''}>
                                                {isEditing ? <input type="text" value={name.offer} /> : name.offer}
                                            </td>
                                            <td className={`category ${isEditing ? 'edit-mode' : ''}`}>
                                                {isEditing ? <input type="text" value={name.product_discount} /> : name.product_discount}
                                            </td>
                                            <td>
                                                {isEditing ? (
                                                    <button onClick={handleDoneClick}>Done</button>
                                                ) : (
                                                    <button onClick={handleEditClick}><img src={Edit} alt='edit' />Edit</button>
                                                )}
                                                <button onClick={() => {deleteCampaign(name.id)}}><img src={Delete} alt='delete' />Delete</button>
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
                                <th>Influencer Visit</th>
                                <th>Actions</th>
                            </tr>
                            {campListPending?.length > 0 ? (
                                campListPending?.map((name, i) => {
                                    return(
                                        <>
                                        <tr key={i} className='campaign-inputs'>
                                            <td>{name.campaign_name}</td>
                                            <td>{name.offer}</td>
                                            <td className='category'>{name.product_discount + '%'}</td>
                                            <td>{name.influencer_visit}</td>
                                            <td>
                                                <button onClick={(event) => {getSingleMarket(name.id, event)}} style={{marginRight: 15}}>Edit</button>
                                                <button onClick={() => { deleteCampaign(name.id)}}><img src={Delete} alt='delete' />Delete</button>
                                            </td>
                                        </tr>
                                        {getMarket && 
                                            <div className="get-coupon">
                                                <div className="get-coupon-contianer">
                                                <h3>Edit Coupon</h3>
                                                <button className='close' onClick={couponCross}>
                                                    <FontAwesomeIcon icon={faClose} style={{ color: "#000", width: "25px", height: "25px"}} />
                                                </button>
                                                <form action="">
                                                    <div className="input-container">
                                                        <label>Product Name</label>
                                                        <input type="text" placeholder={getMarketInfo?.campaign_name} onChange={handleCampName} value={campName} />
                                                    </div>
                                                    <div className="input-container">
                                                        <label>Offer</label>
                                                        <select onChange={handleProdOffer}>
                                                            <option value="" disabled>{getMarketInfo?.offer}</option>
                                                            <option value="fixed_amount">Fixed Amount</option>
                                                            <option value="percentage">Precentage</option>
                                                        </select>
                                                    </div>
                                                    <div className="input-container">
                                                        <label>Discount</label>
                                                        <input type="text" placeholder={getMarketInfo?.product_discount}  onChange={handleProdDiscount} value={prodDiscount} />
                                                    </div>
                                                    <div className="input-container">
                                                        <label>Influencer Visit</label>
                                                        <input type="text" placeholder={getMarketInfo?.influencer_visit} onChange={handleInfluenceVisit} value={influenceVisit} />
                                                    </div>
                                                    <button onClick={(event) => {editCampaign(name?.id, event)}} className='button button-blue mt-4 mx-auto'>Edit Coupon</button>
                                                </form>
                                                </div>
                                            </div>
                                        }
                                        </>
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