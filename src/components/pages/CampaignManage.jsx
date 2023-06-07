import React, {useEffect, useState, useContext} from 'react';
import MenuBar from '../navbar/Navbar';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import UserContext from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API } from '../../config/Api';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import CampaignTable from '../table/CampTable';

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
    const [influencerList, setInfluencerList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pendingId, setPendingId] = useState([]);
    const [activeId, setActiveId] = useState([]);
    const [approvedList, setApprovedList] = useState([]);
    const [productNames, setProductNames] = useState([]);
    const [pendingNames, setPendingNames] = useState([]);
    const [activeNames, setActiveNames] = useState([]);
    const [vendorDecline, setVendorDecline] = useState([]);
    const [vendorDeclineList, setVendorDeclineList] = useState([]);
    const [getId, setGetId] = useState('');
    const token = localStorage.getItem('Token');
    const navigate = useNavigate();

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
        const fetchData = async () => {
            try {
              const [influencerResponse, approvalResponse] = await Promise.all([
                axios.get(API.BASE_URL + 'influencer/list/', {
                  headers: {
                    Authorization: `Token ${token}`
                  }
                }),
                axios.get(API.BASE_URL + 'vendor_approval/', {
                  headers: {
                    Authorization: `Token ${token}`
                  }
                })
              ]);
        
              console.log("Influencer List", influencerResponse.data.data);
              setInfluencerList(influencerResponse.data.data);
        
              console.log("Approved List", approvalResponse.data.data);
              setApprovedList(approvalResponse.data.data);
        
              const updatedApprovedList = approvalResponse.data.data.map((approved) => {
                const matchingInfluencer = influencerResponse.data.data.find(
                  (influencer) => influencer.id === approved.influencer_name
                );
                if (matchingInfluencer) {
                  return { ...approved, username: matchingInfluencer.username };
                }
                return approved;
              });
              setApprovedList(updatedApprovedList);
              console.log("Approved Names", updatedApprovedList);
        
            } catch (error) {
              console.log(error);
            }
        };
        
        fetchData();

        const fetchActiveData = async () => {
            try {
              const [influencerResponse, activeResponse] = await Promise.all([
                axios.get(API.BASE_URL + 'influencer/list/', {
                  headers: {
                    Authorization: `Token ${token}`
                  }
                }),
                axios.get(API.BASE_URL + 'active/', {
                  headers: {
                    Authorization: `Token ${token}`
                  }
                })
              ]);
        
              console.log("Influencer List", influencerResponse.data.data);
              setInfluencerList(influencerResponse.data.data);
        
              console.log("Active List", activeResponse.data.data);
              setCampList(activeResponse.data.data);
        
              const updatedActiveList = activeResponse.data.data.map((approved) => {
                const matchingInfluencer = influencerResponse.data.data.find(
                  (influencer) => influencer.id === approved.influencer_name
                );
                if (matchingInfluencer) {
                  return { ...approved, username: matchingInfluencer.username };
                }
                return approved;
              });
              setCampList(updatedActiveList);
              console.log("Active Names", updatedActiveList);
        
            } catch (error) {
              console.log(error);
            }
        };
        
        fetchActiveData();

        const fetchDeclineData = async () => {
            try {
              const [influencerResponse, declineResponse] = await Promise.all([
                axios.get(API.BASE_URL + 'influencer/list/', {
                  headers: {
                    Authorization: `Token ${token}`
                  }
                }),
                axios.get(API.BASE_URL + 'vendor_decline/',{
                    headers: {
                        Authorization: `Token ${token}`
                    }
                })
              ]);
        
              console.log("Influencer List", influencerResponse.data.data);
              setInfluencerList(influencerResponse.data.data);
        
              console.log("Decline List", declineResponse.data.data);
              setVendorDecline(declineResponse.data.data);
        
              const updatedDeclinedList = declineResponse.data.data.map((approved) => {
                const matchingInfluencer = influencerResponse.data.data.find(
                  (influencer) => influencer.id === approved.influencer_name
                );
                if (matchingInfluencer) {
                  return { ...approved, username: matchingInfluencer.username };
                }
                return approved;
              });
              setVendorDeclineList(updatedDeclinedList);
              console.log("Approved Names", updatedDeclinedList);
        
            } catch (error) {
              console.log(error);
            }
        };
        
        fetchDeclineData();

        const fetchUpdatedDeclineData = async () => {
            try {
              const [influencerResponse, updatedDeclineResponse] = await Promise.all([
                axios.get(API.BASE_URL + 'influencer/list/', {
                  headers: {
                    Authorization: `Token ${token}`
                  }
                }),
                axios.get(API.BASE_URL + 'vendor_decline/', {
                  headers: {
                    Authorization: `Token ${token}`
                  }
                })
              ]);
        
              console.log("Influencer List", influencerResponse.data.data);
              setInfluencerList(influencerResponse.data.data);
        
              console.log("Active List", updatedDeclineResponse.data.data);
              setVendorDeclineList(updatedDeclineResponse.data.data);
        
              const updatedDeclineList = updatedDeclineResponse.data.data.map((approved) => {
                const matchingInfluencer = influencerResponse.data.data.find(
                  (influencer) => influencer.id === approved.influencer_name
                );
                if (matchingInfluencer) {
                  return { ...approved, username: matchingInfluencer.username };
                }
                return approved;
              });
              setVendorDeclineList(updatedDeclineList);
              console.log("Active Names", updatedDeclineList);
        
            } catch (error) {
              console.log(error);
            }
        };
        
        fetchUpdatedDeclineData();

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
            console.log("Draft List",response);
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
            // setGetMarket(true);
            setCampName(response.data.data.campaign_name)
            setProdOffer(response.data.data.offer)
            setProdDiscount(response.data.data.product_discount)
            setInfluenceVisit(response.data.data.description)
            navigate(`/create-influencer/${response.data.data[0].campaignid_id}`)
        })
        .catch(function (error) {
            console.log(error);
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

    const handleVendorAccept = (value, idValue) => {
        setLoading(true);
        axios.post(API.BASE_URL + 'vendor/accept/' + value + '/' + idValue + '/',{},{
            headers: { 
                Authorization: `Token ${token}` 
            }
        })
        .then(function (response) {
            console.log("Accepted" ,response)
            toast.success("Campaign Accepted!");
            setCampList(campList.filter(campaign => campaign.campaignid_id !== value));
            setCampListPending(campListPending.filter(campaign => campaign.campaignid_id !== value));
            setDraftList(draftList.filter(campaign => campaign.campaignid_id !== value))
            const fetchData = async () => {
                try {
                  const [influencerResponse, approvalResponse] = await Promise.all([
                    axios.get(API.BASE_URL + 'influencer/list/', {
                      headers: { 
                        Authorization: `Token ${token}` 
                      }
                    }),
                    axios.get(API.BASE_URL + 'vendor_approval/', {
                      headers: { 
                        Authorization: `Token ${token}` 
                      }
                    })
                  ]);
            
                  console.log("Influencer List", influencerResponse.data.data);
                  setInfluencerList(influencerResponse.data.data);
            
                  console.log("Approved List", approvalResponse.data.data);
                  setApprovedList(approvalResponse.data.data);
            
                  const updatedApprovedList = approvalResponse.data.data.map((approved) => {
                    const matchingInfluencer = influencerResponse.data.data.find(
                      (influencer) => influencer.id === approved.influencer_name
                    );
                    if (matchingInfluencer) {
                      return { ...approved, username: matchingInfluencer.username };
                    }
                    return approved;
                  });
                  setApprovedList(updatedApprovedList);
                  console.log("Approved Names", updatedApprovedList);
            
                } catch (error) {
                  console.log(error);
                }
            };
            fetchData();
    
            const fetchActiveData = async () => {
                try {
                  const [influencerResponse, activeResponse] = await Promise.all([
                    axios.get(API.BASE_URL + 'influencer/list/', {
                      headers: { 
                        Authorization: `Token ${token}` 
                      }
                    }),
                    axios.get(API.BASE_URL + 'active/', {
                      headers: { 
                        Authorization: `Token ${token}` 
                      }
                    })
                  ]);
            
                  console.log("Influencer List", influencerResponse.data.data);
                  setInfluencerList(influencerResponse.data.data);
            
                  console.log("Active List", activeResponse.data.data);
                  setCampList(activeResponse.data.data);
            
                  const updatedActiveList = activeResponse.data.data.map((approved) => {
                    const matchingInfluencer = influencerResponse.data.data.find(
                      (influencer) => influencer.id === approved.influencer_name
                    );
                    if (matchingInfluencer) {
                      return { ...approved, username: matchingInfluencer.username };
                    }
                    return approved;
                  });
                  setCampList(updatedActiveList);
                  console.log("Active Names", updatedActiveList);
            
                } catch (error) {
                  console.log(error);
                }
            };
            fetchActiveData();
            
        })
        .catch(function (error) {
            console.log(error);
            toast.warn("Cannot Accept right now. Please try again later")
        })
        .finally(() => setLoading(false));
    }

    const handleVendorDecline = (value, idValue) => {
        setLoading(true);
        axios.post(API.BASE_URL + 'vendor/decline/' + value + '/' + idValue + '/',{},{
            headers: { 
                Authorization: `Token ${token}` 
            }
        })
        .then(function (response) {
            console.log("Decline" ,response)
            toast.success("Campaign Declined!");
            setCampList(campList.filter(campaign => campaign.campaignid_id !== value));
            setCampListPending(campListPending.filter(campaign => campaign.campaignid_id !== value));
            setDraftList(draftList.filter(campaign => campaign.campaignid_id !== value));
            console.log("Approve Listttt", approvedList);
            const fetchData = async () => {
                try {
                  const [influencerResponse, approvalResponse] = await Promise.all([
                    axios.get(API.BASE_URL + 'influencer/list/', {
                      headers: {
                        Authorization: `Token ${token}`
                      }
                    }),
                    axios.get(API.BASE_URL + 'vendor_approval/', {
                      headers: {
                        Authorization: `Token ${token}`
                      }
                    })
                  ]);
            
                  console.log("Influencer List", influencerResponse.data.data);
                  setInfluencerList(influencerResponse.data.data);
            
                  console.log("Approved List", approvalResponse.data.data);
                  setApprovedList(approvalResponse.data.data);
            
                  const updatedApprovedList = approvalResponse.data.data.map((approved) => {
                    const matchingInfluencer = influencerResponse.data.data.find(
                      (influencer) => influencer.id === approved.influencer_name
                    );
                    if (matchingInfluencer) {
                      return { ...approved, username: matchingInfluencer.username };
                    }
                    return approved;
                  });
                  setApprovedList(updatedApprovedList);
                  console.log("Approved Names", updatedApprovedList);
            
                } catch (error) {
                  console.log(error);
                }
            };
            
            fetchData();
        })
        .catch(function (error) {
            console.log(error);
            toast.warn("Cannot Decline right now. Please try again later")
        })
        .finally(() => setLoading(false));
    }

    useEffect(() => {
        getPendingProduct()
        getActiveProduct()
    }, [])

    console.log("CampList", approvedList);

  return (
    <>
    <div className="campaign-manage-container p-4 page">
        {loading && <div className='d-flex loader-container flex-column'><div className='loader'><span></span></div> <p className='text-white'>Processing...</p></div>}
        <h2 className='my-5'>Manage Campaign</h2>
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
                <Nav.Item>
                    <Nav.Link eventKey="four">Approved Campaigns</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="five">Declined Campaigns</Nav.Link>
                </Nav.Item>
            </Nav>
            </Col>
            <Col sm={12}>
            <Tab.Content>
                <Tab.Pane eventKey="first">
                    {campList?.length > 0 ? (
                        <CampaignTable campList={campList}
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
                            approved={true}
                            approvedButtons = {true}
                            editCampaign={editCampaign}
                            deleteCampaign={deleteCampaign}
                            getId={getId}
                            handleCampName={handleCampName}
                            campName={campName}
                            handleProdOffer={handleProdOffer}
                            showEdit={false}
                        />
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
                        <CampaignTable 
                            campList={campListPending}
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
                            approved={false}
                            approvedButtons = {false}
                            editCampaign={editCampaign}
                            deleteCampaign={deleteCampaign}
                            getId={getId}
                            handleCampName={handleCampName}
                            campName={campName}
                            handleProdOffer={handleProdOffer}
                        />
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
                        <CampaignTable 
                        campList={draftList}
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
                        editCampaign={editCampaign}
                        deleteCampaign={deleteCampaign}
                        getId={getId}
                        approved={false}
                        approvedButtons = {false}
                        handleCampName={handleCampName}
                        campName={campName}
                        handleProdOffer={handleProdOffer}
                    />
                    ) 
                    : 
                    (
                        <>
                    <h5 className='mt-4 text-center'>No Campaigns in Draft right now</h5>
                    <img src={NoData} alt='no-data' style={{width: '100%', maxHeight: 500, objectFit: 'contain'}} />
                    </>
                    )}
                </Tab.Pane>
                <Tab.Pane eventKey="four" className='campaign'>
                    {approvedList?.length > 0 ? (
                        <CampaignTable 
                            campList={approvedList}
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
                            editCampaign={editCampaign}
                            deleteCampaign={deleteCampaign}
                            getId={getId}
                            handleCampName={handleCampName}
                            campName={campName}
                            handleProdOffer={handleProdOffer}
                            showButtons={false}
                            handleVendorAccept={handleVendorAccept}
                            handleVendorDecline={handleVendorDecline}
                        />
                    ) 
                    : 
                    (
                        <>
                    <h5 className='mt-4 text-center'>No Campaigns in Draft right now</h5>
                    <img src={NoData} alt='no-data' style={{width: '100%', maxHeight: 500, objectFit: 'contain'}} />
                    </>
                    )}
                </Tab.Pane>
                <Tab.Pane eventKey="five" className='campaign'>
                    {vendorDeclineList?.length > 0 ? (
                        <CampaignTable 
                            campList={vendorDeclineList}
                            declineInflu = {false}
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
                            editCampaign={editCampaign}
                            deleteCampaign={deleteCampaign}
                            getId={getId}
                            handleCampName={handleCampName}
                            campName={campName}
                            handleProdOffer={handleProdOffer}
                            showButtons={false}
                            handleVendorAccept={handleVendorAccept}
                            handleVendorDecline={handleVendorDecline}
                        />
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