import React, {useState, useEffect, useContext} from 'react';
import UserContext from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API } from '../../config/Api';

function Profile() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [shopifyUrl, setShopifyUrl] = useState('');
    const [instagramUrl, setInstagramUrl] = useState('');
    const [email, setEmail] = useState('');
    const [userDetails, setUserDetails] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const {setImage, setName} = useContext(UserContext);
    const [imagePath, setImagePath] = useState('');

    const tokenId = localStorage.getItem('Token_ID');
    const token = localStorage.getItem("Token");
    const userId = localStorage.getItem("User_ID")
    const navigatePath = useNavigate()

    const onFileChange = event => {
        setSelectedFile(event.target.files[0]);
        console.log(event.target.files[0])
        
    };

    console.log("Selected File", selectedFile)

    useEffect(() => {
        setLoading(true);
        axios.get(API.BASE_URL + 'user/id/',  {
            headers: {
                Authorization: `Token 03724f2b05b74f6a10b62ba862b84e921d72490f`
            }
        })
        .then(function (response) {
            console.log("Profile Details", response);
            setUserDetails(response.data);
            setUserName(response.data.username);
            setEmail(response.data.email)
            setInstagramUrl(response.data.Instagram_url)
            setShopifyUrl(response.data.shop_url)
            setImagePath(response.data.url)
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(() => setLoading(false));
    }, [token, imagePath])

    const createProfile = (e) => {
        const formData = new FormData();
        formData.append('image',selectedFile);
        formData.append("username", userName)
        formData.append("email", email)
        formData.append("password", password)
        formData.append("shopify_url", shopifyUrl)
        formData.append("instagram_url", instagramUrl)
        formData.append('type','normal');
        console.log("FormData" ,formData)
        console.log("selectedFile",selectedFile)
        console.log("name", selectedFile.name)
        setLoading(true);
        e.preventDefault();
        axios.put(API.BASE_URL + 'profile/' + userId + '/', formData, {
            headers: {
                Authorization: `Token 03724f2b05b74f6a10b62ba862b84e921d72490f`,
                'Content-Type': 'multipart/form-data'
            },
        }
        )
        .then(function (response) {
            console.log("Profile", response);
            toast.success("Profile Edited Successfully!");
            setUserName('');
            setPassword('');
            setShopifyUrl('');
            setInstagramUrl('');
            setEmail('');
            localStorage.setItem("User_Name", response.data.data.username);
            localStorage.setItem("Image", response.data.url);
            setName(response.data.data.username);
            setImage(response.data.url);
            navigatePath('/profile')
            axios.get(API.BASE_URL + 'user/id/',  {
                headers: {
                    Authorization: `Token 03724f2b05b74f6a10b62ba862b84e921d72490f`
                }
            })
            .then(function (response) {
                console.log("Profile Details", response);
                setUserDetails(response.data);
                setUserName(response.data.username);
                setEmail(response.data.email)
                setInstagramUrl(response.data.Instagram_url)
                setShopifyUrl(response.data.shop_url)
                setImagePath(response.data.url)
                setImage(response.data.url);
            })
            .catch(function (error) {
                console.log(error);
            })

        })
        .catch(function (error) {
            console.log(error);
            if(error.response.data.username) {
                toast.warn("Username may not be blank")
            }
            else if(error.response.data.email == "This field may not be blank.") {
                toast.warn("Email may not be blank")
            }
            else if(error.response.data.email == "Enter a valid email address.") {
                toast.warn("Enter a valid email address")
            }
            else if (error.response.data.password == "This field may not be blank.") {
                toast.warn("Passsword may not be blank")
            }

            else if(error.response.data.password) {
                toast.warn("Password must be more than 8 character")
            }
            else if(error.response.data.instagram_url) {
                toast.warn("Instagram URL cannot be empty")
            }
            else if(error.response.data.shopify_url) {
                toast.warn("Shopify URL cannot be empty")
            }
            else {
                toast.warn("Can not Update Profile right now.")
            }
        })
        .finally(() => setLoading(false));
    }

    // localStorage.setItem("Image", image)
  return (
    <div className="profile p-4 page">
        {loading && <div className='loader'><span></span></div>}
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
                <label>Image</label>
                <div className='d-flex align-items-center'>
                    <input type="file" onChange={onFileChange} />
                    <img src={"https://" +imagePath} alt='profile' className='ms-2' style={{width: 55, height: 55, borderRadius: '50%', objectFit: 'cover'}} />
                </div>
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