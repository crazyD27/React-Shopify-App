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
    const [influencerList, setInfluencerList] = useState([]);
    const [influencerName, setInfluencerName] = useState(null);
    const [newNames, setNewNames] = useState("")
    const [campaignName, setCampaignName] = useState('');
    const [selectedDate, setSelectedDate] = useState("");
    const [influencerVisit, setInfluencerVisit] = useState('');
    const [showList, setShowList] = useState(false);
    const [prodDiscount, setProdDiscount] = useState('');
    const [influenceOffer, setInfluenceOffer] = useState('');
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [prodList, setProdList] = useState('')
    const [prodDesc, setProdDesc] = useState([]);
    const [influListVisible, setInfluListVisible] = useState(false);
    const [showInfluList, setShowInfluList] = useState(false);
    const [showCampaignList, setShowCampaignList] = useState(false);
    const[influForm, setInfluForm] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

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
    };

    const handleInfluBack = () => {
        setInfluForm(false);
        setShowInfluList(true);
    };

    const handleContinue = () => {
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
    }, [])

    const createNewCampaign = (e) => {
        e.preventDefault();
        axios.post(API.BASE_URL + 'create/', {
            product: newNames,
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
        })
        .catch(function (error) {
        console.log(error);
        })
    }
    
    const createIfluenceCampaign = (e) => {
        e.preventDefault();
        
        axios.post(API.BASE_URL + 'inflcampaign/create/', {
            product: newNames,
            campaign_name: campaignName,
            influencer_name: selectedUsernames.toString(),
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
        })
        .catch(function (error) {
        console.log(error);
        })
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
          document.removeEventListener("click", handleClickOutside);
        };
    }, []);

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

    const handleCheckboxChange = (event, row) => {
        if (event.target.checked) {
          setSelectedRows([...selectedRows, row]);
        } else {
          setSelectedRows(selectedRows.filter(selectedRow => selectedRow !== row));
        }
    };

    console.log('selectedCoupon', selectedCoupon)

    console.log("selected-date", selectedDate)

    console.log("prodDesc",prodDesc)

    console.log(influencerVisit)

    console.log("selectedRows",selectedRows)

    const selectedUsernames = selectedRows.map(row => row.username);

    useEffect(() => {
        setNewNames(productName.toString());
    }, [productName])

    console.log('newNames', newNames)

  return (
    <div className="campaign-new p-4">
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
                    <button onClick={handleBack} className={"button button-blue"}>
                        <FontAwesomeIcon icon={faChevronLeft} style={{ color: "#fff", width: "25px", height: "25px", marginRight: 20 }} />
                        Back
                    </button>
                   {influencerList.length > 0 ? (
                     <table>
                     <tr>
                         <th></th>
                         <th>Name</th>
                         <th>Email</th>
                         <th>Country</th>
                     </tr>
                     {influencerList?.map((list, i) => (
                         <tr key={i}>
                             <td><input type="checkbox" onChange={event => handleCheckboxChange(event, list)} /></td>
                             <td>{list.username}</td>
                             <td>{list.email}</td>
                             <td>{list.country}</td>
                         </tr>
                     ))}
                 </table>
                   ) : <h2 className='my-4 text-center w-100'>No Influencers</h2>}
                    <button onClick={handleContinue }>Continue</button>
                </div>
            )}

            {influForm && (
                <div className='w-100'>
                    <button onClick={handleInfluBack} className={"button button-blue"}>
                        <FontAwesomeIcon icon={faChevronLeft} style={{ color: "#fff", width: "25px", height: "25px", marginRight: 20 }} />
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
                                value={prodDesc.map((desc) => desc.description).join('\n')}
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
                        <div className="buttons d-flex justify-content-between">
                            <button className='button button-blue' onClick={createIfluenceCampaign}>Send request button</button>
                            
                            <button className='button'>Save in draft</button>
                            <button className='button'>Request sent</button>
                        </div>
                    </form>
                </div>
            )}

            {showCampaignList && (
                <>
                    <button onClick={handleBack} className={"button button-blue"}>
                        <FontAwesomeIcon icon={faChevronLeft} style={{ color: "#fff", width: "25px", height: "25px", marginRight: 20 }} />
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
                            value={productName?.join(", ")}
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
                                value={prodDesc.map((desc) => desc.description).join('\n')}
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
                        <div className="buttons d-flex justify-content-between">
                        {influListVisible ? (<button className='button button-blue' onClick={createIfluenceCampaign}>Send request button</button>) : <button className='button button-blue' onClick={createNewCampaign}>Send request button</button>}
                            
                            <button className='button'>Save in draft</button>
                            <button className='button'>Request sent</button>
                        </div>
                    </form>
                </>
            )}
            {/* <div className="buttons d-flex align-items-center justify-content-center w-100 pt-3 pb-4 influence-buttons">
                <button onClick={showInfluList} className={"button button-blue me-4"}>Show Influencer List <FontAwesomeIcon icon={faChevronRight} style={{ color: "#fff", width: "25px", height: "25px", marginLeft: 20 }} /></button>
                <button onClick={hideInfluList} className={"button button-blue"}>Show Campaign List <FontAwesomeIcon icon={faChevronRight} style={{ color: "#fff", width: "25px", height: "25px", marginLeft: 20 }} /></button>
            </div> */}
            
            
        </div>
    </div>
  );
}

export default CampaignOver;