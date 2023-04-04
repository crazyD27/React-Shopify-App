import React, {useState, useEffect, useContext} from 'react';
import UserContext from '../context/UserContext';
import MenuBar from '../navbar/Navbar';
import './pages.scss';
import axios from 'axios';
import { toast } from 'react-toastify';

// Images

const CampaignOver = () => {
    const [productName, setProductName] = useState('');
    const [influencerName, setInfluencerName] = useState('');
    const [campaignName, setCampaignName] = useState('');
    const [selectedDate, setSelectedDate] = useState("");
    
    const [prodDiscount, setProdDiscount] = useState('');
    const [influenceOffer, setInfluenceOffer] = useState('');
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const {userToken, influenceList} = useContext(UserContext)

    const token = localStorage.getItem("Token");
    console.log( "UserToken",userToken)

    const handleProductChange = (event) => {
        setProductName(event.target.value);
    }

    const handleCampaignNameChange = (event) => {
        setCampaignName(event.target.value);
    }

    const handleInfluencerNameChange = (event) => {
        setInfluencerName(event.target.value);
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

    console.log('selectedCoupon', selectedCoupon)

    console.log("selected-date", selectedDate)

    const createNewCampaign = (e) => {
        e.preventDefault();
        axios.post('https://api.myrefera.com/campaign/create/', {
            product: productName,
            influencer_name: influencerName,
            campaign_name: campaignName,
            date: selectedDate,
            coupon: selectedDate,
            offer: influenceOffer,
            product_discount: prodDiscount
        }, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(function (response) {
        console.log("Created New Campaign", response);
        toast.success("New Campaign Created!")
        })
        .catch(function (error) {
        console.log(error);
        })
    }

  return (
    <div className="campaign-new p-4">
        <MenuBar />
        <div className="campaign-new-container d-flex flex-column justify-content-center align-items-center mt-4">
            <h2 className='mb-3'>Campaign request form</h2>
            <p>Create a campaign list. Please fill the form to create new campaign</p>
            <form action="" className='d-flex flex-wrap justify-content-between mt-5'>
                <div className="input-container d-flex flex-column mb-4">
                    <label className="mb-3">Campaign name</label>
                    <input type="text"  onChange={handleCampaignNameChange} value={campaignName} />
                </div>
                <div className="input-container d-flex flex-column mb-4">
                    <label className="mb-3">Influencer need to visit you</label>
                    <div className="input d-flex align-items-center">
                        <span className='d-flex align-items-center justify-content-center me-4'>
                            <input type="radio" id="yes" name="fav_language" value="Yes" />
                            <label for="yes">Yes</label>
                        </span>
                        <span className='d-flex align-items-center justify-content-center'>
                            <input type="radio" id="no" name="fav_language" value="No" />
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
                    <input type="text" onChange={handleInfluenceOffer} value={influenceOffer} />
                </div>
                <div className="input-container d-flex flex-column mb-4">
                    <label className="mb-3">Produc Description</label>
                    <select onChange={handleProductChange} value={productName}>
                        <option value="">--Select an option--</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select>
                </div>
                <div className="input-container d-flex flex-column mb-4">
                    <label className="mb-3">Product discount</label>
                    <input type="text" onChange={handleProductDiscount} value={prodDiscount} />
                </div>
                <div className="input-container d-flex flex-column mb-4">
                    <label className="mb-3">Product url</label>
                    <input type="text" />
                </div>
                <div className="input-container d-flex flex-column mb-4">
                    <label className="mb-3">Influencer from the list.</label>
                    <select onChange={handleInfluencerNameChange} value={influencerName}>
                    <option value="">---Select an option---</option>
                    {influenceList?.length > 0 ? (
                        influenceList?.map((name, i) => {
                            return(
                                <>
                                    <option value={name.username} key={i}>{name.username}</option>
                                </>
                            )
                    })
                    ) : ""}
                    </select>
                </div>
                <div className="input-container d-flex flex-column mb-4">
                    <label className="mb-3">Upload a image</label>
                    <input type="text" />
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
                    <button className='button button-blue' onClick={createNewCampaign}>Send request button</button>
                    <button className='button'>Save in draft</button>
                    <button className='button'>Request sent</button>
                </div>
            </form>
        </div>
    </div>
  );
}

export default CampaignOver;