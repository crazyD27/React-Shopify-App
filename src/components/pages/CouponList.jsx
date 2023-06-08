import React, {useEffect, useState} from 'react';
import MenuBar from '../navbar/Navbar';
import { Link } from 'react-router-dom';
import './pages.scss';
import Plus from '../../assests/img/plus.png';
import Download from '../../assests/img/download.png';
import axios from 'axios';
import { API } from '../../config/Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import SideBar from '../sidebar/Sidebar';

// Images
import Search from '../../assests/img/search.png';
import Delete from '../../assests/img/delete.svg';
import NoData from '../../assests/img/no-data.png';

const CouponList = () => {
    const token = localStorage.getItem("Token");
    const [couponData, setCouponData] = useState([]);
    const [couponList, setCouponList] = useState(false);
    const [tracking, setTracking] = useState(false);
    const [getCoupon, setGetCoupon] = useState(false);
    const [influencerList, setInfluencerList] = useState([]);
    const [selectedInfluencer, setSelectedInfluencer] = useState(null);
    const [getCouponInfo, setGetCouponInfo] = useState('')
    const [oneTime, setOneTime] = useState(false);
    const [couponDesc, setCouponDesc] = useState('');
    const [discountType, setDiscountType] = useState('');
    const [couponAmount, setCouponAmount] = useState('');
    const [couponStatus, setCouponStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [prodList, setProdList] = useState('');
    const [showList, setShowList] = useState(false);
    const [showInfluencer, setShowInfluencer] = useState(false);
    const [productName, setProductName] = useState([]);
    const [influencerNames, setInfluencerNames] = useState([]);
    const [productIds, setProductIds] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [filterValue, setFilterValue] = useState("");
    const [selectedProductNames, setSelectedProductNames] = useState([]);
    const [showInfluencerDropdown, setShowInfluencerDropdown] = useState(false);
    const [matchingInfluencers, setMatchingInfluencers] = useState([]);

    const handleCouponDesc = (event) => {
        setCouponDesc(event.target.value);
    }

    const handleDiscountType = (event) => {
        setDiscountType(event.target.value);
    }

    const handleCouponAmount = (event) => {
        setCouponAmount(event.target.value);
    }

    useEffect(() => {
        axios.get(API.SHOPIFY_URL +  'coupon/list/',{
            headers: {
                Authorization: `Token ${token}`
        }})
        .then(function (response) {
            console.log("Coupon List", response);
            setCouponData(response.data.coupon)
        })
        .catch(function (error) {
            console.log(error);
        })
        axios.get(API.BASE_URL + 'influencer/list/',{
            headers: {
 
                Authorization: `Token ${token}`
            }
        })
        .then(function (response) {
            console.log("Influencer List", response.data.data);
            setInfluencerList(response.data.data)
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(() => setLoading(false));
    }, [token])

    useEffect(() => {

        axios.get(API.BASE_URL + 'product/list/',{
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(function (response) {
            console.log(response.data);
            setProdList(response.data.success.products)
        })
        .catch(function (error) {
            console.log(error);
        })
    }, [token])

    const deleteCoupon = (value, event) => {
        event.preventDefault();
        setLoading(true);
        axios.get(API.SHOPIFY_URL +  'coupon/delete/?price=' + value,{
            headers: {
                Authorization: `Token ${token}`
        }})
        .then(function (response) {
            console.log("Coupon List", response);
            setCouponData(couponData.filter(coupon => coupon.id !== value));
            toast.success("Coupon Deleted Successfully")
        })
        .catch(function (error) {
            console.log(error);
            toast.warn("Unable to Delete the Coupon")
        })
        .finally(() => setLoading(false));
    }

    const createCoupon = (event) => {
        event.preventDefault()
        setLoading(true);
        axios.post(API.SHOPIFY_URL +  'create/code/', {
            discount_code: couponDesc,
            discount_type: discountType,
            amount: couponAmount
        }, {
            headers: {
                Authorization: `Token ${token}`
        }})
        .then(function (response) {
            console.log("Coupon Created", response);
            setCouponData([...couponData, response.data]);
            toast.success("Coupon Created Successfully");
            setCouponDesc('')
            setDiscountType('')
            setCouponAmount('')
            couponCross()
        })
        .catch(function (error) {
            console.log(error);
            if (error.response.data.error == "Coupon field is required") {
                toast.warn("Coupon field is required")
            }
            else if (error.response.data.error == "discount code  field is required") {
                toast.warn("Coupon field is required")
            }
            else if (error.response.data.error == "discount type field is required") {
                toast.warn("Discount type field is required")
            }
            else if (error.response.data.error == "Amount field is required") {
                toast.warn("Amount field is required")
            }
            else {
                toast.error("Could not create a coupon right now")
            }
        })
        .finally(() => setLoading(false));
    }

    const editCoupon = (value, event) => {
        event.preventDefault();
        setLoading(true);
        axios.post(API.SHOPIFY_URL +  'coupon/edit/?price=' + value, {
            discount_code: couponDesc,
            discount_type: discountType,
            amount: couponAmount,
        }, {
            headers: {
 
                Authorization: `Token ${token}`

        }})
        .then(function (response) {
            console.log("Coupon Edited", response);
            toast.success("Coupon Edited Successfully");
            setCouponDesc('')
            setDiscountType('')
            setCouponAmount('')
            axios.get(API.SHOPIFY_URL +  'coupon/list/',{
                headers: {
 
                    Authorization: `Token ${token}`
 
            }})
            .then(function (response) {
                console.log("Coupon List", response);
                setCouponData(response.data.coupon);
            })
            .catch(function (error) {
                console.log(error);
            })
            couponCross()
        })
        .catch(function (error) {
            console.log(error);
            toast.warn("Fields should not be empty!");
        })
        .finally(() => setLoading(false));
    }

    const editCouponProducts = (value, event) => {
        event.preventDefault();
        setLoading(true);
        axios.post(API.SHOPIFY_URL +  'particular/edit/?price=' + value, {
            discount_code: couponDesc,
            discount_type: discountType,
            amount: couponAmount.toString(),
            influencer_id: getCouponInfo?.indb,
            product_id: productIds.toString(),
            influ_ids: selectedInfluencer?.id
        }, {
            headers: {
 
                Authorization: `Token ${token}`

        }})
        .then(function (response) {
            console.log("Coupon Edited", response);
            toast.success("Coupon Edited Successfully");
            setCouponDesc('')
            setDiscountType('')
            setCouponAmount('')
            setProductIds('')
            axios.get(API.SHOPIFY_URL +  'coupon/list/',{
                headers: {
 
                    Authorization: `Token ${token}`
 
            }})
            .then(function (response) {
                console.log("Coupon List", response);
                setCouponData(response.data.coupon);
            })
            .catch(function (error) {
                console.log(error);
            })
            couponCross()
        })
        .catch(function (error) {
            console.log(error);
            toast.warn("Fields should not be empty!");
        })
        .finally(() => setLoading(false));
    }

    const getSingleCoupon = (value, event) => {
        event.preventDefault();
        setLoading(true);
        axios.get(API.SHOPIFY_URL + 'single/data/?price=' + value, {
          headers: {
            Authorization: `Token ${token}`
          }
        })
        .then(function (response) {
          console.log("Single Coupon", response.data);
          setGetCouponInfo(response.data);
          setGetCoupon(true);
          setCouponDesc(response.data.title);
          setDiscountType(response.data.discount_type);
          setCouponAmount(Math.trunc(response.data.amount.substring(1)));
          setCouponStatus(response.data.status);
          const matchingInfluencers = influencerList.filter(
            (influencer) => influencer.id === response.data.infl_id[0].influencer_id
          );
          setMatchingInfluencers(matchingInfluencers);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => setLoading(false));
    }

    useEffect(() => {
        const productIds = getCouponInfo?.product_name || [];
        const selectedProducts = prodList && prodList.filter(prod => productIds.includes(prod.id)) || [];
        setSelectedProductNames(selectedProducts.map(prod => prod.title));
    }, [getCouponInfo, prodList]);
      
    useEffect(() => {
        const selectedProductIds = prodList && prodList.filter(prod => selectedProductNames.includes(prod.title)).map(prod => prod.id) || [];
        setProductIds(selectedProductIds);
    }, [selectedProductNames, prodList]);

    const couponCreateShow = () => {
        setCouponList(true)
    }

    const trackingShow = () => {
        setTracking(true)
        setCouponList(false)
    }

    const oneTimeShow = () => {
        setOneTime(true)
        setCouponList(false)
    }

    const couponCross = () => {
        setCouponList(false)
        setTracking(false)
        setOneTime(false)
        setGetCoupon(false)
        setCouponDesc('')
        setDiscountType('')
        setProductName('')
        setProductIds([]);
        setCouponAmount('')
        setCouponAmount('')
        setSelectedInfluencer('')
        setMatchingInfluencers('')
    }

    const trackingApi = (event) => {
        event.preventDefault();
        setLoading(true);
        axios.post('https://api.myrefera.com/shopify/particular/product/', {
            discount_code: couponDesc,
            discount_type: discountType,
            amount: couponAmount,
            product_id: productIds?.toString(),
            influencer_name: selectedInfluencer?.id
        }, {
            headers: {
 
                Authorization: `Token ${token}`

        }})
        .then(function (response) {
            console.log("Single Coupon", response.data);
            toast.success("Tracking Coupon Created");
            setCouponData([...couponData, response.data]);
            setCouponDesc('')
            setDiscountType('')
            setProductName('')
            setProductIds([]);
            setCouponAmount('')
            setCouponAmount('')
            setSelectedInfluencer('')
            couponCross()
        })
        .catch(function (error) {
            console.log(error);
            if (error.response.data.error == "Product  field is required") {
                toast.warn("Product field is required")
            }
            else if (error.response.data.error == "discount code  field is required") {
                toast.warn("Coupon field is required")
            }
            else if (error.response.data.error == "discount type field is required") {
                toast.warn("Discount type field is required")
            }
            else if (error.response.data.error == "Amount field is required") {
                toast.warn("Amount field is required")
            }
            else if (error.response.data.error == "amount should be less than 100") {
                toast.warn("Percentage should be less than 100")
            }
            else {
                toast.error("Could not create a coupon right now")
            }
        })
        .finally(() => setLoading(false));
    }

    const handleClick = (name) => {
        if (selectedItem === name) {
          setSelectedItem(null);
        } else {
          setSelectedItem(name);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
          document.removeEventListener("click", handleClickOutside);
        };
    }, [token]);

    const handleClickOutside = (event) => {
        const input = document.querySelector(".tracking-container input");
        const list = document.querySelector(".tracking-container ul");
        if (!input?.contains(event.target) && !list?.contains(event.target)) {
          setShowList(false);
          setShowInfluencer(false);
        }
    };

    const handleInfluencerSelection = (influencer) => {
        setSelectedInfluencer(influencer);
        setShowInfluencerDropdown(false);
    };

    console.log("productIds", productIds)
    console.log("showList", selectedProductNames)
    console.log("selectedInfluencer", selectedInfluencer?.id)
    console.log("matching Influencer", matchingInfluencers)

    return (
    <>
    <div className="coupon p-4 page">
        <div className="coupon-container d-flex flex-column mt-5 w-100">
            <h4 className='mb-4'>Coupon List</h4>
            {couponData?.length > 0 ? (
                <div className="filters d-flex justify-content-between align-items-center">
                <div className="input-container d-flex flex-column" style={{width: 200}}>
                    <label className='w-100 text-dark mb-3'>Offer & Tracking</label>
                    <div className="search-button d-flex align-items-center">
                        <input type="text" maxLength='30' placeholder='Filter Coupons'  value={filterValue} onChange={(event) => setFilterValue(event.target.value)} />
                    </div>
                </div>
            </div>
            ) : ""}
                
                <div className="coupon-buttons d-flex justify-content-end align-items-center">
                    <button onClick={couponCreateShow}><img src={Plus} aly='plus' /> Create Coupon</button>
                    <button><img src={Download} aly='download' /> Export Coupon</button>
                </div>
                {couponData?.length > 0 ? (
                    <table className="coupon-table">
                        <tr className='table-heading'>
                            {/* <th><input type="checkbox" name="" id="" /></th> */}
                            <th>Coupons</th>
                            <th>Created at</th>
                            <th>Actions</th>
                        </tr>
                        
                            {couponData?.filter(
                                (coupon) =>
                                    coupon.title?.toLowerCase().includes(filterValue.toLowerCase()) ||
                                    coupon.email?.toLowerCase().includes(filterValue.toLowerCase())
                            )
                            .map((couponData, i) => {
                                return(
                                    <tr key={i}>
                                        {/* <td>{couponData.id}</td> */}
                                        <td>{couponData.title}</td>
                                        <td>{couponData.created_at}</td>
                                        <td>
                                            <button onClick={(event) => {getSingleCoupon(couponData.id, event)}}><img src={Delete} style={{ marginRight: 5 }} /> Edit</button>
                                            {loading && <div className='d-flex loader-container flex-column'><div className='loader'><span></span></div> <p className='text-white'>Processing...</p></div>}
                                            <button onClick={(event) => {deleteCoupon(couponData.id, event)}}><img src={Delete} style={{ marginRight: 5 }} /> Delete</button>
                                            
                                        </td>
                                    </tr>
                                )
                            })}
                        
                    </table>
            
                )
                :
                (
                    <>
                        <h5 className='mt-4 text-center'>No Coupons Available</h5>
                        <img src={NoData} alt='no-data' style={{width: '100%', maxHeight: 220, marginTop: '4rem', objectFit: 'contain'}} />
                    </>
                )}
            {couponList && (
                <div className="coupon-list">
                    <div className="coupon-list-container">
                        <h3>Create Coupon</h3>
                        <p>Please select the one options to add the Coupon</p>
                        <button className='close' onClick={couponCross}>
                            <FontAwesomeIcon icon={faClose} style={{ color: "#000", width: "25px", height: "25px"}} />
                        </button>
                        <div className="buttons">
                            <button className="button mb-3" onClick={trackingShow}>Coupon</button>
                            <button className="button" onClick={oneTimeShow}>One Time Use</button>
                        </div>
                    </div>
                </div>
            )}

            {tracking && <div className="tracking-coupon">
                <div className="tracking-container">
                    <h3>Create Coupon</h3>
                    <button className='close' onClick={couponCross}>
                        <FontAwesomeIcon icon={faClose} style={{ color: "#000", width: "25px", height: "25px"}} />
                    </button>
                    <form action="">
                        <div className="input-container">
                            <label>Products Name</label>
                            <input
                            type="text"
                            placeholder={prodList?.length > 0 ? "---Select an option---" : "---No Products Available---"}
                            onClick={() => setShowList(!showList)}
                            value={productName}
                            />
                            {showList && (
                            <ul>
                                {prodList?.map((name, i) => (
                                <li
                                    key={i}
                                    onClick={() => {
                                    setProductName((prevValues) =>
                                        prevValues.includes(name.title)
                                        ? prevValues.filter((value) => value !== name.title)
                                        : [...prevValues, name.title]
                                    );
                                    setProductIds(prevIds =>
                                        prevIds.includes(name.id)
                                            ? prevIds.filter(value => value !== name.id)
                                            : [...prevIds, name.id]
                                    );
                                    handleClick(name.title, name.id)
                                    // setShowList(false);
                                    }}
                                >
                                    {name.title}
                                </li>
                                ))}
                            </ul>
                            )}
                        </div>
                        <div className="input-container">
                            <label>Coupon</label>
                            <input type="text" maxLength='30' placeholder='Enter your coupon' value={couponDesc} onChange={handleCouponDesc} />
                        </div>
                        <div className="input-container">
                            <label>Discount Types</label>
                            <select value={discountType} onChange={handleDiscountType}>
                                <option value="" disabled>Discount Type</option>
                                <option value="fixed_amount">Fixed Amount</option>
                                <option value="percentage">Precentage</option>
                            </select>
                        </div>
                        <div className="input-container">
                            <label>{discountType == "fixed_amount" ? "Amount" : discountType =="percentage" ? "Percent" : 'Discount'}</label>
                            <input type="number" onWheel={(e) => e.target.blur()} placeholder={discountType == "fixed_amount" ? "Amount" : discountType =="percentage" ? "Percent" : 'Discount'} value={couponAmount} onChange={handleCouponAmount} />
                        </div>
                        <div className="input-container">
                            <label>Select Influencer</label>
                            <input
                            type="text"
                            placeholder={
                                influencerList.length > 0
                                ? "---Select an option---"
                                : "---No Influencers Available---"
                            }
                            onClick={() => setShowInfluencerDropdown(!showInfluencerDropdown)}
                            value={selectedInfluencer ? selectedInfluencer.fullname : ""}
                            />
                            {showInfluencerDropdown && (
                            <ul>
                                {influencerList.map((influencer) => (
                                <li
                                    className='influencer-box'
                                    key={influencer.id}
                                    onClick={() => handleInfluencerSelection(influencer)}
                                >
                                    <img src={influencer.image} alt="influencer" />
                                    {influencer.fullname}
                                </li>
                                ))}
                            </ul>
                            )}
                        </div>
                        <button onClick={(e) => {trackingApi(e)}} className='button button-blue mt-4 mx-auto'>Add Coupon</button>
                    </form>
                </div>
            </div>}

            {oneTime && <div className="one-time-coupon">
                <div className="one-time-container">
                    <h3>Create One Time Coupon</h3>
                    <button className='close' onClick={couponCross}>
                        <FontAwesomeIcon icon={faClose} style={{ color: "#000", width: "25px", height: "25px"}} />
                    </button>
                    <form action="">
                        <div className="input-container">
                            <label>Coupon</label>
                            <input type="text" maxLength='30' placeholder='Enter your coupon' value={couponDesc} onChange={handleCouponDesc} />
                        </div>
                        <div className="input-container">
                            <label>Discount Types</label>
                            <select name="" id="" value={discountType} onChange={handleDiscountType}>
                                <option value="" disabled>Discount Type</option>
                                <option value="fixed_amount">Fixed Amount</option>
                                <option value="percentage">Precentage</option>
                            </select>
                        </div>
                        <div className="input-container">
                        <label>{discountType == "fixed_amount" ? "Amount" : discountType =="percentage" ? "Percent" : 'Discount'}</label>
                            <input type="number" onWheel={(e) => e.target.blur()} placeholder={discountType == "fixed_amount" ? "Amount" : discountType =="percentage" ? "Percent" : 'Discount'} value={couponAmount} onChange={handleCouponAmount} />
                        </div>
                        <button onClick={createCoupon} className='button button-blue mt-4 mx-auto'>Add Coupon</button>
                    </form>
                </div>
            </div>}

            {getCoupon && 
                <div className="get-coupon">
                    <div className="get-coupon-contianer">
                    <h3>Edit Coupon</h3>
                    <button className='close' onClick={couponCross}>
                        <FontAwesomeIcon icon={faClose} style={{ color: "#000", width: "25px", height: "25px"}} />
                    </button>
                    <form action="">
                        {couponStatus == 2 && (
                            <div className="input-container tracking-container" style={{padding: 0}}>
                                <label>Products Name</label>
                                <input
                                    type="text"
                                    placeholder={prodList?.length > 0 ? "---Select an option---" : "---No Products Available---"}
                                    onClick={() => setShowList(true)}
                                    value={selectedProductNames.join(', ')}
                                />
                                {showList && (
                                    <ul>
                                    {prodList?.map((name, i) => (
                                            <li
                                            key={i}
                                            onClick={() => {
                                                if (!productName.includes(name.title)) {
                                                    setProductName((prevValues) => [...prevValues, name.title]);
                                                    // setProductIds((prevIds) => [...prevIds, name.id]);
                                                    handleClick(name.title, name.id);
                                                }
                                                if (selectedProductNames.includes(name.title)) {
                                                    setSelectedProductNames((prevValues) =>
                                                        prevValues.filter((value) => value !== name.title)
                                                    );
                                                    setProductIds((prevIds) =>
                                                        prevIds.filter((value) => value !== name.id)
                                                    );
                                                } else {
                                                    setSelectedProductNames((prevValues) =>
                                                        [...prevValues, name.title]
                                                    );
                                                    // setProductIds((prevIds) => [...prevIds, name.id]);
                                                }
                                            }}
                                        >
                                            {name.title}
                                        </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                        <div className="input-container">
                            <label>Coupon</label>
                            <input type="text" maxLength='30' value={couponDesc} onChange={handleCouponDesc} />
                        </div>
                        <div className="input-container">
                            <label>Discount Types</label>
                            <select name="" id="" value={discountType} onChange={handleDiscountType}>
                                <option value="" disabled>{getCouponInfo?.discount_type}</option>
                                <option value="fixed_amount">Fixed Amount</option>
                                <option value="percentage">Precentage</option>
                            </select>
                        </div>
                        <div className="input-container">
                            <label>Amount</label>
                            <input type="number" onWheel={(e) => e.target.blur()} value={couponAmount} onChange={handleCouponAmount} />
                        </div>
                        <div className="input-container">
                            <label>Select Influencer</label>
                            <input
                            type="text"
                            placeholder={
                                matchingInfluencers?.length > 0
                                ? matchingInfluencers[0].fullname
                                : influencerList?.length > 0
                                ? "---Select an option---"
                                : "---No Influencers Available---"
                            }
                            onClick={() => setShowInfluencerDropdown(!showInfluencerDropdown)}
                            value={selectedInfluencer ? selectedInfluencer.fullname : ""}
                            />
                            {showInfluencerDropdown && (
                            <ul>
                                {influencerList.map((influencer) => (
                                <li
                                    className='influencer-box'
                                    key={influencer.id}
                                    onClick={() => handleInfluencerSelection(influencer)}
                                >
                                    <img src={influencer.image} alt="influencer" />
                                    {influencer.fullname}
                                </li>
                                ))}
                            </ul>
                            )}
                        </div>
                        {couponStatus == 1 ? (
                            <button onClick={(event) => {editCoupon(getCouponInfo?.id, event)}} className='button button-blue mt-4 mx-auto'>Edit Coupon</button>
                        ) : (
                            <button onClick={(event) => {editCouponProducts(getCouponInfo?.id, event)}} className='button button-blue mt-4 mx-auto'>Edit Coupon</button>
                        )}
                        
                    </form>
                    </div>
                </div>
            }

        </div>
    </div>
    </>
    );
}

export default CouponList;