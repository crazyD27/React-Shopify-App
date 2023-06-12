import React from 'react';
import './pages.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const CampaignNew = () => {
  return (
    <div className="campaign-new p-4 page">
        <div className="campaign-new-container d-flex flex-column justify-content-center align-items-center">
          <div className='links d-flex align-items-center justify-content-center w-100 pt-3 pb-4 influence-buttons'>
            <Link to='/create-influencer' className={"button button-black me-4"}>
                Create Campaign for Influencer
                <FontAwesomeIcon icon={faChevronRight} style={{ color: "#fff", width: "25px", height: "25px", marginLeft: 20 }} />
            </Link>
            <Link to='/create-campaign' className={"button button-black"}>
                Create Campaign for Marketplace
                <FontAwesomeIcon icon={faChevronRight} style={{ color: "#000", width: "25px", height: "25px", marginLeft: 20 }} />
            </Link>
          </div>
        </div>
    </div>
  );
}
export default CampaignNew;