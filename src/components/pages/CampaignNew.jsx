

import MenuBar from '../navbar/Navbar';
import './pages.scss';

// Images

const CampaignOver = () => {
  return (
    <div className="campaign-new p-4">
        <MenuBar />
        <div className="campaign-new-container d-flex flex-column justify-content-center align-items-center mt-5">
            <p>Create a campaign list. Please fill the form to create new campaign</p>
            <h2>Campaign request form</h2>
            <form action="" className='d-flex flex-wrap justify-content-between mt-5'>
                <div className="input-container d-flex flex-column mb-4">
                    <label className="mb-3">Campaign name</label>
                    <input type="text" />
                </div>
                <div className="input-container d-flex flex-column mb-4">
                    <label className="mb-3">Influencer need to visit you</label>
                    <input type="text" />
                </div>
                <div className="input-container d-flex flex-column mb-4">
                    <label className="mb-3">Campaign date or range</label>
                    <input type="text" />
                </div>
                <div className="input-container d-flex flex-column mb-4">
                    <label className="mb-3">Offer to influencers</label>
                    <input type="text" />
                </div>
                <div className="input-container d-flex flex-column mb-4">
                    <label className="mb-3">Product</label>
                    <input type="text" />
                </div>
                <div className="input-container d-flex flex-column mb-4">
                    <label className="mb-3">Product discount</label>
                    <input type="text" />
                </div>
                <div className="input-container d-flex flex-column mb-4">
                    <label className="mb-3">Upload a image</label>
                    <input type="text" />
                </div>
                <div className="input-container d-flex flex-column mb-4">
                    <label className="mb-3">Influencer from the list.</label>
                    <input type="text" />
                </div>
                <div className="input-container d-flex flex-column mb-4">
                    <label className="mb-3">Gift coupon to influencers</label>
                    <div className="buttons d-flex justify-content-between discount-buttons p-2 mt-0">
                        <button className='button button-blue'>100YBL</button>
                        <button className='button'>150YBL</button>
                        <button className='button'>300YBL</button>
                    </div>
                </div>
                <div className="input-container d-flex flex-column mb-4">
                    <label className="mb-3">Campaign name</label>
                    <input type="text" />
                </div>
                <div className="buttons d-flex justify-content-between">
                    <button className='button button-blue'>Send request button</button>
                    <button className='button'>Save in draft</button>
                    <button className='button'>Request sent</button>
                </div>
            </form>
        </div>
    </div>
  );
}

export default CampaignOver;