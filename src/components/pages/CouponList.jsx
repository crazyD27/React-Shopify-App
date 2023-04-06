import React, {useEffect, useState} from 'react';

import MenuBar from '../navbar/Navbar';
import { Link } from 'react-router-dom';
import './pages.scss';
import Plus from '../../assests/img/plus.png';
import Download from '../../assests/img/download.png';
import axios from 'axios';
import { API } from '../../config/Api';

// Images
import Search from '../../assests/img/search.png';

const CouponList = () => {
    const token = localStorage.getItem("Token");
    const[couponData, setCouponData] = useState([]);
    useEffect(() => {
        axios.get('https://api.myrefera.com/shopify/coupon/list/',{
            headers: {
                Authorization: `Token ${token}`
        }})
        .then(function (response) {
            console.log("Coupon List", response);
            setCouponData(response.data.data)
        })
        .catch(function (error) {
            console.log(error);
        })
    }, [token])
  return (
    <div className="coupon p-4">
        <MenuBar />
        <div className="coupon-container d-flex flex-column mt-5 w-100">
            <h4 className='mb-4'>Coupon List</h4>
            <div className="filters d-flex justify-content-between align-items-center">
                <div className="input-container d-flex flex-column">
                    <label className='w-100 text-dark mb-3'>Offer & Tracking</label>
                    <div className="search-button d-flex align-items-center">
                        <input type="text" placeholder='Name/Email' />
                        <button type='button'>Filter</button>
                    </div>
                </div>
                <div className="input-container d-flex flex-column">
                    <label className='w-100 text-dark mb-3'>Search</label>
                    <div className="search-button d-flex align-items-center">
                        <input type="text" placeholder='Search coupons' />
                        <img src={Search} alt='search' />
                    </div>
                </div>
            </div>
            <div className="coupon-buttons d-flex justify-content-end align-items-center">
                <button><img src={Plus} aly='plus' /> Create Coupon</button>
                <button><img src={Download} aly='download' /> Export Coupon</button>
            </div>
            <table className="coupon-table">
                <tr className='table-heading'>
                    <th><input type="checkbox" name="" id="" /></th>
                    <th>Coupons</th>
                    <th>Full name</th>
                    <th>Description</th>
                    <th>Created at</th>
                    <th>Actions</th>
                </tr>
                {couponData?.map((couponData, i) => {
                    return(
                        <tr key={i}>
                            <td>{couponData.id}</td>
                            <td>{couponData.coupon}</td>
                            <td></td>
                            <td></td>
                            <td>{couponData.created_at}</td>
                            <td></td>
                        </tr>
                    )
                })}
            </table>
        </div>
    </div>
  );
}

export default CouponList;