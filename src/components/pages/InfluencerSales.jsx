import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { API } from '../../config/Api';import './pages.scss';
import NoData from '../../assests/img/no-data.png';

function InfluencerSales() {
    const [influSales, setInfluSales] = useState([]);
    const [influList, setInfluList] = useState([]);
    const [matchingFullnames, setMatchingFullnames] = useState([]);
    const token = localStorage.getItem("Token");

    useEffect(() => {
        axios.get(API.BASE_URL + 'influencer/list/', {
            headers: {
              Authorization: `Token ${token}`
            }
          })
          .then(function (response) {
            console.log("Influencer List", response);
            setInfluList(response.data.data)
        })
        .catch(function (error) {
            console.log(error);
        })

        axios.get(API.BASE_URL + 'influecercamsale/',{
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(function (response) {
            console.log("Influencer Sales", response);
            setInfluSales(response.data.sale_details)
        })
        .catch(function (error) {
            console.log(error);
        })
        
    }, [])
    useEffect(() => {
        if (influList.length > 0 && influSales.length > 0) {
            const matchingFullnames = influSales.reduce((acc, sale) => {
                const influ = influList.find(influencer => influencer.id === sale.influencer);
                if (influ) {
                    acc.push(influ.fullname);
                }
                return acc;
            }, []);
            setMatchingFullnames(matchingFullnames);
        }
    }, [influList, influSales]);
    console.log("matchingFullnames", matchingFullnames)
  return (
    <div className='p-4 page'>
        <div className="heading">
            <h2 className='mb-5'>Influencer Sales</h2>
        </div>
        {influSales?.length > 0 ? (
            <table className='w-100 campaign'>
                <tbody className='w-100'>
                    <tr className='headings'>
                        <th>Campaign Id</th>
                        <th>Influencer</th>
                        <th>Influencer Fee</th>
                        <th>Sales</th>
                        <th>Amount</th>
                    </tr>
                        {influSales.map((name, i) => {
                            return(
                                <tr className='campaign-inputs'>
                                    <td>{name.campaing_id}</td>
                                    <td>{matchingFullnames[i]}</td>
                                    <td>{name.offer == 'commission' && '$'}{name.influener_fee}{name.offer == 'percentage' && '%'}</td>
                                    <td>{name.sales}</td>
                                    <td>{name.amount}</td>
                                </tr>
                            )
                        })}
                    
                </tbody>
            </table>
            ) :
            (
                <>
                    <h5 className='mt-4 text-center'>No Sales</h5>
                    <img src={NoData} alt='no-data' style={{width: '100%', maxHeight: 220, marginTop: '4rem', objectFit: 'contain'}} />
                    <h3 className='text-center'>No Data Found</h3>
                </>
            )
        }
    </div>
  )
}

export default InfluencerSales
