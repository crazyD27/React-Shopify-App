import React, {useEffect, useState, useContext} from 'react';
import MenuBar from '../navbar/Navbar';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import UserContext from '../context/UserContext';
import axios from 'axios';
import { API } from '../../config/Api';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import Delete from '../../assests/img/delete.svg';
import NoData from '../../assests/img/no-data.png';
import SideBar from '../sidebar/Sidebar';
import './pages.scss';

const CampaignManage = () => {
    const {userToken, campList, setCampList, campListPending, setCampListPending, countCamp, setCountCamp, draftList, setDraftList} = useContext(UserContext);
    const [campName, setCampName] = useState('');
    const [influenceVisit, setInfluenceVisit] = useState('');
    const [prodDiscount, setProdDiscount] = useState('');
    const [prodOffer, setProdOffer] = useState('');
    const [getMarketInfo, setGetMarketInfo] = useState([]);
    const [getMarket, setGetMarket] = useState(false);
    const [getDeleteConfirm, setDeleteConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pendingId, setPendingId] = useState([]);
    const [activeId, setActiveId] = useState([]);
    const [productNames, setProductNames] = useState([]);
    const [pendingNames, setPendingNames] = useState([]);
    const [activeNames, setActiveNames] = useState([]);
    const [getId, setGetId] = useState('');
    const token = localStorage.getItem('Token');

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

    useEffect(() => {
        axios.get(API.BASE_URL + 'active/',{
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(function (response) {
            console.log("Active", response.data.data)
            setCampList(response.data.data);
            setActiveId(response.data.product_id)
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
            setCampListPending(response.data.data);
            setPendingId(response.data.product_id);
            console.log("Pending", response.data)
        })
        .catch(function (error) {
            console.log(error);
        })

        axios.get(API.BASE_URL + 'product/list/',{
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(function (response) {
            setProductNames(response.data.success.products);
        })
        .catch(function (error) {
            console.log(error);
        })

        axios.get(API.BASE_URL + 'draft/list/',{
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(function (response) {
            console.log("Draft List",response)
            setDraftList(response.data.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    }, [token])

    function deleteCampaign(value) {
        setLoading(true);
        axios.delete(API.BASE_URL + 'delete/' + value + '/',{
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(function (response) {
            console.log("Delete" ,response)
            toast.success("Campaign Deleted!");
            setCampList(campList.filter(campaign => campaign.campaignid_id !== value));
            setCampListPending(campListPending.filter(campaign => campaign.campaignid_id !== value));
            setDraftList(draftList.filter(campaign => campaign.campaignid_id !== value))
            setDeleteConfirm(false);
        })
        .catch(function (error) {
            console.log(error);
            toast.warn("Cannot Delete right now. Please try again later")
        })
        .finally(() => setLoading(false));
    }

    function deleteConfirm(value) {
        console.log(value);
        setGetId(value);
        setDeleteConfirm(true);
    }

    const getSingleMarket = (value, event) => {
        console.log("ID", value)
        event.preventDefault();
        setLoading(true);
        axios.get(API.BASE_URL +  'single/' + value + '/', {
            headers: {
                Authorization: `Token ${token}`
        }})
        .then(function (response) {
            console.log("Manage Product Single", response.data.data)
            setGetMarketInfo(response.data.data)
            setGetMarket(true);
            setCampName(response.data.data.campaign_name)
            setProdDiscount(response.data.data.product_discount)
            setInfluenceVisit(response.data.data.description)
        })
        .catch(function (error) {
            console.log(error);
            toast.warn("Cannot edit the information right now. Please try again later")
        })
        .finally(() => setLoading(false));
    }

    const editCampaign = (value, event) => {
        console.log(value)
        event.preventDefault();
        setLoading(true);
        axios.put(API.BASE_URL + 'update/' + value + '/',{
            campaign_name: campName,
            description: influenceVisit,
            offer: prodOffer,
            product_discount: prodDiscount
        },{
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(function (response) {
            couponCross();
            toast.success("Campaign Edited!");
            axios.get(API.BASE_URL + 'active/',{
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            .then(function (response) {
                setCampList(response.data.data);
                axios.get(API.BASE_URL + 'active/',{
                    headers: {
                        Authorization: `Token ${token}`
                    }
                })
                .then(function (response) {
                    setCampList(response.data.data);
                    setActiveId(response.data.product_id)
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
                    setCampListPending(response.data.data);
                    setPendingId(response.data.product_id)
                })
                .catch(function (error) {
                    console.log(error);
                })
        
                axios.get(API.BASE_URL + 'product/list/',{
                    headers: {
                        Authorization: `Token ${token}`
                    }
                })
                .then(function (response) {
                    setProductNames(response.data.success.products);
                })
                .catch(function (error) {
                    console.log(error);
                })
        
                axios.get(API.BASE_URL + 'draft/list/',{
                    headers: {
                        Authorization: `Token ${token}`
                    }
                })
                .then(function (response) {
                    console.log("Draft List",response)
                    setDraftList(response.data.data);
                })
                .catch(function (error) {
                    console.log(error);
                })
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
                setCampListPending(response.data.data);
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
        setDeleteConfirm(false)
    }

    const getPendingProduct = () => {
        const names = [];
        pendingId?.forEach((ids) => {
            const productNamesArr = [];
            ids.forEach((id) => {
                const product = productNames.find((p) => p.id === id);
                if (product) {
                    productNamesArr.push(product.title);
                }
            });
            names.push(productNamesArr);
        });
        setPendingNames(names);
    };

    const getActiveProduct = () => {
        const names = [];
        activeId?.forEach((ids) => {
            const productNamesArr = [];
            ids.forEach((id) => {
                const product = productNames.find((p) => p.id === id);
                if (product) {
                    productNamesArr.push(product.title);
                }
            });
            names.push(productNamesArr);
        });
        setActiveNames(names);
    };

    useEffect(() => {
        getPendingProduct()
        getActiveProduct()
    }, [])

  return (
    <>
    <div className="campaign-manage-container p-3 page">
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
                <Nav.Item>
                    <Nav.Link eventKey="third">Draft Campaigns</Nav.Link>
                </Nav.Item>
            </Nav>
            </Col>
            <Col sm={12}>
            <Tab.Content>
                <Tab.Pane eventKey="first">
                {campList?.length > 0 ? (
                    <table className='w-100 campaign'>
                        <tbody className='w-100'>
                            <tr className='headings'>
                                <th>Campaign Name</th>
                                <th>Product</th>
                                <th>Coupons</th>
                                <th>Discount</th>
                                <th>Actions</th>
                            </tr>
                           
                                {campList?.map((name, i) => {
                                    return(
                                        <>
                                        <tr key={i} className='campaign-inputs'>
                                            <td>{name.campaign_name}</td>
                                            <td>{name.product_name}</td>
                                            <td>{name.coupon_name?.length > 0 ? name.coupon_name?.join(", ") : ""}</td>
                                            <td className='category'>{name.amount?.length > 0 ? name.amount?.join(", ") : ""}</td>
                                            <td>
                                                <button onClick={(event) => {getSingleMarket(name.campaignid_id, event)}} style={{marginRight: 15}}>
                                                    <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#fff", width: "15px", height: "15px"}} />
                                                    </button>
                                                    <button onClick={() => { deleteConfirm(name.campaignid_id) }}><img src={Delete} alt='delete' style={{ color: "#fff", width: "15px", height: "15px"}} /></button>
                                            </td>
                                        </tr>

                                        {getDeleteConfirm && 
                                            <div className="get-coupon">
                                                <div className="get-coupon-contianer">
                                                    <button className='close' onClick={couponCross}>
                                                        <FontAwesomeIcon icon={faClose} style={{ color: "#000", width: "25px", height: "25px"}} />
                                                    </button>
                                                    <div className="confirm">
                                                        <h4 className='mb-4 text-center'>Delete Campaign?</h4>
                                                        <div className="buttons d-flex justify-content-center align-items-center">
                                                            <button onClick={() => { deleteCampaign(getId)}} className='btn btn-danger w-25 me-4'>Confirm</button>
                                                            <button onClick={couponCross} className='btn w-25 btn-primary'>Cancel</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {getMarket && 
                                            <div className="get-coupon">
                                                <div className="get-coupon-contianer">
                                                <h3>Edit Campaign</h3>
                                                <button className='close' onClick={couponCross}>
                                                    <FontAwesomeIcon icon={faClose} style={{ color: "#000", width: "25px", height: "25px"}} />
                                                </button>
                                                <form action="">
                                                    <div className="input-container">
                                                        <label>Campaign Name</label>
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
                                                        <label>Description</label>
                                                        <input type="text" placeholder={getMarketInfo?.description} onChange={handleInfluenceVisit} value={influenceVisit} />
                                                    </div>
                                                    <button className='button button-blue mt-4 mx-auto' onClick={(event) => editCampaign(name.id, event)}>Edit</button>
                                                </form>
                                                </div>
                                            </div>
                                        }
                                        </>
                                        
                                    )
                                })}
                        
                        </tbody>
                    </table>
                    )
                    :
                    (
                        <>
                            <h5 className='mt-4 text-center'>No Active Campaigns right now</h5>
                            <img src={NoData} alt='no-data' style={{width: '100%', maxHeight: 500, objectFit: 'contain'}} />
                        </>
                    )}
                </Tab.Pane>
                <Tab.Pane eventKey="second" className='campaign'>
                    {campListPending?.length > 0 ? (
                        <table className='w-100'>
                            <tbody className='w-100'>
                                <tr className='headings'>
                                    <th>Campaign Name</th>
                                    <th>Product</th>
                                    <th>Coupons</th>
                                    <th>Discount</th>
                                    <th>Actions</th>
                                </tr>
                                {campListPending?.length > 0 && campListPending?.map((name, i) => {
                                    return(
                                        <>
                                        <tr key={i} className='campaign-inputs'>
                                            <td>{name.campaign_name}</td>
                                            <td>{name.product_name}</td>
                                            <td>{name.coupon_name?.length > 0 ? name.coupon_name?.join(", ") : ""}</td>
                                            <td className='category'>{name.amount?.length > 0 ? name.amount?.join(", ") : ""}</td>
                                            <td>
                                                <button onClick={(event) => {getSingleMarket(name.campaignid_id, event)}} style={{marginRight: 15}}>
                                                    <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#fff", width: "15px", height: "15px"}} />
                                                    </button>
                                                    <button onClick={() => { deleteConfirm(name.campaignid_id ) }}><img src={Delete} alt='delete' style={{ color: "#fff", width: "15px", height: "15px"}} /></button>
                                            </td>
                                        </tr>

                                        {getDeleteConfirm && 
                                            <div className="get-coupon">
                                                <div className="get-coupon-contianer">
                                                    <button className='close' onClick={couponCross}>
                                                        <FontAwesomeIcon icon={faClose} style={{ color: "#000", width: "25px", height: "25px"}} />
                                                    </button>
                                                    <div className="confirm">
                                                        <h4 className='mb-4 text-center'>Delete Campaign?</h4>
                                                        <div className="buttons d-flex justify-content-center align-items-center">
                                                            <button onClick={() => { deleteCampaign(getId)}} className='btn btn-danger w-25 me-4'>Confirm</button>
                                                            <button onClick={couponCross} className='btn w-25 btn-primary'>Cancel</button>
                                                        </div>
                                                    </div>
                                             </div>
                                            </div>
                                        }
                                        {getMarket && 
                                            <div className="get-coupon">
                                                <div className="get-coupon-contianer">
                                                <h3>Edit Campaign</h3>
                                                <button className='close' onClick={couponCross}>
                                                    <FontAwesomeIcon icon={faClose} style={{ color: "#000", width: "25px", height: "25px"}} />
                                                </button>
                                                <form action="">
                                                    <div className="input-container">
                                                        <label>Campaign Name</label>
                                                        <input type="text" onChange={handleCampName} value={campName} />
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
                                                        <input type="text" onChange={handleProdDiscount} value={prodDiscount} />
                                                    </div>
                                                    <div className="input-container">
                                                        <label>Description</label>
                                                        <input type="text" onChange={handleInfluenceVisit} value={influenceVisit} />
                                                    </div>
                                                    <button onClick={(event) => {editCampaign(getMarketInfo?.id, event)}} className='button button-blue mt-4 mx-auto'>Edit Coupon</button>
                                                </form>
                                                </div>
                                            </div>
                                        }
                                        </>
                                    )
                                })}
                            </tbody>
                        </table>
                    ) 
                    : 
                    (
                        <>
                    <h5 className='mt-4 text-center'>No Pending Campaigns right now</h5>
                    <img src={NoData} alt='no-data' style={{width: '100%', maxHeight: 500, objectFit: 'contain'}} />
                    </>
                    )}
                </Tab.Pane>
                <Tab.Pane eventKey="third" className='campaign'>
                    {draftList?.length > 0 ? (
                        <table className='w-100'>
                            <tbody className='w-100'>
                                <tr className='headings'>
                                    <th>Campaign Name</th>
                                    <th>Product</th>
                                    <th>Coupons</th>
                                    <th>Discount</th>
                                    <th>Actions</th>
                                </tr>
                                {draftList?.length > 0 && draftList?.map((name, i) => {
                                    return(
                                        <>
                                            <tr key={i} className='campaign-inputs'>
                                                <td>{name.campaign_name}</td>
                                                    <td>{name.product_name}</td>
                                                    <td>{name.coupon_name?.length > 0 ? name.coupon_name?.join(", ") : ""}</td>
                                                    <td className='category'>{name.amount?.length > 0 ? name.amount?.join(", ") : ""}</td>
                                                    <td>
                                                        <button onClick={(event) => {getSingleMarket(name.campaignid_id, event)}} style={{marginRight: 15}}>
                                                            <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#fff", width: "15px", height: "15px"}} />
                                                            </button>
                                                            <button onClick={() => { deleteConfirm(name.campaignid_id) }}><img src={Delete} alt='delete' style={{ color: "#fff", width: "15px", height: "15px"}} /></button>
                                                    </td>
                                                </tr>

                                        {getDeleteConfirm && 
                                            <div className="get-coupon">
                                                <div className="get-coupon-contianer">
                                                    <button className='close' onClick={couponCross}>
                                                        <FontAwesomeIcon icon={faClose} style={{ color: "#000", width: "25px", height: "25px"}} />
                                                    </button>
                                                    <div className="confirm">
                                                        <h4 className='mb-4 text-center'>Delete Campaign?</h4>
                                                        <div className="buttons d-flex justify-content-center align-items-center">
                                                            <button onClick={() => {deleteCampaign(getId)}} className='btn btn-danger w-25 me-4'>Confirm</button>
                                                            <button onClick={couponCross} className='btn w-25 btn-primary'>Cancel</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {getMarket && 
                                            <div className="get-coupon">
                                                <div className="get-coupon-contianer">
                                                <h3>Edit Campaign</h3>
                                                <button className='close' onClick={couponCross}>
                                                    <FontAwesomeIcon icon={faClose} style={{ color: "#000", width: "25px", height: "25px"}} />
                                                </button>
                                                <form action="">
                                                    <div className="input-container">
                                                        <label>Campaign Name</label>
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
                                                        <label>Description</label>
                                                        <input type="text" placeholder={getMarketInfo?.description} onChange={handleInfluenceVisit} value={influenceVisit} />
                                                    </div>
                                                    <button onClick={(event) => {editCampaign(name?.id, event)}} className='button button-blue mt-4 mx-auto'>Edit Coupon</button>
                                                </form>
                                                </div>
                                            </div>
                                        }
                                        </>
                                    )
                                })}
                            </tbody>
                        </table>
                    ) 
                    : 
                    (
                        <>
                    <h5 className='mt-4 text-center'>No Campaigns in Draft right now</h5>
                    <img src={NoData} alt='no-data' style={{width: '100%', maxHeight: 500, objectFit: 'contain'}} />
                    </>
                    )}
                </Tab.Pane>
            </Tab.Content>
            </Col>
        </Tab.Container>
        
    </div>
    </>
  );
}

export default CampaignManage;