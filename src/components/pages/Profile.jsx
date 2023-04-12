import React, {useState} from 'react';
import MenuBar from '../navbar/Navbar';
import axios from 'axios';
import { toast } from 'react-toastify';

function Profile() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [shopifyUrl, setShopifyUrl] = useState('');
    const [instagramUrl, setInstagramUrl] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const tokenId = localStorage.getItem('Token_ID');
    const token = localStorage.getItem("Token");

    const createProfile = (e) => {
        setLoading(true);
        e.preventDefault();
        axios.put('https://api.myrefera.com/campaign/profile/' + tokenId, {
            username: userName,
            email: email,
            password: password,
            shopify_url: shopifyUrl,
            instagram_url: instagramUrl,
        }, {
            headers: {
                Authorization: `Token a5c2ab07779c1758d4a99e6d1975cad1756e859b`
            }
        })
        .then(function (response) {
            console.log("Profile", response);
            toast.success("Profile Edited Successfully!");
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
        {loading && <div className='loader'><span></span></div>} {/* Conditionally render the loader */}
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