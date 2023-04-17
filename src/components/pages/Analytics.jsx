import React from 'react';
import MenuBar from '../navbar/Navbar';
import './pages.scss';
import SideBar from '../sidebar/Sidebar';

import AnalyticsGraph from '../../assests/img/analytics-graph.png';
import ArrowUp from '../../assests/img/arrow-up.png';

function Analytics() {
  return (
    <>
    <div className="analytics p-4">
        <div className="analytics-container d-flex justify-content-between mt-4">
            <div className="analytics-status bg-light p-4 col-7">
                <h3 className='fw-bold'>Analytics</h3>
                <p className='mb-5'>Status</p>
                <div className="graph">
                    <img src={AnalyticsGraph} alt="graph" />
                </div>
            </div>
            <div className="analytics-overview bg-light p-3 col-4">
                <h3>Activity Overview</h3>
                <p className=' mb-4'><img className='me-3' src={ArrowUp} alt="arraw" />16% this month</p>
                <div className="analytics-list mt-3">
                    <ul>
                        <li>
                            <h5>$2400, Purchase</h5>
                            <p>11 JUL 8:10 PM</p>
                        </li>
                        <li>
                            <h5>New order #8744152</h5>
                            <p>11 JUL 11 PM</p>
                        </li>
                        <li>
                            <h5>Affilate Payout</h5>
                            <p>11 JUL 7:64 PM</p>
                        </li>
                        <li>
                            <h5>New user added</h5>
                            <p>11 JUL 1:21 AM</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Analytics