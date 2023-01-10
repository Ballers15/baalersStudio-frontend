/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect,useState} from "react";
import './Pool.css';
import { useNavigate } from 'react-router-dom'
import {getAllRewardPot,updateRewardPotStatus} from '../../../Services/Admin'
import Loader from "../../../Components/Loader";
import Toaster from "../../../Components/Toaster";
import { MDBSwitch } from 'mdb-react-ui-kit';

const PoolListing = () => {
    useEffect(() => {
        onInit();
    }, []);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [toaster, showToaster] = useState(false);
    const [toasterMessage, setToasterMessage] = useState("");
    const [rewardPotDetailsArray, setRewardPotDetailsArray] = useState([]);
    const setShowToaster = (param) => showToaster(param);
    const onInit=()=>{
        getAllRewardPotDetails();
    }

    const getAllRewardPotDetails = async() => {
        setLoading(true);
        try {
          const getPotDetails = await getAllRewardPot();
          setLoading(false);
          if (getPotDetails.error) {
            setToasterMessage(getPotDetails?.message||'Something Went Worng');
            setShowToaster(true);
          } else {
              setRewardPotDetailsArray(getPotDetails?.data);
          }
        } catch (error) {
            setToasterMessage(error?.response?.data?.message||'Something Went Worng');
            setShowToaster(true);
            setLoading(false);
        }
    }

    const editRewardPot = (id) => {
        navigate('/addPot',{state:{id:id}});
    }

    const activeDeactiveRewardPot = async (data) => {
        let dataToSend = {
            potId:data._id,
            isActive:!data.isActive
        }
        setLoading(true);
        try {
          const potSatus = await updateRewardPotStatus(dataToSend);
          setLoading(false);
          if (potSatus.error) {
            setToasterMessage(potSatus?.message||'Something Went Worng');
            setShowToaster(true);
          } else {
            setToasterMessage('Pot Status Updated Succesfully');
              setShowToaster(true); 
              getAllRewardPotDetails();
          }
        } catch (error) {
            setToasterMessage(error?.response?.data?.message||'Something Went Worng');
            setShowToaster(true);
            setLoading(false);
        }
    }

    return (
        <React.Fragment>
            <div className="pool-listing">
                <button style={{ float: 'right' }} className="add-reward-btn" onClick={()=>navigate('/addPot')}>Add Reward Pot</button>
                <div >
                    <table className="pool-listing-table">
                    <thead className="pool-listing-table-head">
                    <tr>
                        <th>Sr. No.</th>
                        <th>Pot Type</th>
                        <th>Assest Type</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Claim Expiry Date</th>
                        <th>Reward Token Amount</th>
                        <th>Ticker</th>
                        <th>Contract Address</th>
                        <th>Assest Name</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody className="pool-listing-table-body">
                        {rewardPotDetailsArray.length!==0?rewardPotDetailsArray.map((pot, index) => {
                            return (
                                <tr key={pot?._id}>
                                <td>{index+1}</td>
                                <td>{pot?.potType}</td>
                                <td>{pot?.assetType}</td>
                                <td>{pot?.startDate?.split('T')[0]}</td>
                                <td>{pot?.endDate?.split('T')[0]}</td>
                                <td>{pot?.claimExpiryDate?.split('T')[0]}</td>
                                <td>{pot?.rewardTokenAmount}</td>
                                <td>
                                    <span title= {pot?.assetDetails?.ticker}>
                                        {pot?.assetDetails?.ticker.length>12&&pot?.assetDetails?.ticker.slice(0,12)+'...'}
                                        {pot?.assetDetails?.ticker.length<=12&&pot?.assetDetails?.ticker}
                                    </span>
                                </td>
                                <td>
                                    <span title= {pot?.assetDetails?.contractAddress}>
                                        {pot?.assetDetails?.contractAddress.length>12&&pot?.assetDetails?.contractAddress.slice(0,12)+'...'}
                                        {pot?.assetDetails?.contractAddress.length<=12&&pot?.assetDetails?.contractAddress}
                                    </span>
                                </td>
                                <td>
                                    <span title= {pot?.assetDetails?.assetName}>
                                        {pot?.assetDetails?.assetName.length>12&&pot?.assetDetails?.assetName.slice(0,12)+'...'}
                                        {pot?.assetDetails?.assetName.length<=12&&pot?.assetDetails?.assetName}
                                    </span>
                                </td>
                                <td className="action-tab-pool-list">
                                    <span title="Edit Pot Details" onClick={()=>editRewardPot(pot?._id)}>
                                        <svg className="pot-list-edit-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M373.1 24.97C401.2-3.147 446.8-3.147 474.9 24.97L487 37.09C515.1 65.21 515.1 110.8 487 138.9L289.8 336.2C281.1 344.8 270.4 351.1 258.6 354.5L158.6 383.1C150.2 385.5 141.2 383.1 135 376.1C128.9 370.8 126.5 361.8 128.9 353.4L157.5 253.4C160.9 241.6 167.2 230.9 175.8 222.2L373.1 24.97zM440.1 58.91C431.6 49.54 416.4 49.54 407 58.91L377.9 88L424 134.1L453.1 104.1C462.5 95.6 462.5 80.4 453.1 71.03L440.1 58.91zM203.7 266.6L186.9 325.1L245.4 308.3C249.4 307.2 252.9 305.1 255.8 302.2L390.1 168L344 121.9L209.8 256.2C206.9 259.1 204.8 262.6 203.7 266.6zM200 64C213.3 64 224 74.75 224 88C224 101.3 213.3 112 200 112H88C65.91 112 48 129.9 48 152V424C48 446.1 65.91 464 88 464H360C382.1 464 400 446.1 400 424V312C400 298.7 410.7 288 424 288C437.3 288 448 298.7 448 312V424C448 472.6 408.6 512 360 512H88C39.4 512 0 472.6 0 424V152C0 103.4 39.4 64 88 64H200z"/></svg>
                                        </span>
                                        <span>
                                            {pot?.isActive && <MDBSwitch style={{ marginLeft: '5px' }} onChange={()=>activeDeactiveRewardPot(pot)} checked={pot?.isActive} title="De-Active"/>}
                                            {!pot?.isActive && <MDBSwitch style={{ marginLeft: '5px' }} onChange={()=>activeDeactiveRewardPot(pot)} checked={pot?.isActive}   title="Active"/>}
                                        </span>
                                </td>
                                </tr>
                            )
                        }):null}
                        {rewardPotDetailsArray.length===0?<tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                 No Record Found
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>:null}
                    </tbody>
                    </table>
                </div>
            </div>
            {loading ? <Loader /> : null}
                {toaster && <Toaster
                    message={toasterMessage}
                    show={toaster}
                    close={() => showToaster(false)} />
                }
        </React.Fragment>
    )
}

export default PoolListing;