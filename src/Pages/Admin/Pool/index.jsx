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

    const getAllRewardPotDetails = async () => {
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
                                        <span title="Edit Pot Details" onClick={() => editRewardPot(pot?._id)}>
                                            <i className="fa fa-edit " />
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