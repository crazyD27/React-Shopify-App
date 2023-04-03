import MenuBar from '../navbar/Navbar';
import { Link } from 'react-router-dom';
import './pages.scss';

// Images
import Edit from '../../assests/img/edit.png';
import Delete from '../../assests/img/delete.svg'

const CampaignMarket = () => {
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
                    <tr>
                        <td>FME Organizations Ltd</td>
                        <td>Percent Of Sale: 15.00%</td>
                        <td className='category'>#Fashion</td>
                        <td>
                            <button>Send Request</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Nesta Technologies</td>
                        <td>Percent Of Sale: 10.00%</td>
                        <td className='category'>#Fashion</td>
                        <td>
                            <button>Send Request</button>
                        </td>
                    </tr>
                    <tr>
                        <td>FME Organizations Ltd</td>
                        <td>Percent Of Sale: 20.00%</td>
                        <td className='category'>#Fashion</td>
                        <td>
                            <button>Send Request</button>
                        </td>
                    </tr>
                    <tr>
                        <td>FME Organizations Ltd</td>
                        <td>Percent Of Sale: 10.00%</td>
                        <td className='category'>#Fashion</td>
                        <td>
                            <button>Send Request</button>
                        </td>
                    </tr>
                    <tr>
                        <td>FME Organizations Ltd</td>
                        <td>Percent Of Sale: 12.00%</td>
                        <td className='category'>#Fashion</td>
                        <td>
                            <button>Send Request</button>
                        </td>
                    </tr>
                    <tr>
                        <td>FME Organizations Ltd</td>
                        <td>Percent Of Sale: 25.00%</td>
                        <td className='category'>#Fashion</td>
                        <td>
                            <button>Send Request</button>
                        </td>
                    </tr>
                    <tr>
                        <td>FME Organizations Ltd</td>
                        <td>Percent Of Sale: 15.00%</td>
                        <td className='category'>#Fashion</td>
                        <td>
                            <button>Send Request</button>
                        </td>
                    </tr>
                    <tr>
                        <td>FME Organizations Ltd</td>
                        <td>Percent Of Sale: 22.00%</td>
                        <td className='category'>#Fashion</td>
                        <td>
                            <button>Send Request</button>
                        </td>
                    </tr>
                    <tr>
                        <td>FME Organizations Ltd</td>
                        <td>Percent Of Sale: 5.00%</td>
                        <td className='category'>#Fashion</td>
                        <td>
                            <button>Send Request</button>
                        </td>
                    </tr>
                    <tr>
                        <td>FME Organizations Ltd</td>
                        <td>Percent Of Sale: 15.00%</td>
                        <td className='category'>#Fashion</td>
                        <td>
                            <button>Send Request</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  );
}

export default CampaignMarket;