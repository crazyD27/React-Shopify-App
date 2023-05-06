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
import { useNavigate } from 'react-router-dom';
import CampaignTable from '../table/CampTable';

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
    const navigate = useNavigate()
    
    useEffect(() => {
        axios.get(API.BASE_URL + 'market/list/',{
            headers: {
                Authorization: `Token b43433d7a2ec93228d1674e3c03bc4a02fd9840b`
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
                Authorization: `Token b43433d7a2ec93228d1674e3c03bc4a02fd9840b`
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
                Authorization: `Token b43433d7a2ec93228d1674e3c03bc4a02fd9840b`
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
                Authorization: `Token b43433d7a2ec93228d1674e3c03bc4a02fd9840b`
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

    const getSingleMarket = (value, event) => {
        console.log("VLSE", value)
        event.preventDefault();
        setLoading(true);
        axios.get(API.BASE_URL +  'single/' + value + '/', {
            headers: {
                Authorization: `Token b43433d7a2ec93228d1674e3c03bc4a02fd9840b`
        }})
        .then(function (response) {
            console.log("Single Market Data" ,response.data.data)
            setGetMarketInfo(response.data.data[0])
            // setGetMarket(true);
            setCampName(response.data.data.campaign_name)
            setProdOffer(response.data.data.offer)
            setProdDiscount(response.data.data.product_discount)
            setInfluenceVisit(response.data.data.description)
            navigate(`/create-campaign/${response.data.data[0].campaignid_id}`)
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

    console.log("Testing in Market", testing)
    console.log("draftProd", testing)

  return (
    <>
        <div className="campaign-market p-4 page">
            {/* <MenuBar /> */}
            {loading && <div className='loader'><span></span></div>}

            <div className="campaign-market-container d-flex flex-column w-100">
                <h2 className='my-5'>Campaign Marketplace</h2>

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
                            <CampaignTable 
                                campList={marketList}
                                getSingleMarket={getSingleMarket}
                                deleteConfirm={deleteConfirm}
                                getDeleteConfirm={getDeleteConfirm}
                                getMarket={getMarket}
                                couponCross={couponCross}
                                getMarketInfo={getMarketInfo}
                                handleProdDiscount={handleProdDiscount}
                                prodDiscount={prodDiscount}
                                handleInfluenceVisit={handleInfluenceVisit}
                                influenceVisit={influenceVisit}
                                deleteCampaign={deleteCampaign}
                                getId={getId}
                                approved={false}
                                approvedButtons = {false}
                                handleCampName={handleCampName}
                                campName={campName}
                                handleProdOffer={handleProdOffer}
                            />
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
                            <CampaignTable 
                                campList={marketDraftList}
                                getSingleMarket={getSingleMarket}
                                deleteConfirm={deleteConfirm}
                                getDeleteConfirm={getDeleteConfirm}
                                getMarket={getMarket}
                                couponCross={couponCross}
                                getMarketInfo={getMarketInfo}
                                handleProdDiscount={handleProdDiscount}
                                prodDiscount={prodDiscount}
                                handleInfluenceVisit={handleInfluenceVisit}
                                influenceVisit={influenceVisit}
                                deleteCampaign={deleteCampaign}
                                getId={getId}
                                approved={false}
                                approvedButtons = {false}
                                handleCampName={handleCampName}
                                campName={campName}
                                handleProdOffer={handleProdOffer}
                            />
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