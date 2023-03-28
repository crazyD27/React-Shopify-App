import MenuBar from '../navbar/Navbar';
import { Link } from 'react-router-dom';
import './pages.scss';

// Images
import YouTube from '../../assests/img/youtube.png';
import Document from '../../assests/img/document.png';
import IconAction from '../../assests/img/icon-action.png';
import Search from '../../assests/img/search.png';

const CouponList = () => {
  return (
    <div className="coupon p-4">
        <MenuBar />
        <div className="coupon-container d-flex flex-column mt-5 w-100">
            <div className="coupon-video">
                <div className="box">
                    <img src={YouTube} alt="youtube" />
                    <p>Watch the instruction video foe coupon</p>
                </div>
                <div className="box">
                    <img src={Document} alt="youtube" />
                    <p>Read the document</p>
                </div>
            </div>
            <div className='coupon-list d-flex flex-wrap justify-content-between'>
                <h3 className='w-100'>Coupon List</h3>
                <div className="offer-search">
                    <div className="offer-search-box">
                        <h5>Offer & Tracking</h5>
                        <div className="input-container">
                            <input type="text" placeholder='Name/Email' />
                            <button className='button'>Filter</button>
                        </div>
                    </div>

                    <div className="offer-search-box">
                        <h5>Search</h5>
                        <div className="input-container">
                            <input type="text" placeholder='Search coupons' />
                            <button className='button'>
                                <img src={Search} alt="search" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default CouponList;