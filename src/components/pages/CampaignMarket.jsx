import React, {useState,useEffect} from 'react';
import MenuBar from '../navbar/Navbar';
import axios from 'axios';
import { API } from '../../config/Api';
import './pages.scss';

const CampaignMarket = () => {
    const [marketList, setMarketList] = useState([]);
    const [productNames, setProductNames] = useState([]);
    const token = localStorage.getItem('Token');
    
    useEffect(() => {
        axios.get(API.BASE_URL + 'market/list/',{
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(function (response) {
            console.log("Campaign Marketplacee", response.data.data);
            setMarketList(response.data.data);
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
            console.log("Product List Market", response);
            setProductNames(response.data.success.products)
        })
        .catch(function (error) {
            console.log(error);
        })
    }, [token])

  return (
    <div className="campaign-market p-4">
        <MenuBar />
        <div className="campaign-market-container d-flex flex-column w-100">
            <h2 className='text-center my-5'>Campaign Marketplace</h2>
            <table className='w-100 campaign'>
                <tbody className='w-100'>
                    <tr className='headings'>
                        <th>Product Name</th>
                        <th>Offer</th>
                        <th>Categories</th>
                        <th>Actions</th>
                    </tr>
                    {marketList?.length > 0 ? (
                        marketList?.map((marketContent, i) => {
                            return(
                                <tr>
                                    <td>{marketContent.campaign_name}</td>
                                    <td>{marketContent.offer} - {marketContent.product_discount}%</td>
                                    <td className='category'>#Fashion</td>
                                    <td>
                                        <button>Send Request</button>
                                    </td>
                                </tr>
                            )
                        })
                    ) :(
                        <h3>No Campaign</h3>
                    ) }
                    
                </tbody>
            </table>
        </div>
    </div>
  );
}

export default CampaignMarket;