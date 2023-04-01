import { Link } from 'react-router-dom';
import MenuBar from '../navbar/Navbar';
import './pages.scss';

// Images
import People from '../../assests/img/people.png';
import Cursor from '../../assests/img/cursor.png';
import Completed from '../../assests/img/completed.png';
import Money from '../../assests/img/money.png';
import Tracking from '../../assests/img/tracking.png';
import Recruit from '../../assests/img/recruit.png';
import Setting from '../../assests/img/settings.png';
import Payments from '../../assests/img/payments.png';
import Like from '../../assests/img/like.png';
import Date from '../../assests/img/date.png';
import Chat from '../../assests/img/chat.png';
import Join from '../../assests/img/join.png';
import Question from '../../assests/img/question.png';

const CampaignNew = () => {
  return (
    <div className="campaign-over p-3">
        <MenuBar />
        <div className="campaign-over-container d-flex flex-column justify-content-center align-items-center mt-5 w-100">
            <div className="overview-container w-100 bg-light p-4">
                <h3>Overview</h3>
                <div className="overview-list d-flex flex-wrap justify-content-between align-items-center">
                    <div className="overview-box p-3 d-flex align-items-start justify-content-between mb-4">
                        <div className="overview-content">
                            <h5>Active Campaigns</h5>
                            <h3>10</h3>
                            <button>View</button>
                        </div>
                        <div className="overview-image">
                            <img src={People} alt="overview-img" />
                        </div>
                    </div>
                    <div className="overview-box p-3 d-flex align-items-start justify-content-between mb-4">
                        <div className="overview-content">
                            <h5>Pending Campaigns</h5>
                            <h3>10</h3>
                            <button>View</button>
                        </div>
                        <div className="overview-image">
                            <img src={Cursor} alt="overview-img" />
                        </div>
                    </div>
                    <div className="overview-box p-3 d-flex align-items-start justify-content-between mb-4">
                        <div className="overview-content">
                            <h5>Total Campaigns</h5>
                            <h3>10</h3>
                            <button>View</button>
                        </div>
                        <div className="overview-image">
                            <img src={Completed} alt="overview-img" />
                        </div>
                    </div>
                    <div className="overview-box p-3 d-flex align-items-start justify-content-between mb-4">
                        <div className="overview-content">
                            <h5>Sales Campaigns</h5>
                            <h3>10</h3>
                            <button>View</button>
                        </div>
                        <div className="overview-image">
                            <img src={Money} alt="overview-img" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="recommendation-container w-100 mt-4">
                <h3 className='bg-light p-2 mb-0'>Recommendations</h3>
                <div className="recommendation-list d-flex justify-content-between p-4">
                    <div className="recommendation-box">
                        <h4>Suggestions</h4>
                        <ul>
                            <li>Assign coupons  to affiliates so they could promote by store discounts.</li>
                            <li>Upload media resources as marketing tools for affiliates.</li>
                            <li>Send gifts  as sample products to motivate affiliates.</li>
                            <li>Reward affiliates by bonuses  to encourage them to drive more sales.</li>
                        </ul>
                    </div>
                    <div className="recommendation-box">
                        <h2>UpPromote topic webinar</h2>
                        <p>Affiliate empowerment & motivation</p>
                        <div className="buttons">
                            <Link to="/" className="button button-blue">Join the webinar</Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="feature-container mt-4 bg-light w-100">
                <h3 className='p-3'>Feature Details</h3>
                <div className="feature-list d-flex justify-content-between flex-wrap mt-4 p-3">
                    <div className="feature-box px-3 py-4">
                        <div className="feature-heading d-flex justify-content-between align-items-start">
                            <h5>Offer & Tracking</h5>
                            <img src={Tracking} alt="feature-img" />
                        </div>
                        <ul>
                            <li> Add/edit a program</li>
                            <li> Commission on order value</li>
                            <li> Assign affiliate coupon</li>
                        </ul>
                        <div className="buttons">
                            <Link to='/' className="button button-blue">Popular</Link>
                        </div>
                    </div>
                    <div className="feature-box px-3 py-4">
                        <div className="feature-heading d-flex justify-content-between align-items-start">
                            <h5>Recruit affiliates</h5>
                            <img src={Recruit} alt="feature-img" />
                        </div>
                        <ul>
                            <li> Marketplace listing</li>
                            <li> Convert customers to affiliates <strong>*</strong></li>
                            <li> Customer referral</li>
                        </ul>
                        <div className="buttons">
                            <Link to='/' className="button button-blue">Popular</Link>
                        </div>
                    </div>
                    <div className="feature-box px-3 py-4">
                        <div className="feature-heading d-flex justify-content-between align-items-start">
                            <h5>Manage affiliates</h5>
                            <img src={Setting} alt="feature-img" />
                        </div>
                        <ul>
                            <li> Chat with affiliates <strong>*</strong></li>
                            <li> Affiliate registration form</li>
                            <li> Media gallery</li>
                        </ul>
                        <div className="buttons">
                            <Link to='/' className="button button-blue">Popular</Link>
                        </div>
                    </div>
                    <div className="feature-box px-3 py-4">
                        <div className="feature-heading d-flex justify-content-between align-items-start">
                            <h5>Conversion and payments </h5>
                            <img src={Payments} alt="feature-img" />
                        </div>
                        <ul>
                            <li> Approve/deny a referral</li>
                            <li> Payment method</li>
                            <li> PayPal integration <strong>*</strong></li>
                        </ul>
                        <div className="buttons">
                            <Link to='/' className="button button-blue">Popular</Link>
                        </div>
                    </div>
                </div>
                <div className="feature-bottom p-3 mt-3 d-flex justify-content-between align-items-center">
                    <div className="buttons">
                        <Link to='/' className='button button-blue'>View All</Link>
                    </div>
                    <div className="feature-content d-flex justify-content-between">
                        <p className='text-dark me-5'>Do you find this feature directory helpful?</p>
                        <div className="react-icons ms-5">
                            <button><img src={Like} alt="like" /></button>
                            <button><img src={Like} alt="dislike" /></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="support-container mt-4 bg-light w-100 p-3">
                <h3>Get Support</h3>
                <div className="support-list d-flex justify-content-between flex-wrap">
                    <div className="support-box d-flex mb-5 p-4 align-items-start">
                        <img src={Chat} alt="support-img" className='me-3' />
                        <h5>Chat with support team</h5>
                    </div>
                    <div className="support-box d-flex mb-5 p-4 align-items-start">
                        <img src={Join} alt="support-img" className='me-3' />
                        <h5>Join our community</h5>
                    </div>
                    <div className="support-box d-flex mb-5 p-4 align-items-start">
                        <img src={Date} alt="support-img" className='me-3' />
                        <h5>Join our webinar training series</h5>
                    </div>
                    <div className="support-box d-flex mb-5 p-4 align-items-start">
                        <img src={Question} alt="support-img" className='me-3' />
                        <h5>View frequently asked questions</h5>
                    </div>
                </div>
            </div> */}
        </div>
    </div>
  );
}

export default CampaignNew;