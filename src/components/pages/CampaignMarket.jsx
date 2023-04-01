import MenuBar from '../navbar/Navbar';
import { Link } from 'react-router-dom';
import './pages.scss';

// Images
import AT from '../../assests/img/at.png';
import Luxe from '../../assests/img/luxe.png';
import Intrigue from '../../assests/img/intrigue.png';
import Tetraleaf from '../../assests/img/tetraleaf.png';

const CampaignMarket = () => {
  return (
    <div className="campaign-market p-4">
        <MenuBar />
        <div className="campaign-market-container d-flex flex-column mt-5 w-100">
            <h4>Active Marketplace</h4>
            <h5 className='my-4'>Campaign Marketplace</h5>
            <div className='campaign-market-list d-flex flex-wrap justify-content-between'>
                <div className='campaign-market-box d-flex flex-column align-items-center justify-content-center'>
                    <div className='content'>
                        <img src={Luxe} alt="campaign-img" />
                        <p>Luxe & Lace</p>
                        <span>3</span>
                    </div>
                    <Link to='/' className='button button-blue'>View Request</Link>
                </div>
                <div className='campaign-market-box d-flex flex-column align-items-center justify-content-center'>
                    <div className='content'>
                        <img src={Intrigue} alt="campaign-img" />
                        <p>Intrigue</p>
                        <span>5</span>
                    </div>
                    <Link to='/' className='button button-blue'>View Request</Link>
                </div>
                <div className='campaign-market-box d-flex flex-column align-items-center justify-content-center'>
                    <div className='content'>
                        <img src={AT} alt="campaign-img" />
                        <p>at-ele</p>
                        <span>3</span>
                    </div>
                    <Link to='/' className='button button-blue'>View Request</Link>
                </div>
                <div className='campaign-market-box d-flex flex-column align-items-center justify-content-center'>
                    <div className='content'>
                        <img src={Tetraleaf} alt="campaign-img" />
                        <p>Tetraleaf</p>
                        <span>5</span>
                    </div>
                    <Link to='/' className='button button-blue'>View Request</Link>
                </div>
            </div>
        </div>
    </div>
  );
}

export default CampaignMarket;