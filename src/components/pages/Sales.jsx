import React, {useState} from 'react';
import { MDBContainer, MDBDatatable } from 'mdb-react-ui-kit';

import MenuBar from '../navbar/Navbar';
import SideBar from '../sidebar/Sidebar';
import './pages.scss';

import EarningsGraph from '../../assests/img/earning-graph.png';
import AverageGraph from '../../assests/img/average-graph.png';
import TotalGraph from '../../assests/img/total-graph.png';
import ProductOne from '../../assests/img/product-1.png';
import ProductTwo from '../../assests/img/product-2.png';
import ProductThree from '../../assests/img/product-3.png';

function Sales() {
    const [searchQuery, setSearchQuery] = useState('');

    const data = [
        { id: '#12598', image: ProductOne, name: 'Off-white shoulder wide s...', price: '₹4,099', sales: 48, stock: 25, status: 'In Stock' },
        { id: '#20587', image: ProductTwo, name: 'Green Velvet semi-sleeve...', price: '₹10,000', sales: 74, stock: 0, status: 'Out of Stock' },
        { id: '#10020', image: ProductThree, name: 'Nike air max 2099', price: '₹17,500', sales: 32, stock: 3, status: 'Restock' }
      ];

    const filteredData = data.filter(row => {
        return Object.values(row).some(value =>
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        );
    });
  return (
    <>
    <div className="sales p-4 page">
        <div className="sales-container">
            <h2 className='text-center'>Sales overview</h2>
            <div className="earnings-list d-flex justify-content-between">
                <div className="earning-box px-3">
                    <h5>Total earnings</h5>
                    <p className='d-flex align-items-start fs-6'> <span>$</span><strong className='fs-3 fw-normal'>5,548.54</strong></p>
                    <img src={EarningsGraph} alt="earning" />
                </div>
                <div className="earning-box px-3">
                    <h5>Average cart size</h5>
                    <p className='d-flex align-items-start fs-6'><span>$</span> <strong className='fs-3 fw-normal'>232.32</strong></p>
                    <img src={AverageGraph} alt="average" />
                </div>
                <div className="earning-box px-3">
                    <h5>Total purchases</h5>
                    <p><strong className='fs-3 fw-normal'>20</strong></p>
                    <img src={TotalGraph} alt="total" />
                </div>
            </div>
            <div className="sales-table mt-5 p-3">
                <div className="table-search d-flex justify-content-between align-items-center mb-5">
                    <h5>Purchases</h5>
                    <input type="text" placeholder='Search' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                </div>
                <table className='w-100'>
                    <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Image</th>
                        <th>Product name</th>
                        <th>Price</th>
                        <th>Total sales</th>
                        <th>Stock</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                        {filteredData.map(row => (
                            <tr key={row.id}>
                            <td>{row.id}</td>
                            <td><img src={row.image} alt="prod-img" /></td>
                            <td>{row.name}</td>
                            <td>{row.price}</td>
                            <td>{row.sales}</td>
                            <td>{row.stock}</td>
                            <td>{row.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    </>
  )
}

export default Sales