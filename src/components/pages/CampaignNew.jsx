import React, {useState, useEffect, useContext} from 'react';
import UserContext from '../context/UserContext';
import MenuBar from '../navbar/Navbar';
import './pages.scss';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API } from '../../config/Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft   } from '@fortawesome/free-solid-svg-icons';

const CampaignOver = () => {
    const [productName, setProductName] = useState([]);
    const [productIds, setProductIds] = useState([]);
    const [influencerList, setInfluencerList] = useState([]);
    const [influencerName, setInfluencerName] = useState(null);
    const [newNames, setNewNames] = useState("")
    const [campaignName, setCampaignName] = useState('');
    const [selectedDate, setSelectedDate] = useState("");
    const [influencerVisit, setInfluencerVisit] = useState('');
    const [showList, setShowList] = useState(false);
    const [prodDiscount, setProdDiscount] = useState('');
    const [campaignDesc, setCampaignDesc] = useState('');
    const [influenceOffer, setInfluenceOffer] = useState('');
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [prodList, setProdList] = useState('')
    const [prodDesc, setProdDesc] = useState([]);
    const [influListVisible, setInfluListVisible] = useState(false);
    const [showInfluList, setShowInfluList] = useState(false);
    const [showCampaignList, setShowCampaignList] = useState(false);
    const [influForm, setInfluForm] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [checkboxStates, setCheckboxStates] = useState({});
    

    const {marketId, setMarketId, marketList, setMarketList, campListPending, setCampListPending, countCamp, setCountCamp} = useContext(UserContext);

    const token = localStorage.getItem("Token");
  
    const handleShowInfluList = () => {
      setShowInfluList(true);
    };
  
    const handleHideInfluList = () => {
      setShowCampaignList(true);
    };
  
    const handleBack = () => {
      setShowInfluList(false);
      setShowCampaignList(false);
      setProductName([]);
        setCampaignName('');
        setSelectedDate('');
        setInfluenceOffer('');
        setProdDiscount('');
        setInfluencerVisit('');
        setInfluencerName('');
        setProductIds([]);
    };

    const handleCampDesc = (event) => {
        setCampaignDesc(event.target.value);
    }

    const handleInfluBack = () => {
        setInfluForm(false);
        setShowInfluList(true);
        setProductName([]);
        setCampaignName('');
        setSelectedDate('');
        setInfluenceOffer('');
        setProdDiscount('');
        setInfluencerVisit('');
        setInfluencerName('');
        setProductIds([]);
    };

    const handleContinue = () => {
        if (!isChecked) {
            toast.warn('Please select at least one influencer');
            return;
          }
        setShowInfluList(false);
        setInfluForm(true);
    };

    const handleCampaignNameChange = (event) => {
        setCampaignName(event.target.value);
    }

    const handleInfluencerVisit = (event) => {
        setInfluencerVisit(event.target.value);
    }

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    }

    const handleProductDiscount = (event) => {
        setProdDiscount(event.target.value);
    }

    const handleCouponClick = (e) => {
        setSelectedCoupon(e.target.textContent);
    };

    const handleInfluenceOffer = (e) => {
        setInfluenceOffer(e.target.value);
    };

    useEffect(() => {
        axios.get(API.BASE_URL + 'product/list/',{
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(function (response) {
            console.log("Product List", response);
            setProdList(response.data.success.products)
        })
        .catch(function (error) {
            console.log(error);
        })

        axios.get(API.BASE_URL + 'influencer/list/',{
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(function (response) {
            console.log("Influencer List", response.data.data);
            setInfluencerList(response.data.data)
        })
        .catch(function (error) {
            console.log(error);
        })
    }, [token])

    const countList = () => {
        axios.get(API.BASE_URL + 'count/',{
            headers: {
                Authorization: 'Token ' + localStorage.getItem('Token')
            }
        })
        .then(function (response) {
            console.log("Count List in New", response);
            setCountCamp(response.data);
            console.log(countCamp)
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    
    const createNewCampaign = (e) => {
        setLoading(true);
        e.preventDefault();
        axios.post(API.BASE_URL + 'create/', {
            product: productIds.toString(),
            campaign_name: campaignName,
            date: selectedDate,
            coupon: selectedDate,
            offer: influenceOffer,
            product_discount: prodDiscount,
            influencer_visit: influencerVisit
        }, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(function (response) {
            console.log("Created New Campaign", response);
            toast.success("New Campaign Created!");
            setProductName([]);
            setCampaignName('');
            setSelectedDate('');
            setInfluenceOffer('');
            setProdDiscount('');
            setInfluencerVisit('');
            setInfluencerName('');
            setProductIds([])
            setCampaignDesc('');
            axios.get(API.BASE_URL + 'market/list/',{
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            .then(function (response) {
                setMarketList(response.data.data);
                setMarketId(response.data.product_id);
            })
            .catch(function (error) {
                console.log(error);
            })
            countList()
        })
        .catch(function (error) {
            console.log(error);
            if(error.response.data.campaign_name) {
                toast.warn("Campaign Name may not be blank.");
            }
            else if(error.response.data.influencer_visit) {
                toast.warn("Influencer Visit may not be blank.");
            }
            else if(error.response.data.date) {
                toast.warn("Date may not be blank.");
            }
            else if(error.response.data.offer) {
                toast.warn("Offer may not be blank.");
            }
            else if(error.response.data.product) {
                toast.warn("Please selecta any Product.");
            }
            else if(error.response.data.product_discount) {
                toast.warn("Please select any value of Product Discount.");
            }
            else if(error.response.data.coupon) {
                toast.warn("Coupon may not be blank.");
            }
        })
        .finally(() => setLoading(false));
    }
    
    
    const createIfluenceCampaign = (e) => {
        setLoading(true);
        e.preventDefault();
        axios.post(API.BASE_URL + 'inflcampaign/create/', {
            product: productIds.toString(),
            campaign_name: campaignName,
            influencer_name: selectedUsersId.toString(),
            date: selectedDate,
            coupon: selectedDate,
            offer: influenceOffer,
            product_discount: prodDiscount,
            influencer_visit: influencerVisit
        }, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(function (response) {
            console.log("Created New Campaign", response);
            toast.success("New Campaign Created!");
            setCampListPending([...campListPending, response.data.product_details])
            setProductName([]);
            setCampaignName('');
            setSelectedDate('');
            setInfluenceOffer('');
            setProdDiscount('');
            setInfluencerVisit('');
            setInfluencerName('');
            setCampaignDesc('')
            setProductIds([]);

            countList()
        })
        .catch(function (error) {
            console.log(error);
            if(error.response.data.campaign_name) {
                toast.warn("Campaign Name may not be blank.");
            }
            else if(error.response.data.influencer_visit) {
                toast.warn("Influencer Visit may not be blank.");
            }
            else if(error.response.data.date) {
                toast.warn("Date may not be blank.");
            }
            else if(error.response.data.offer) {
                toast.warn("Offer may not be blank.");
            }
            else if(error.response.data.product) {
                toast.warn("Please selecta any Product.");
            }
            else if(error.response.data.product_discount) {
                toast.warn("Please select any value of Product Discount.");
            }
            else if(error.response.data.coupon) {
                toast.warn("Coupon may not be blank.");
            }
        })
        .finally(() => setLoading(false));
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
          document.removeEventListener("click", handleClickOutside);
        };
    }, [token]);

    const handleClickOutside = (event) => {
        const input = document.querySelector(".test input");
        const list = document.querySelector(".test ul");
        if (!input?.contains(event.target) && !list?.contains(event.target)) {
          setShowList(false);
        }
    };

    useEffect(() => {
        const urls = [];
        if (Array.isArray(productName)) {

        Promise.all(
          productName?.map((product) => {
            return axios
              .get(API.BASE_URL + "product/url/?product=" + product, {
                headers: {
                  Authorization: `Token ${token}`,
                },
              })
              .then((response) => {
                return {
                  URL: response?.data.URL,
                  description: response?.data.description,
                };
              })
              .catch((error) => console.log(error));
          })
        ).then((responses) => {
          setProdDesc(responses);
        });
    }
    }, [productName, token]);

    const handleCheckboxChange = (event, row, index) => {
        const checked = event.target.checked;
        setCheckboxStates({
            ...checkboxStates,
            [index]: checked
          });
        setIsChecked(checked);
        if (event.target.checked) {
          setSelectedRows([...selectedRows, row]);
        } else {
          setSelectedRows(selectedRows.filter(selectedRow => selectedRow !== row));
        }
    };

    useEffect(() => {
        const checkbox = document.querySelector('input[type="checkbox"]');
        if (checkbox) {
          setIsChecked(checkbox.checked);
        }
    }, []);

    const selectedUsernames = selectedRows.map(row => row.username);
    const selectedUsersId = selectedRows.map(row => row.id);

    useEffect(() => {
        // Set initial checkbox states when component mounts
        const initialStates = {};
        influencerList.forEach((list, i) => {
          initialStates[i] = false;
        });
        setCheckboxStates(initialStates);
      }, [influencerList]);

    useEffect(() => {
        setNewNames(productName.toString());
    }, [productName])

  return (
    <div className="campaign-new p-4">
        {loading && <div className='loader'><span></span></div>} {/* Conditionally render the loader */}
        <MenuBar />
        <div className="campaign-new-container d-flex flex-column justify-content-center align-items-center">
            {/* <h2 className='mb-3'>Campaign request form</h2>
            <p>Create a campaign list. Please fill the form to create new campaign</p> */}

            {!showInfluList && !showCampaignList && !influForm && (
                <div className='buttons d-flex align-items-center justify-content-center w-100 pt-3 pb-4 influence-buttons'>
                <button onClick={handleShowInfluList} className={"button button-blue me-4"}>
                    Create Campaign for Influencer
                    <FontAwesomeIcon icon={faChevronRight} style={{ color: "#fff", width: "25px", height: "25px", marginLeft: 20 }} />
                </button>
                <button onClick={handleHideInfluList} className={"button button-blue"}>
                    Create Campaign for Marketplace
                    <FontAwesomeIcon icon={faChevronRight} style={{ color: "#fff", width: "25px", height: "25px", marginLeft: 20 }} />
                </button>
                </div>
            )}

            {showInfluList && (
                <div className='w-100 influencer-list'>
                    <button onClick={handleBack} className="button button-blue back">
                        <FontAwesomeIcon icon={faChevronLeft} style={{ color: "#000", width: "15px", height: "15px", marginRight: 5 }} />
                        Back
                    </button>
                   {influencerList.length > 0 ? (
                     <table>
                     <tr>
                         <th></th>
                         <th>Name</th>
                         <th>Followers(in Millions)</th>
                         <th>Engagement Rate</th>
                     </tr>
                     {influencerList?.map((list, i) => (
                         <tr key={i}>
                             <td><input type="checkbox" checked={checkboxStates[i] || false} onChange={event => handleCheckboxChange(event, list, i)} /></td>
                             <td>{list.username}</td>
                             <td>{list.follower / 1000000} M</td>
                             <td>{list.engagement_rate}</td>
                         </tr>
                     ))}
                 </table>
                   ) : <h2 className='my-4 text-center w-100'>No Influencers</h2>}
                    <button onClick={handleContinue} className='button button-blue'>
                        Continue
                    </button>
                </div>
            )}

            {influForm && (
                <div className='w-100'>
                    <button onClick={handleInfluBack} className={"button button-blue back"}>
                        <FontAwesomeIcon icon={faChevronLeft} style={{ color: "#000", width: "15px", height: "15px", marginRight: 5 }} />
                        Back
                    </button>
                    <form action="" className='d-flex flex-wrap justify-content-between mt-5'>
                        <div className="input-container d-flex flex-column mb-4">
                            <label className="mb-3">Campaign name</label>
                            <input type="text"  onChange={handleCampaignNameChange} value={campaignName} />
                        </div>
                        <div className="input-container d-flex flex-column mb-4">
                            <label className="mb-3">Influencer need to visit you</label>
                            <div className="input d-flex align-items-center">
                                <span className='d-flex align-items-center justify-content-center me-4'>
                                    <input type="radio" id="yes" name="fav_language" value="Yes" onChange={handleInfluencerVisit} />
                                    <label for="yes">Yes</label>
                                </span>
                                <span className='d-flex align-items-center justify-content-center'>
                                    <input type="radio" id="no" name="fav_language" value="No" onChange={handleInfluencerVisit} />
                                    <label for="no">No</label>
                                </span>
                            </div>
                        </div>
                        <div className="input-container d-flex flex-column mb-4">
                            <label className="mb-3">Campaign date or range</label>
                            <input type="date" onChange={handleDateChange} value={selectedDate} />
                        </div>
                        <div className="input-container d-flex flex-column mb-4">
                            <label className="mb-3">Offer to influencers</label>
                            <div className="input d-flex align-items-center">
                                <span className='d-flex align-items-center justify-content-center me-4'>
                                    <input type="radio" id="percentage" name="percentagee" value="percentage" onChange={handleInfluenceOffer} />
                                    <label for="percentage">Percentage</label>
                                </span>
                                <span className='d-flex align-items-center justify-content-center'>
                                    <input type="radio" id="commission" name="percentagee" value="commission" onChange={handleInfluenceOffer} />
                                    <label for="commission">Commission</label>
                                </span>
                            </div>
                        </div>
                        <div className="input-container test d-flex flex-column mb-4 drop">
                            <label className="mb-3">Product</label>
                            <input
                            type="text"
                            placeholder={prodList?.length > 0 ? "---Select an option---" : "---No Products Available---"}
                            onClick={() => setShowList(!showList)}
                            value={productName}
                            />
                            {showList && (
                            <ul>
                                {prodList?.map((name, i) => (
                                <li
                                    key={i}
                                    onClick={() => {
                                    setProductName((prevValues) =>
                                        prevValues.includes(name.title)
                                        ? prevValues.filter((value) => value !== name.title)
                                        : [...prevValues, name.title]
                                    );
                                    setProductIds(prevIds =>
                                        prevIds.includes(name.id)
                                            ? prevIds.filter(value => value !== name.id)
                                            : [...prevIds, name.id]
                                    );
                                    setShowList(false);
                                    }}
                                >
                                    {name.title}
                                </li>
                                ))}
                            </ul>
                            )}
                        </div>
                        <div className="input-container d-flex flex-column mb-4">
                            <label className="mb-3">Product URL</label>
                            <textarea
                                name=""
                                id=""
                                cols="30"
                                value={prodDesc?.map((desc) => desc.URL).join('\n')}
                                style={{ color: '#666' }}
                            ></textarea>
                        </div>
                        <div className="input-container d-flex flex-column mb-4 prod-discount">
                            <label className="mb-3">Product discount</label>
                            <input type="text" onChange={handleProductDiscount} value={prodDiscount} />
                        </div>
                        <div className="input-container d-flex flex-column mb-4">
                            <label className="mb-3">Description</label>
                            <textarea
                                name=""
                                id=""
                                cols="30"
                                onChange={handleCampDesc}
                                value={campaignDesc}
                                // value={prodDesc.map((desc) => desc.description).join('\n')}
                                style={{ color: '#666' }}
                            ></textarea>
                        </div>


                        <div className="input-container d-flex flex-column mb-4 influen-list">
                            <label className="mb-3">Influencer from the list.</label>
                            <textarea name="" id="" cols="30" rows="2" value={selectedUsernames} disabled></textarea>
                        </div>
                    
                        <div className="input-container d-flex flex-column mb-4">
                            <label className="mb-3">Tracking coupon</label>
                            <div className="buttons d-flex justify-content-between discount-buttons p-2 mt-0">
                                <button type='button' className='button button-blue' onClick={handleCouponClick}>100YBL</button>
                                <button type='button' className='button' onClick={handleCouponClick}>150YBL</button>
                                <button type='button' className='button' onClick={handleCouponClick}>300YBL</button>
                            </div>
                        </div>
                        <div className="buttons d-flex justify-content-center">
                            <button className='button button-blue' onClick={createIfluenceCampaign}>Save in draft</button>
                            <button className='button ms-4'>Request sent</button>
                        </div>
                    </form>
                </div>
            )}

            {showCampaignList && (
                <>
                    <button onClick={handleBack} className={"button button-blue d-flex me-auto back"}>
                        <FontAwesomeIcon icon={faChevronLeft} style={{ color: "#000", width: "15px", height: "15px", marginRight: 5 }} />
                        Back
                    </button>
                    <form action="" className='d-flex flex-wrap justify-content-between mt-5'>
                        <div className="input-container d-flex flex-column mb-4">
                            <label className="mb-3">Campaign name</label>
                            <input type="text"  onChange={handleCampaignNameChange} value={campaignName} />
                        </div>
                        <div className="input-container d-flex flex-column mb-4">
                            <label className="mb-3">Influencer need to visit you</label>
                            <div className="input d-flex align-items-center">
                                <span className='d-flex align-items-center justify-content-center me-4'>
                                    <input type="radio" id="yes" name="fav_language" value="Yes" onChange={handleInfluencerVisit} />
                                    <label for="yes">Yes</label>
                                </span>
                                <span className='d-flex align-items-center justify-content-center'>
                                    <input type="radio" id="no" name="fav_language" value="No" onChange={handleInfluencerVisit} />
                                    <label for="no">No</label>
                                </span>
                            </div>
                        </div>
                        <div className="input-container d-flex flex-column mb-4">
                            <label className="mb-3">Campaign date or range</label>
                            <input type="date" onChange={handleDateChange} value={selectedDate} />
                        </div>
                        <div className="input-container d-flex flex-column mb-4">
                            <label className="mb-3">Offer to influencers</label>
                            <div className="input d-flex align-items-center">
                                <span className='d-flex align-items-center justify-content-center me-4'>
                                    <input type="radio" id="percentage" name="percentagee" value="percentage" onChange={handleInfluenceOffer} />
                                    <label for="percentage">Percentage</label>
                                </span>
                                <span className='d-flex align-items-center justify-content-center'>
                                    <input type="radio" id="commission" name="percentagee" value="commission" onChange={handleInfluenceOffer} />
                                    <label for="commission">Commission</label>
                                </span>
                            </div>
                        </div>
                        <div className="input-container test d-flex flex-column mb-4 drop">
                            <label className="mb-3">Product</label>
                            <input
                            type="text"
                            placeholder="---Select an option---"
                            onClick={() => setShowList(!showList)}
                            value={productName}
                            />
                            {showList && (
                            <ul>
                                {prodList?.map((name, i) => (
                                <li
                                    key={i}
                                    onClick={() => {
                                    setProductName((prevValues) =>
                                        prevValues.includes(name.title)
                                        ? prevValues.filter((value) => value !== name.title)
                                        : [...prevValues, name.title]
                                    );
                                    setProductIds(prevIds =>
                                        prevIds.includes(name.id)
                                            ? prevIds.filter(value => value !== name.id)
                                            : [...prevIds, name.id]
                                    );
                                    setShowList(false);
                                    }}
                                >
                                    {name.title}
                                </li>
                                ))}
                            </ul>
                            )}
                        </div>
                        <div className="input-container d-flex flex-column mb-4">
                            <label className="mb-3">Product URL</label>
                            <textarea
                                name=""
                                id=""
                                cols="30"
                                value={prodDesc.map((desc) => desc.URL).join('\n')}
                                style={{ color: '#666' }}
                            ></textarea>
                        </div>
                        <div className="input-container d-flex flex-column mb-4 prod-discount">
                            <label className="mb-3">Product discount</label>
                            <input type="text" onChange={handleProductDiscount} value={prodDiscount} />
                        </div>
                        <div className="input-container d-flex flex-column mb-4">
                            <label className="mb-3">Description</label>
                            <textarea
                                name=""
                                id=""
                                cols="30"
                                onChange={handleCampDesc}
                                value={campaignDesc}
                                // value={prodDesc.map((desc) => desc.description).join('\n')}
                                style={{ color: '#666' }}
                            ></textarea>
                        </div>
                    
                        <div className="input-container d-flex flex-column mb-4">
                            <label className="mb-3">Tracking coupon</label>
                            <div className="buttons d-flex justify-content-between discount-buttons p-2 mt-0">
                                <button type='button' className='button button-blue' onClick={handleCouponClick}>100YBL</button>
                                <button type='button' className='button' onClick={handleCouponClick}>150YBL</button>
                                <button type='button' className='button' onClick={handleCouponClick}>300YBL</button>
                            </div>
                        </div>
                        <div className="buttons d-flex justify-content-center">
                        {influListVisible ? (<button className='button button-blue' onClick={createIfluenceCampaign}>Save in draft</button>) : <button className='button button-blue' onClick={createNewCampaign}>Save in draft</button>}
                            <button className='button ms-4'>Request sent</button>
                        </div>
                    </form>
                </>
            )}
        </div>
    </div>
  );
}

export default CampaignOver;