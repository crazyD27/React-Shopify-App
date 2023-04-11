import React, {useState,useEffect, useContext} from 'react';
import MenuBar from '../navbar/Navbar';
import axios from 'axios';
import { API } from '../../config/Api';
import UserContext from '../context/UserContext';
import './pages.scss';

const CampaignMarket = () => {
    const [productNames, setProductNames] = useState([]);
    const [testing, setTesting] = useState([]);
    const token = localStorage.getItem('Token');
    const {marketList, setMarketList, marketId, setMarketId} = useContext(UserContext);
    
    useEffect(() => {
        axios.get(API.BASE_URL + 'market/list/',{
            headers: {
                Authorization: `Token 080448d91dbfd8ada4e87341d05f58a474fb79da`
            }
        })
        .then(function (response) {
            setMarketList(response.data.data);
            setMarketId(response.data.product_id);
        })
        .catch(function (error) {
            console.log(error);
        })

        axios.get(API.BASE_URL + 'product/list/',{
            headers: {
                Authorization: `Token 080448d91dbfd8ada4e87341d05f58a474fb79da`
            }
        })
        .then(function (response) {
            setProductNames(response.data.success.products);
        })
        .catch(function (error) {
            console.log(error);
        })

       
    }, [token])

    

    const getnameProduct = () => {
        const names = [];
        marketId.forEach((ids) => {
            const productNamesArr = [];
            ids.forEach((id) => {
                const product = productNames.find((p) => p.id === id);
                if (product) {
                    productNamesArr.push(product.title);
                }
            });
            names.push(productNamesArr);
        });
        setTesting(names);
    };

    console.log("Testing in Market", testing)
    useEffect(() => {
        getnameProduct()
    }, [productNames])


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
                                    <td className='category'>{testing[i]?.join(", ")}</td>
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