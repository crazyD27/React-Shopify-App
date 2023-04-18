import React, {useState,useEffect, useContext} from 'react';
import MenuBar from '../navbar/Navbar';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import axios from 'axios';
import { API } from '../../config/Api';
import UserContext from '../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Delete from '../../assests/img/delete.svg';
import { toast } from 'react-toastify';
import SideBar from '../sidebar/Sidebar';
import './pages.scss';
import NoData from '../../assests/img/no-data.png';

const CampaignMarket = () => {
    const [productNames, setProductNames] = useState([]);
    const [draftProds, setDraftProds] = useState([]);
    const token = localStorage.getItem('Token');
    const [getMarketInfo, setGetMarketInfo] = useState([]);
    const [getMarket, setGetMarket] = useState(false);
    const [prodOffer, setProdOffer] = useState('');
    const [loading, setLoading] = useState(false);
    const [campName, setCampName] = useState('');
    const [prodDiscount, setProdDiscount] = useState('');
    const [influenceVisit, setInfluenceVisit] = useState('');
    const [getId, setGetId] = useState('');
    const [getDeleteConfirm, setDeleteConfirm] = useState(false);
    const {testing, setTesting, marketDraftId, setMarketDraftId, marketDraftList, setMarketDraftList, marketList, setMarketList, marketId, setMarketId} = useContext(UserContext);
    
    useEffect(() => {
        axios.get(API.BASE_URL + 'market/list/',{
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(function (response) {
            console.log("MARKET LIST", response.data)
            setMarketList(response.data.data);
            setMarketId(response.data.product_id);
        })
        .catch(function (error) {
            console.log(error);
        })

        axios.get(API.BASE_URL + 'markdraft/list/',{
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(function (response) {
            console.log("MARKET DRAFT LIST", response.data)
            setMarketDraftList(response.data.data);
            setMarketDraftId(response.data.product_id);
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
       
    }, [token])

    const handleCampName = (event) => {
        setCampName(event.target.value);
    }

    const handleProdDiscount = (event) => {
        setProdDiscount(event.target.value);
    }

    const handleProdOffer = (event) => {
        setProdOffer(event.target.value);
    }

    const handleInfluenceVisit = (event) => {
        setInfluenceVisit(event.target.value);
    }
    useEffect(() => {
        const names = [];
        marketId?.forEach((ids) => {
            const productNamesArr = [];
            ids.forEach((id) => {
            const product = productNames.find((p) => p.id === id);
            if (product) {
                productNamesArr.push(product.title);
            }
            });
            names.push(productNamesArr);
        });
        setTesting(names);
        
        const draftNames = [];
        marketDraftId?.forEach((ids) => {
            const productNamesArr = [];
            ids.forEach((id) => {
                const product = productNames.find((p) => p.id === id);
                if (product) {
                    productNamesArr.push(product.title);
                }
            });
            draftNames.push(productNamesArr);
        });
        setDraftProds(draftNames);

    }, [productNames, marketId, marketDraftId])


    console.log("Testing in Market", testing)

    function deleteConfirm(value) {
        console.log(value);
        setGetId(value);
        setDeleteConfirm(true);
    }

    function deleteCampaign(value) {
        console.log(value)
        setLoading(true);
        axios.delete(API.BASE_URL + 'delete/' + value + '/',{
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(function (response) {
            toast.success("Campaign Deleted!");
            setMarketList(marketList.filter(campaign => campaign.campaignid_id !== value));
            setMarketDraftList(marketDraftList.filter(campaign => campaign.campaignid_id !== value));
            setDeleteConfirm(false)
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(() => setLoading(false));
    }

    const editCampaign = (value, event) => {
        console.log("Product ID:", value);
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
          console.log("EDITED MARKET", response)
          toast.success("Coupon Edited Successfully");
          setCampName('');
          setProdOffer('');
          setProdDiscount('');
          setInfluenceVisit('');
          
          // update marketList with the new data
          const updatedMarketList = marketDraftList.map((market) => {
            if (market.id === value) {
              return {
                ...market,
                campaign_name: campName,
                description: influenceVisit,
                offer: prodOffer,
                product_discount: prodDiscount
              };
            } else {
              return market;
            }
          });
          setMarketDraftList(updatedMarketList);
          
          couponCross();
        })
        .catch(function (error) {
          console.log(error);
          toast.warn("Unable to edit. Please try again later")
        })
        .finally(() => setLoading(false));
    }

    const getSingleMarket = (value, event) => {
        console.log("VLSE", value)
        event.preventDefault();
        setLoading(true);
        axios.get(API.BASE_URL +  'single/' + value + '/', {
            headers: {
                Authorization: `Token ${token}`
        }})
        .then(function (response) {
            console.log("Single Market Data" ,response.data.data)
            setGetMarketInfo(response.data.data[0])
            setGetMarket(true);
            setCampName(response.data.data.campaign_name)
            setProdOffer(response.data.data.offer)
            setProdDiscount(response.data.data.product_discount)
            setInfluenceVisit(response.data.data.description)
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

    console.log("draftProd", testing)

  return (
    <>
    <div className="campaign-market p-4 page">
        {/* <MenuBar /> */}
        {loading && <div className='loader'><span></span></div>} {/* Conditionally render the loader */}

        <div className="campaign-market-container d-flex flex-column w-100">
            <h2 className='text-center my-5'>Campaign Marketplace</h2>

        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Col sm={12}>
            <Nav variant="pills" className="flex-row mb-4 tab-header">
                <Nav.Item>
                    <Nav.Link eventKey="first">Pending Campaigns</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="second">Draft Campaigns</Nav.Link>
                </Nav.Item>
            </Nav>
            </Col>
            <Col sm={12}>
            <Tab.Content>
                <Tab.Pane eventKey="first">
                    {marketList?.length > 0 ? (
                        <table className='w-100 campaign'>
                            <tbody className='w-100'>
                                <tr className='headings'>
                                    <th>Campaign Name</th>
                                    <th>Products</th>
                                    <th>Coupons</th>
                                    <th>Discount</th>
                                    <th>Actions</th>
                                </tr>
                                
                                    {marketList?.map((marketContent, i) => {
                                        return(
                                            <>
                                            <tr>
                                                <td>{marketContent.campaign_name}</td>
                                                <td className='category'>{marketContent.product_name}</td>
                                                <td>{marketContent.coupon_name?.length > 0 ? marketContent.coupon_name?.join(", ") : "No Couopns"}</td>
                                                <td>{marketContent.amount?.length > 0 ? marketContent.amount?.join(", ") : "No Discount"}</td>
                                                <td>
                                                    <button onClick={(event) => {getSingleMarket(marketContent.campaignid_id, event)}} style={{marginRight: 15}}>
                                                        <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#fff", width: "15px", height: "15px"}} />
                                                        </button>
                                                    <button onClick={() => { deleteConfirm(marketContent.campaignid_id)}}><img src={Delete} alt='delete' style={{ color: "#fff", width: "15px", height: "15px"}} /></button>
                                                </td>
                                            </tr>
                                            <form action="">
                                                <div className="input-container">
                                                    <label>Campaign Name</label>
                                                    <input type="text" placeholder={getMarketInfo?.campaign_name} onChange={handleCampName} value={campName} />
                                                </div>
                                                <div className="input-container">
                                                    <label>Offer</label>
                                                    <select onChange={handleProdOffer} value={prodOffer}>
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
                                                <button onClick={(event) => {editCampaign(marketContent?.id, event)}} className='button button-blue mt-4 mx-auto'>Edit Coupon</button>
                                            </form>
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
                                                            <input type="text" value={campName} />
                                                        </div>
                                                        <div className="input-container">
                                                            <label>Offer</label>
                                                            <select onChange={handleProdOffer}>
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
                                                            <input type="text" placeholder={getMarketInfo?.description} onChange={handleInfluenceVisit} value={influenceVisit} />
                                                        </div>
                                                        <button className='button button-blue mt-4 mx-auto' onClick={(event) => { console.log("Product ID:", getMarketInfo?.id); editCampaign(getMarketInfo?.id, event) }}>Edit Campaign</button>
                                                    </form>
                                                    </div>
                                                </div>
                                            }
                                            </>
                                        )
                                    })}
                                
                                
                            </tbody>
                        </table>
                        ) :
                        (
                            <>
                                <h5 className='mt-4 text-center'>No Campaign</h5>
                                <img src={NoData} alt='no-data' style={{width: '100%', maxHeight: 500, objectFit: 'contain'}} />
                            </>
                        )
                    }
                </Tab.Pane>
                <Tab.Pane eventKey="second" className='campaign'>
                    {marketDraftList?.length > 0 ? (
                        <table className='w-100 campaign'>
                            <tbody className='w-100'>
                                <tr className='headings'>
                                    <th>Campaign Name</th>
                                    <th>Products</th>
                                    <th>Coupons</th>
                                    <th>Discount</th>
                                    <th>Actions</th>
                                </tr>
                                
                                    {marketDraftList?.map((marketContent, i) => {
                                        return(
                                            <>
                                            <tr>
                                                <td>{marketContent.campaign_name}</td>
                                                <td className='category'>{marketContent.product_name}</td>
                                                <td>{marketContent.coupon_name?.length > 0 ? marketContent.coupon_name?.join(", ") : "No Couopns"}</td>
                                                <td>{marketContent.amount?.length > 0 ? marketContent.amount?.join(", ") : "No Discount"}</td>
                                                <td>
                                                    <button onClick={(event) => {getSingleMarket(marketContent.campaignid_id, event)}} style={{marginRight: 15}}>
                                                        <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#fff", width: "15px", height: "15px"}} />
                                                        </button>
                                                    <button onClick={() => { deleteConfirm(marketContent.campaignid_id)}}><img src={Delete} alt='delete' style={{ color: "#fff", width: "15px", height: "15px"}} /></button>
                                                </td>
                                            </tr>
                                            <form action="">
                                                <div className="input-container">
                                                    <label>Campaign Name</label>
                                                    <input type="text" placeholder={getMarketInfo?.campaign_name} onChange={handleCampName} value={campName} />
                                                </div>
                                                <div className="input-container">
                                                    <label>Offer</label>
                                                    <select onChange={handleProdOffer} value={prodOffer}>
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
                                                <button onClick={(event) => {editCampaign(marketContent?.id, event)}} className='button button-blue mt-4 mx-auto'>Edit Coupon</button>
                                            </form>
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
                                                        <button className='button button-blue mt-4 mx-auto' onClick={(event) => { console.log("Product ID:", getMarketInfo?.id); editCampaign(getMarketInfo?.id, event) }}>Edit Campaign</button>
                                                    </form>
                                                    </div>
                                                </div>
                                            }
                                            </>
                                        )
                                    })}
                                
                                
                            </tbody>
                        </table>
                        ) :
                        (
                            <>
                                <h5 className='mt-4 text-center'>No Campaign</h5>
                                <img src={NoData} alt='no-data' style={{width: '100%', maxHeight: 500, objectFit: 'contain'}} />
                            </>
                        )
                    }
                </Tab.Pane>
            </Tab.Content>
            </Col>
        </Tab.Container>


        </div>
    </div>
    </>
  );
}

export default CampaignMarket;