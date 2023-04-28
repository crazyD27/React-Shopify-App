import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faClose, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import Delete from '../../assests/img/delete.svg';

const CampaignTable = ({
  campList,
  getSingleMarket,
  deleteConfirm,
  getDeleteConfirm,
  getMarket,
  couponCross,
  getMarketInfo,
  handleProdDiscount,
  prodDiscount,
  handleInfluenceVisit,
  influenceVisit,
  editCampaign,
  deleteCampaign,
  getId,
  handleCampName,
  campName,
  handleProdOffer,
  handleVendorAccept,
  handleVendorDecline,
  showButtons = true
}) => {
  return (
    <table className='w-100 campaign'>
      <tbody className='w-100'>
        <tr className='headings'>
          <th>Campaign Name</th>
          <th>Products</th>
          <th>Coupons</th>
          <th>Discount</th>
          <th>Actions</th>
        </tr>
        {campList?.map((name, i) => {
          return (
            <>
                <tr key={i} className='campaign-inputs'>
                <td>{name.campaign_name}</td>
                <td className='category'>
                    {name.product?.map((name) =>
                    name.product_name
                    ).filter(Boolean).join(", ")}
                </td>
                <td>
                    {name.product?.map((name) =>
                    name.coupon_name
                    ).filter(Boolean).join(", ")}
                </td>
                <td>
                    {name.product?.map((name) =>
                    name.amount
                    ).filter(Boolean).join(", ")}
                </td>
               {showButtons == true ? (
                 <td>
                    <button
                    onClick={(event) => {
                        getSingleMarket(name.campaignid_id, event);
                    }}
                    style={{ marginRight: 15 }}
                    >
                    <FontAwesomeIcon
                        icon={faPenToSquare}
                        style={{ color: "#fff", width: "15px", height: "15px" }}
                    />
                    </button>
                    <button onClick={() => { deleteConfirm(name.campaignid_id) }}>
                    <img src={Delete} alt='delete-icon' />
                    </button>
                </td>
               ):
               (
                <td>
                    <button
                    type="button"
                    style={{ marginRight: 15 }}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Accept"
                    onClick={() => {handleVendorAccept(name.campaignid_id)}}
                  >
                    <FontAwesomeIcon
                      icon={faCheck}
                      style={{
                        color: "#fff",
                        width: "15px",
                        height: "15px",
                      }}
                    />
                  </button>
                  <button
                    type="button"
                    data-toggle="tooltip"
                    data-placement="top"
                    style={{ marginRight: 15 }}
                    title="Decline"
                    onClick={() => {handleVendorDecline(name.campaignid_id)}}
                  >
                    <FontAwesomeIcon
                      icon={faXmark}
                      style={{
                        color: "#fff",
                        width: "15px",
                        height: "15px",
                      }}
                    />
                  </button>
                </td>
                
               )
               }
                </tr>
                {getDeleteConfirm && 
                    <div className="get-coupon">
                        <div className="get-coupon-contianer">
                            <button className='close' onClick={couponCross}>
                                <FontAwesomeIcon icon={faClose} style={{ color: "#000", width: "25px", height: "25px"}} />
                            </button>
                            <div className="confirm">
                                <h4 className='mb-4 text-center'>Delete Campaign?</h4>
                                <div className="buttons d-flex justify-content-center align-items-center">
                                    <button onClick={() => { deleteCampaign(getId)}} className='btn btn-danger w-25 me-4'>Confirm</button>
                                    <button onClick={couponCross} className='btn w-25 btn-primary'>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {getMarket && 
                    <div className="get-coupon">
                        <div className="get-coupon-contianer">
                        <h3>Edit Campaign</h3>
                        <button className='close' onClick={couponCross}>
                            <FontAwesomeIcon icon={faClose} style={{ color: "#000", width: "25px", height: "25px"}} />
                        </button>
                        <form action="">
                            <div className="input-container">
                                <label>Campaign Name</label>
                                <input type="text" placeholder={getMarketInfo?.campaign_name} onChange={handleCampName} value={campName} />
                            </div>
                            <div className="input-container">
                                <label>Offer</label>
                                <select onChange={handleProdOffer}>
                                    <option value="" disabled>{getMarketInfo?.offer}</option>
                                    <option value="fixed_amount">Fixed Amount</option>
                                    <option value="percentage">Precentage</option>
                                </select>
                            </div>
                            <div className="input-container">
                                <label>Discount</label>
                                <input type="text" placeholder={getMarketInfo?.product_discount}  onChange={handleProdDiscount} value={prodDiscount} />
                            </div>
                            <div className="input-container">
                                <label>Description</label>
                                <input type="text" placeholder={getMarketInfo?.description} onChange={handleInfluenceVisit} value={influenceVisit} />
                            </div>
                            <button className='button button-blue mt-4 mx-auto' onClick={(event) => editCampaign(name.id, event)}>Edit</button>
                        </form>
                        </div>
                    </div>
                }
            </>
          );
        })}
      </tbody>
    </table>
  );
};

export default CampaignTable;
