import React, {useState, useEffect} from 'react';
import MenuBar from '../navbar/Navbar';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API } from '../../config/Api';

function Profile() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [shopifyUrl, setShopifyUrl] = useState('');
    const [instagramUrl, setInstagramUrl] = useState('');
    const [email, setEmail] = useState('');
    const[userDetails, setUserDetails] = useState([]);
    const [loading, setLoading] = useState(false);

    const tokenId = localStorage.getItem('Token_ID');
    const token = localStorage.getItem("Token");
    const userId = localStorage.getItem("User_ID")

    useEffect(() => {
        setLoading(true);
        axios.get(API.BASE_URL + 'user/id/',  {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(function (response) {
            console.log("Profile Details", response);
            setUserDetails(response.data);
            setUserName(response.data.username);
            setEmail(response.data.email)
            setInstagramUrl(response.data.Instagram_url)
            setShopifyUrl(response.data.shop_url)
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(() => setLoading(false));
    }, [token])

    const createProfile = (e) => {
        setLoading(true);
        e.preventDefault();
        axios.put(API.BASE_URL + 'profile/' + userId + '/', {
            username: userName,
            email: email,
            password: password,
            shopify_url: shopifyUrl,
            instagram_url: instagramUrl,
        }, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(function (response) {
            console.log("Profile", response);
            toast.success("Profile Edited Successfully!");
            localStorage.setItem("User_Name", response.data.username)
            setUserName('');
            setPassword('');
            setShopifyUrl('');
            setInstagramUrl('');
            setEmail('');
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(() => setLoading(false));
    }

  return (
    <div className="profile p-4">
        {loading && <div className='loader'><span></span></div>}
        <MenuBar />
        <form className="profile-form d-flex flex-wrap justify-content-between mt-4">
            <div className="input-container d-flex flex-column mb-4">
                <label>Username</label>
                <input type="text" value={userName} onChange={(e) => {setUserName(e.target.value)}} />
            </div>
            <div className="input-container d-flex flex-column mb-4">
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
            </div>
            <div className="input-container d-flex flex-column mb-4">
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
            </div>
            <div className="input-container d-flex flex-column mb-4">
                <label>Instagram URL</label>
                <input type="text" value={instagramUrl} onChange={(e) => {setInstagramUrl(e.target.value)}} />
            </div>
            <div className="input-container d-flex flex-column mb-4">
                <label>Shopify URL</label>
                <input type="text" value={shopifyUrl} onChange={(e) => {setShopifyUrl(e.target.value)}} />
            </div>
        </form>
        <div className="buttons d-flex justify-content-center align-items-center">
            <button className='button button-blue' onClick={(e) => {createProfile(e)}}>Update Profile</button>
        </div>
    </div>
  )
}

export default Profile