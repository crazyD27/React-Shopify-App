import React, {useState, useEffect} from 'react';
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
    const [influenceList, setInfluenceList] = useState('')

    const token = localStorage.get('Token')

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

    console.log("selected-date", selectedDate)

    const createNewCampaign = (e) => {
        e.preventDefault();
        axios.post('https://api.myrefera.com/campaign/campaign/create/', {
            product: productName,
            influencer_name: influencerName,
            campaign_name: campaignName,
            date: selectedDate,
            coupon: '',
            offer: '',
            product_discount: ''
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

    useEffect(() => {
        axios.get('https://api.myrefera.com/campaign/product/list/', {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(function (response) {
            console.log("Product List", response);
        })
        .catch(function (error) {
            console.log(error);
        })

        axios.get('https://api.myrefera.com/campaign/influencer/list/')
        .then(function (response) {
            console.log("Influencer List", response);
            setInfluenceList(response.data.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    }, [])

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
                    <input type="text" />
                </div>
                <div className="input-container d-flex flex-column mb-4">
                    <label className="mb-3">Product</label>
                    <select onChange={handleProductChange} value={productName}>
                        <option value="">--Select an option--</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select>
                </div>
                <div className="input-container d-flex flex-column mb-4">
                    <label className="mb-3">Product discount</label>
                    <input type="text" />
                </div>
                <div className="input-container d-flex flex-column mb-4">
                    <label className="mb-3">Upload a image</label>
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
                    <label className="mb-3">Gift coupon to influencers</label>
                    <div className="buttons d-flex justify-content-between discount-buttons p-2 mt-0">
                        <button className='button button-blue'>100YBL</button>
                        <button className='button'>150YBL</button>
                        <button className='button'>300YBL</button>
                    </div>
                </div>
                <div className="input-container d-flex flex-column mb-4">
                    <label className="mb-3">Campaign name</label>
                    <input type="text" />
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